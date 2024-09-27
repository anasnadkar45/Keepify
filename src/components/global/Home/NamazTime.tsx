"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock } from "lucide-react"

const config = {
  cUrl: 'https://api.countrystatecity.in/v1/countries',
  ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==' // Use your own API key
}

interface Country {
  iso2: string
  name: string
}

interface State {
  iso2: string
  name: string
}

interface City {
  id: string
  name: string
}

interface PrayerTiming {
  name: string
  time: string
}

export default function NamazTime() {
  const [countries, setCountries] = useState<Country[]>([])
  const [states, setStates] = useState<State[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('In')
  const [selectedState, setSelectedState] = useState<string>('Mah')
  const [selectedCity, setSelectedCity] = useState<string>('Kh')
  const [prayerTimings, setPrayerTimings] = useState<PrayerTiming[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [nextPrayer, setNextPrayer] = useState<PrayerTiming | null>(null)
  const [countdown, setCountdown] = useState<string>('')

  useEffect(() => {
    loadCountries()
  }, [])

  const loadCountries = async () => {
    try {
      const response = await fetch(config.cUrl, {
        headers: { "X-CSCAPI-KEY": config.ckey }
      })
      const data = await response.json()
      setCountries(data)
    } catch (error) {
      setError("Error loading countries. Please try again later.")
    }
  }

  const loadStates = async (countryCode: string) => {
    setSelectedState('')
    setSelectedCity('')
    setStates([])
    setCities([])

    try {
      const response = await fetch(`${config.cUrl}/${countryCode}/states`, {
        headers: { "X-CSCAPI-KEY": config.ckey }
      })
      const data = await response.json()
      setStates(data)
    } catch (error) {
      setError("Error loading states. Please try again later.")
    }
  }

  const loadCities = async (countryCode: string, stateCode: string) => {
    setSelectedCity('')
    setCities([])

    try {
      const response = await fetch(`${config.cUrl}/${countryCode}/states/${stateCode}/cities`, {
        headers: { "X-CSCAPI-KEY": config.ckey }
      })
      const data = await response.json()
      setCities(data)
    } catch (error) {
      setError("Error loading cities. Please try again later.")
    }
  }

  const fetchPrayerTimings = async (city: string) => {
    if (!city) return

    setLoading(true)
    setError(null)
    try {
      const currentDate = new Date()
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity/${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}?city=${city}&country=${selectedCountry}&state=${selectedState}`
      )
      const data = await response.json()
      const timings = data.data.timings
      const prayerTimings: PrayerTiming[] = [
        { name: 'Fajr', time: timings.Fajr },
        { name: 'Dhuhr', time: timings.Dhuhr },
        { name: 'Asr', time: timings.Asr },
        { name: 'Maghrib', time: timings.Maghrib },
        { name: 'Isha', time: timings.Isha }
      ]
      setPrayerTimings(prayerTimings)
      updateNextPrayer(prayerTimings)
    } catch (error) {
      setError("Error fetching prayer timings. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const updateNextPrayer = (timings: PrayerTiming[]) => {
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()
    
    const nextPrayer = timings.find(prayer => {
      const [hours, minutes] = prayer.time.split(':').map(Number)
      const prayerTime = hours * 60 + minutes
      return prayerTime > currentTime
    })

    setNextPrayer(nextPrayer || timings[0])
  }

  useEffect(() => {
    if (selectedCountry) {
      loadStates(selectedCountry)
    }
  }, [selectedCountry])

  useEffect(() => {
    if (selectedState) {
      loadCities(selectedCountry, selectedState)
    }
  }, [selectedState])

  useEffect(() => {
    if (selectedCity) {
      fetchPrayerTimings(selectedCity)
    }
  }, [selectedCity])

  useEffect(() => {
    const timer = setInterval(() => {
      if (nextPrayer) {
        const now = new Date()
        const [hours, minutes] = nextPrayer.time.split(':').map(Number)
        const prayerTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)
        const diff = prayerTime.getTime() - now.getTime()
        
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60))
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((diff % (1000 * 60)) / 1000)
          setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
        } else {
          updateNextPrayer(prayerTimings)
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [nextPrayer, prayerTimings])

  return (
    <Card className="w-full min-h-[600px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Prayer Times</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Select onValueChange={setSelectedCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.iso2} value={country.iso2}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSelectedState} disabled={!selectedCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.iso2} value={state.iso2}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSelectedCity} disabled={!selectedState}>
            <SelectTrigger>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.name}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[220px]" />
            <Skeleton className="h-4 w-[180px]" />
            <Skeleton className="h-4 w-[240px]" />
          </div>
        ) : prayerTimings.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Prayer Timings for {selectedCity}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {prayerTimings.map((prayer) => (
                <Card key={prayer.name} className={`${prayer.name === nextPrayer?.name ? 'bg-primary text-primary-foreground' : ''}`}>
                  <CardHeader className="py-2">
                    <CardTitle className="text-lg">{prayer.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{prayer.time}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {nextPrayer && (
              <div className="mt-6 text-center">
                <h3 className="text-lg font-semibold">Next Prayer: {nextPrayer.name}</h3>
                <div className="flex items-center justify-center mt-2">
                  <Clock className="mr-2" />
                  <span className="text-2xl font-bold">{countdown}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Select a city to view prayer timings</p>
        )}
      </CardContent>
    </Card>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { Heart, Grid, List, Search, Type } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Mock data for duas
const mockDuas = [
    { id: 1, title: 'Morning Dua', arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا', translation: 'O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening' },
    { id: 2, title: 'Evening Dua', arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا', translation: 'O Allah, by Your leave we have reached the evening and by Your leave we have reached the morning' },
    { id: 3, title: 'Before Eating', arabic: 'بِسْمِ اللهِ', translation: 'In the name of Allah' },
    { id: 4, title: 'After Eating', arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَجَعَلَنَا مُسْلِمِينَ', translation: 'Praise be to Allah Who has given us food and drink and made us Muslims' },
    // Add more duas as needed
]

const fontSizes = {
    'small': 'text-base',
    'medium': 'text-lg',
    'large': 'text-xl',
    'x-large': 'text-2xl',
    'xx-large': 'text-3xl',
    'xxx-large': 'text-4xl',
    '4x-large': 'text-6xl'
}

export default function DuasPage() {
    const [duas, setDuas] = useState(mockDuas)
    const [favorites, setFavorites] = useState<number[]>([])
    const [isGridView, setIsGridView] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
    const [globalFontSize, setGlobalFontSize] = useState<keyof typeof fontSizes>('medium')

    useEffect(() => {
        const filtered = mockDuas.filter(dua =>
            (dua.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dua.translation.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!showFavoritesOnly || favorites.includes(dua.id))
        )
        setDuas(filtered)
    }, [searchTerm, showFavoritesOnly, favorites])

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
        )
    }

    return (
        <div>
            <h1 className="text-4xl font-bold text-primary mb-4">Islamic Duas</h1>

            <div className="flex flex-wrap gap-4 mb-6">
                <Button
                    onClick={() => setIsGridView(!isGridView)}
                    variant="outline"
                    size="icon"
                >
                    {isGridView ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                </Button>
                <Input
                    type="text"
                    placeholder="Search duas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow max-w-[600px]"
                />
                <div className="flex items-center space-x-2">
                    <Switch
                        id="favorites-mode"
                        checked={showFavoritesOnly}
                        onCheckedChange={setShowFavoritesOnly}
                    />
                    <label htmlFor="favorites-mode">Show Favorites Only</label>
                </div>
                <Select
                    value={globalFontSize}
                    onValueChange={(value: keyof typeof fontSizes) => setGlobalFontSize(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="x-large">X-Large</SelectItem>
                        <SelectItem value="xx-large">XX-Large</SelectItem>
                        <SelectItem value="xxx-large">XXX-Large</SelectItem>
                        <SelectItem value="4x-large">4X-Large</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className={`grid gap-4 ${isGridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {duas.map(dua => (
                    <Card key={dua.id} className="bg-card flex flex-col justify-between text-card-foreground">
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{dua.title}</h2>
                            <p className={`text-right mb-2 ${fontSizes[globalFontSize]} transition-all duration-200 ease-in-out`}>
                                {dua.arabic}
                            </p>
                            <p className="text-sm text-muted-foreground">{dua.translation}</p>
                        </CardContent>
                        <CardFooter className="bg-primary/80 rounded-b-md p-2 flex justify-end space-x-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => toggleFavorite(dua.id)}
                                title={favorites.includes(dua.id) ? "Remove from favorites" : "Add to favorites"}
                            >
                                <Heart className={`h-4 w-4 text-foreground ${favorites.includes(dua.id) ? 'fill-destructive text-transparent' : ''}`} />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
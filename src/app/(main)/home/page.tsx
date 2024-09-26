import Calendar from '@/components/global/Home/Calendar'
import NamazTime from '@/components/global/Home/NamazTime'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='xl:grid grid-cols-4 space-y-2 xl:space-y-0 gap-2'>
        <div className='col-span-3'>
          <NamazTime />
        </div>
        <Calendar />
      </div>
    </div>
  )
}

export default page
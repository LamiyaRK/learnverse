import React from 'react'
import CountUp from 'react-countup';
export default function Countop() {
  return (
    <div className='grid grid-cols-3 w-11/12 max-w-7xl mx-auto p-5 shadow-lg bg-white rounded-lg'>
        <div className='flex flex-col justify-center items-center'>
            <div className='text-6xl text-orange-500 font-bold '><CountUp
                end={1000}
                duration={3}
            />+</div>
            <p className='text-xl font-semibold text-center'>Videos</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <div className='text-6xl text-blue-500 font-bold'><CountUp
                end={50}
                duration={3}
            />+</div>
            <p className='text-xl font-semibold text-center'>Teachers</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <div className='text-6xl text-green-500 font-bold'><CountUp
                end={30}
                duration={3}
            />+</div>
            <p className='text-xl font-semibold text-center'>Courses</p>
        </div>
    </div>
  )
}

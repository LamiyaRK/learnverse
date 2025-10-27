import Image from 'next/image'
import React from 'react'

export default function InstructorCard({instructor}) {
    const {profileImage,name,designation}=instructor
  return (
    <div className='relative '>
    <Image
        src={profileImage}
        height={600}
        width={400}
        alt={name}
        className='h-[500px] w-full object-center object-cover rounded-lg'
        />
        <div className='absolute inset-x-0  mx-auto bottom-[10%] bg-white/10 backdrop-blur-lg w-[90%]  text-white p-3 rounded-2xl '>
        <div className='w-full h-full'>
            <p className='text-3xl'>{name}</p>
            <p>{designation}</p>
        </div>
        </div>
    </div>
  )
}

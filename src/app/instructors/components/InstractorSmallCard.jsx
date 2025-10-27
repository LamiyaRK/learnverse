import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { BsArrowRight } from "react-icons/bs";
export default function InstractorSmallCard({instructor}) {
    const {profileImage,name,designation,_id}=instructor
  return (
    <div className='p-4 shadow-lg rounded-lg'>
        <Image
            src={profileImage}
            height={400}
            width={400}
            alt={name}
            className='h-[400px] w-full object-center object-cover rounded-lg'
            />
            <div className='flex justify-between items-center py-3'>
            <div>
                <p className='text-xl font-bold'>{name}</p>
                <p className='text-primary font-semibold text-lg'>{designation}</p>
            </div>
               <Link href={`/instructors/${_id}`}> <BsArrowRight /></Link>
            </div>
            
        </div>
  )
}

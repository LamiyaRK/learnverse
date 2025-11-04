import Image from 'next/image'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'

export default function BookCard({book}) {
  
    const {title,thumbnail,price,rating}=book
  return (
    <div className='p-4 shadow-lg rounded-lg'>
            <Image
                src={thumbnail}
                height={400}
                width={400}
                alt={title}
                className='h-[400px] w-full object-center object-cover rounded-lg'
                />
                <div >
                     <div className='flex justify-between items-center pt-3'>
                    <p className='text-xl font-bold'>{title}</p>
                    <span className='text-xl'><BsArrowRight /></span>
                    </div>
                    <div className='flex justify-between items-center py-3'>
                    <p className='text-primary font-semibold text-lg'>${price}</p>
                      <span className='text-yellow-400 text-xl flex items-center gap-1'><FaStar/><span className='text-black'>{rating}</span></span>
                    </div>
                 </div>
            </div>
  )
}

import Image from 'next/image';
import React from 'react'
import { CiUser } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function CoursesCard({course}) {
    const {title,thumbnail,price,rating,lessonsCount,enrolled,instructor,shortDescription}=course;
  return (
    <div className='space-y-1 '>
      <Image src={thumbnail} width={500} height={500} className='h-[400px] w-full object-cover object-center' alt={title}/>
      <div className='p-5 space-y-1'>
      <div className='flex justify-between space-y-1'>
        <p><i className='text-primary'>by</i> <span>{instructor}</span></p>
        <div className='flex items-center gap-1'> 
        <Stack spacing={1}>
          <Rating name="half-rating-read" defaultValue={rating} precision={0.1} readOnly />
        </Stack>{rating}
        </div>
      </div>
      <div className='space-y-1'>
        <p className='text-xl font-semibold'>{title}</p>
         <p className='opacity-80'>{shortDescription}</p>
      </div>
         <div className='flex justify-between items-center'>
          <p className='flex justify-center items-center gap-1'><CiUser />{enrolled} students</p>
          <p className='flex justify-center items-center gap-1'><IoBookOutline />{lessonsCount} lessons</p>
          <p className='text-primary text-2xl font-bold'>${price}</p>
         </div>
         
      </div>
    </div>
  )
}

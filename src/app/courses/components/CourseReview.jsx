import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import React from 'react'
import { BsStarFill } from 'react-icons/bs';
import Ratings from './Ratings';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function CourseReview({ id }) {
  const session=await getServerSession(authOptions)
  console.log(session)
  const user=session?.user
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/${id}`);
  const review = await res.json();
  const { reviews } = review;
   const maxVal=reviews["1Star"]+reviews["2Star"]+reviews["3Star"]+reviews["4Star"]+reviews["5Star"]
  return (
    <div>
    <div className='flex justify-between items-center'>
    <div className='flex flex-col justify-center items-center '>
      <p className='text-[100px]'>{reviews.averageRating}</p>
      <Stack spacing={1}>
          <Rating name="half-rating-read" defaultValue={reviews.averageRating} precision={0.1} readOnly />
        </Stack>
        <p className='font-semibold text-gray-400 mt-2'>{maxVal} ratings</p>
    </div>
    <div className='w-[70%]'>
      <div className='flex items-center space-x-2 text-lg font-bold text-gray-400'>5<BsStarFill className='text-yellow-500' /><progress className="progress progress-warning w-1/2" value={reviews["5Star"]} max={maxVal}></progress></div><br/>
      <div className='flex items-center space-x-2 text-lg font-bold text-gray-400'>4<BsStarFill className='text-yellow-500' /> <progress className="progress progress-warning w-1/2" value={reviews["4Star"]} max={maxVal}></progress></div><br/>
       <div className='flex items-center space-x-2 text-lg font-bold text-gray-400'>3<BsStarFill className='text-yellow-500' /><progress className="progress progress-warning w-1/2" value={reviews["3Star"]} max={maxVal}></progress></div><br/>
       <div className='flex items-center space-x-2 text-lg font-bold text-gray-400'>2<BsStarFill className='text-yellow-500' /><progress className="progress progress-warning w-1/2" value={reviews["2Star"]} max={maxVal}></progress></div><br/>
       <div className='flex items-center space-x-2 text-lg font-bold text-gray-400'>1<BsStarFill className='text-yellow-500' /><progress className="progress progress-warning w-1/2" value={reviews["1Star"]} max={maxVal}></progress></div><br/>
       </div>
    </div>
   {user&&<Ratings id={ id }/>} </div>
  );
}

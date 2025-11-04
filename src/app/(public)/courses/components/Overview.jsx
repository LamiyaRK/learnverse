import React from 'react'
import { GoSquareFill } from "react-icons/go";
export default async function ({id}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courseOverview/${id}`);
    const course= await res.json();
    const {whatYouWillLearn,requirements,longDescription,whoThisCourseIsFor}=course
  return (
    <div>
        <h1 className='my-6 text-3xl font-semibold'>What you’ll learn</h1>
<ul>
  {whatYouWillLearn.map((learn, index) => (
    <li key={index} className='flex items-center gap-1 text-gray-500'><GoSquareFill size={14} color='black'/>{learn}</li>
  ))}
</ul>
<h1 className='my-6 text-3xl font-semibold'>Requirements</h1>
 <ul>
  {requirements.map((req, index) => (
    <li key={index} className='flex items-center gap-1 text-gray-500'><GoSquareFill size={14} color='black'/>{req}</li>
  ))}
</ul>
<h1 className='my-6 text-3xl font-semibold'>Description</h1>
<p className='text-gray-500'>{longDescription}</p>
<h1 className='my-6 text-3xl font-semibold'>Who this course is for:</h1>
 <ul>
  {whoThisCourseIsFor.map((point, index) => (
    <li key={index} className='flex items-center gap-1 text-gray-500'><GoSquareFill size={14} color='black'/>{point}</li>
  ))}
</ul>
    </div>
  )
}

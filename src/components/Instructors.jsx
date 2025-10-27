import Image from 'next/image';
import React from 'react'
import InstructorCard from './InstructorCard';

export default async function Instructors() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topInstructors`);
        const instructors = await res.json();
        
  return (
    <div>
    <p className='text-xl text-primary font-bold text-center'>Make Connections</p>
    <h1 className='text-4xl text-center mb-10'>Team of Instructors</h1>
    <div className='grid grid-cols-3 gap-5 max-w-7xl w-11/12 mx-auto'>
      {
        instructors.map(instructor=><InstructorCard key={instructor._id} instructor={instructor}/>)
      }
    </div>
    </div>
  )
}

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { HiMiniSquares2X2 } from "react-icons/hi2";
import InstructorRating from '../components/InstructorRating';
export default async function InstructorDetails({params}) {
    const {id}=params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/instructors/${id}`);
    const instructor = await res.json();
        //console.log(instructor)
    const {name,profileImage,designation,bio,email,phone,socials,specialization,experience,courses}=instructor
        
return (
    <div className='w-11/12 max-w-7xl mx-auto'> 
    <div className=' flex justify-between items-center gap-5 my-40'>
        <Image
                    src={profileImage}
                    alt={name}
                    width={700}
                    height={700}
                    className="w-full h-[500px] object-cover object-center rounded-lg"
                     />
        <div className='space-y-2'>
            <p className='text-3xl font-bold'>{name}</p>
            <p className='text-primary text-lg font-semibold'>{designation}</p>
            <p className='opacity-80'>{bio}</p>
           <div className='opacity-80'> {specialization.map(special=>
                <span key={special} className='p-1 text-sm rounded-md border-2 border-primary m-1'>{special}</span>
                )}</div>
            
            
            <div className='font-semibold text-lg flex items-center gap-1'>
            <div className='text-3xl text-gray-300'>
                <HiMiniSquares2X2 />
            </div>
            <div>
                <p className='text-primary '>Experience</p>
                <p className='opacity-80'> {experience}</p>
            </div>
            </div>
            <div className='font-semibold text-lg flex items-center gap-1'>
            <div className='text-3xl text-gray-300'>
                <HiMiniSquares2X2 />
            </div>
            <div>
                <p className='text-primary '>phone</p>
                <p className='opacity-80'> {phone}</p>
            </div>
            </div>
            <div className='font-semibold text-lg flex items-center gap-1'>
            <div className='text-3xl text-gray-300'>
                <HiMiniSquares2X2 />
            </div>
            <div>
                <p className='text-primary '>Email</p>
                <p className='opacity-80'> {email}</p>
            </div>
            </div>
            <div className='flex items-center gap-1 mt-1'>
                   <Link href={socials.twitter} className='p-2  text-white text-lg rounded-md border-2 bg-primary'> <FaTwitter /></Link>
                   <Link href="https://www.facebook.com/" className='p-2  text-white text-lg rounded-md border-2 bg-primary'> <FaFacebookF /></Link>
                   <Link href="https://www.instagram.com/" className='p-2  text-white text-lg rounded-md border-2 bg-primary'> <FaInstagram /></Link>
                   <Link href={socials.linkedin} className='p-2  text-white text-lg rounded-md border-2 bg-primary'> <FaLinkedinIn /></Link>
                </div>
        </div>
                     
    </div>
    <InstructorRating instructor={name} courseId={courses[0]}/>
    </div>
  )
}

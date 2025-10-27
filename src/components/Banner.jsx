"use client"
import React from 'react';
import banner from '../../public/assets/home2.webp';
import banner1 from '../../public/assets/banner-image3.webp';
import Image from 'next/image';
import Countup from "@/components/Countup";
export default function Banner() {
  return (
    <div className='relative mb-50'>
    <div className="relative w-full h-[700px] lg:h-[800px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={banner1}
        alt="banner"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div> {/* optional dark overlay */}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col lg:flex-row-reverse items-center justify-between gap-10 max-w-7xl w-11/12 mx-auto">
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image src={banner} alt="banner pic" className="rounded-lg shadow-lg "/>
        </div>
        <div className="w-full lg:w-1/2 text-white justify-center">
        <p className=' border-l-2 pl-2 border-primary mb-2 font-semibold text-lg'>Learn Smarter</p>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Unlock Your Potential with LearnVerse
          </h1>
          <p className="mb-6 w-[80%]">
            Step into a universe of learning where knowledge meets creativity. Discover courses, master skills, and grow faster than ever—all in one place
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
    <div className='absolute -bottom-[10%] w-full'><Countup/></div>
    </div>
  );
}


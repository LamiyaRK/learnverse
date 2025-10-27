'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import CoursesCard from './CoursesCard';

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topcourse`);
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      }
    }
    fetchCourses();
  }, []);
 //console.log(courses)
  return (
    <div className='mb-40'>
    <p className='text-xl text-primary font-bold text-center'>Discover Courses</p>
    <h1 className='text-4xl text-center mb-10'>Our Popular Online Courses</h1>
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 1, spaceBetween: 16 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
      }}
      className="py-6 w-11/12 max-w-7xl mx-auto"
    >
      {courses.map((course, idx) => (
        <SwiperSlide key={idx}>
          <CoursesCard course={course}></CoursesCard>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
}

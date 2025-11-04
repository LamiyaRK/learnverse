import React from 'react';
import Timeline from './components/Timeline';
import Image from 'next/image';


const Aboutus = () => {
  const timelineData = [
  {
    index: 1,
    year: "2022",
    title: "Vision Took Shape",
    description:
      "It all began with a simple vision — to make quality education accessible to everyone, anywhere. Our founders noticed how many students struggled to find structured, practical learning paths online.",
    image: "https://i.ibb.co.com/zhpJr9RR/pexels-yankrukov-8199175.jpg",
  },
  {
    index: 2,
    year: "2023",
    title: "Building the Platform",
    description:
      "We started developing our edtech platform with interactive lessons, live mentorship, and progress tracking — all designed to make online learning engaging and effective.",
    image: "https://i.ibb.co.com/bpqBHm8/pexels-fauxels-3184303.jpg",
  },
  {
    index: 3,
    year: "2024",
    title: "Empowering Learners",
    description:
      "Launched skill-based courses in technology, design, and business. We introduced certifications, quizzes, and peer learning communities to help learners grow together.",
    image: "https://i.ibb.co.com/Kp75h4PN/pexels-julia-m-cameron-4145190.jpg",
  },
  {
    index: 4,
    year: "2025",
    title: "Transforming Futures",
    description:
      "Today, thousands of learners trust our platform to upskill and achieve their goals. We continue innovating with AI-driven recommendations, career support, and personalized learning paths.",
    image: "https://i.ibb.co.com/tMxppqFS/pexels-emily-ranquist-493228-1205651.jpg",
  },
];




    return (
        <div className='w-5/6 max-w-[1600px] mx-auto relative inset-0 py-10'>
        <h2 className='text-4xl  text-neutral text-center my-20'>About Us</h2>
         <div className='flex lg:flex-row flex-col-reverse justify-between mb-[120px] inset-0 lg:h-[1000px] text-neutral'>
         <div className='lg:w-[40%] text-lg space-y-6'>
         <div className='space-y-6'>
            <h2 className='text-xl mb-2 text-primary font-semibold'> — About InkSphere</h2>
            <h1 className='text-4xl  text-neutral mb-10'> Sharing Stories, One Blog at a Time</h1>
           
           
          <p className='text-3xl'>  Welcome to InkSphere, your space for discovering inspiring stories, insightful articles, and unique perspectives from writers around the world. Every post is a window into a new idea waiting to be explored.</p> 
          
           
<p className='opactiy-80'>We are a passionate team of writers, readers, and digital enthusiasts, dedicated to creating a vibrant community where ideas are shared and celebrated. From thought-provoking articles to personal stories—each blog we feature carries a voice worth hearing.</p>
        </div>
        </div>
        <div className='w-[300px] sm:w-[600px]  relative inset-0  h-[600px] sm:h-[1000px] mx-auto'>
        <div className='flex justify-end'>
            <Image width={500} height={500} src='https://i.ibb.co.com/ZRWSNMjg/h8brjfvvtijjlxv92sgs.webp' alt='aboutbg' className='h-[250px] w-[200px] sm:h-[400px] sm:w-[300px] object-center object-cover' ></Image>
        </div>
         <div className='absolute top-25 lg:top-50 shadow-2xl'>
          <Image width={500} height={500} alt='aboutban'  src='https://i.ibb.co.com/Xx06m5BJ/rfpurb4yinmgjwzsajy1.webp' className='h-[400px] sm:h-[700px] w-[250px] sm:w-[500px] object-center object-cover shadow-2xl shadow-black z-10'></Image>
          </div>
        </div>
          </div>
       <p className='font-semibold text-xl text-center mb-4 text-primary '>Timeline</p>
       <h1 className='text-4xl  text-neutral mb-10 text-center'>Our History</h1>
           
        <div >
           {
            timelineData.map(data=><Timeline key={data.index} data={data}></Timeline>)
           }
        </div>
        </div>
    );
};

export default Aboutus;
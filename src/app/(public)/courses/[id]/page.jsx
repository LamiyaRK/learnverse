import Image from 'next/image';
import React from 'react'
import Overview from '../components/Overview';
import CommentSection from '../components/CommentSection';
import Modules from '../components/Modules';
import CourseReview from '../components/CourseReview';
import EnrollButton from '../components/EnrollButton';

export default async function CourseDetails({params}) {
    const {id}=await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/course/${id}`);
    const course= await res.json();
    const {title,instructorName, price, duration, level, rating, enrolled, language, thumbnail, tags, lessonsCount, certificate
}=course
  return (
    <div className='w-11/12 max-w-7xl mx-auto'>
    <div className=' flex justify-between items-start gap-5 my-40'>
      <Image
                          src={thumbnail}
                          alt={title}
                          width={700}
                          height={700}
                          className="w-full h-[500px] object-cover object-center rounded-lg"
                           />
                           <div className='w-[50%]'>
    <div className="overflow-x-auto rounded-box border border-primary  bg-base-100 ">
  <table className="table text-center font-semibold">
   
    <tbody>
      
      <tr>
        <td>Students</td>
        <td>{enrolled}</td>
      </tr>
       <tr>
        <td>Duration</td>
        <td>{duration}</td>
      </tr>
       <tr>
        <td>Language</td>
        <td>{language}</td>
      </tr>
      <tr>
        <td>Certificate</td>
        <td>{certificate?"True":"False"}</td>
      </tr>
      <tr>
        <td>Difficulty</td>
        <td>{level}</td>
      </tr>
      <tr>
        <td>Rating</td>
        <td>{rating}</td>
      </tr>
      <tr>
        <td>Lessons Count</td>
        <td>{lessonsCount}</td>
      </tr>
      <tr>
        <td>Price</td>
        <td>{price}</td>
      </tr>
     
    </tbody>
  </table>
     
</div>
<div className='w-full  flex justify-center p-3'>
<EnrollButton course={course}/>
</div>
</div>
    </div>
    {/* name of each tab group should be unique */}
<div className="tabs tabs-border">
  <input type="radio" name="my_tabs_2" className="tab" aria-label="Overview" />
  <div className="tab-content border-base-300 bg-base-100 p-10"><Overview id={id}/></div>

  <input type="radio" name="my_tabs_2" className="tab" aria-label="Modules" defaultChecked />
  <div className="tab-content border-base-300 bg-base-100 p-10"><Modules id={id}/></div>

  <input type="radio" name="my_tabs_2" className="tab" aria-label="Reviews" />
  <div className="tab-content border-base-300 bg-base-100 p-10"><CourseReview  id={id} /></div>
</div>
<CommentSection id={id}/>
    </div>
  )
}

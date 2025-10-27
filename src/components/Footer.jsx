import Link from 'next/link';
import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaTwitter } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { IoMailSharp } from "react-icons/io5";
export default function Footer() {
  return (
    <div className='bg-[#252525]'>
    <footer className="footer sm:footer-horizontal w-11/12 mx-auto text-white p-10">
  <aside>
    <p className='text-2xl font-bold text-primary'>Learn<i className='text-white'>Verse</i></p>
    <p>
     No boring courses — confidence with a smile.<br/>
     Learning here is fun, fast, and effective.
    </p>
    <div className='flex items-center gap-2 mt-1'>
       <div className='p-2 bg-white text-primary text-lg rounded-md'> <FaTwitter /></div>
       <div className='p-2 bg-white text-primary text-lg rounded-md'> <FaFacebookF /></div>
       <div className='p-2 bg-white text-primary text-lg rounded-md'> <FaInstagram /></div>
       <div className='p-2 bg-white text-primary text-lg rounded-md'> <FaLinkedinIn /></div>
    </div>
  </aside>
  <nav>
    <h6 className="footer-title text-white opacity-100">
    <span className="underline decoration-primary underline-offset-4 decoration-2">Abou</span>t Us
    </h6>
    <a className="link link-hover">Career</a>
    <a className="link link-hover">Skills</a>
    <Link href='/instructors' className="link link-hover">Teacher's Portal</Link>
 </nav>
  <nav>
    <h6 className="footer-title text-white opacity-100">
    <span className="underline decoration-primary underline-offset-4 decoration-2">Supp</span>ort
    </h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Help</a>
  </nav>
  <nav>
    <h6 className="footer-title text-white opacity-100">
    <span className="underline decoration-primary underline-offset-4 decoration-2 ">Cont</span>act
    </h6>
    <a className="link link-hover flex items-center gap-1"><FaMapMarkerAlt />Dhaka,Bangladesh</a>
    <a className="link link-hover flex items-center gap-1"><FiPhoneCall />+880XXXXXXXXXX</a>
    <a className="link link-hover flex items-center gap-1"><IoMailSharp />infoLearnverse@gmail.com</a>
  </nav>
</footer>
</div>
  )
}

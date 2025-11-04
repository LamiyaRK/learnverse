import Image from "next/image";
import { Bell } from "lucide-react";
import Link from 'next/link'
import React from 'react'
import logo from '../../public/assets/logo.webp'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import LogoutButton from "./LogoutButton";
export default async function Nav() {
   const session = await getServerSession(authOptions);
   const user=session?.user;
    const list=<>
        {session&&<li><Link href='/dashboard'>Dashboard</Link></li>}
         <li><Link href='/about'>About Us</Link></li>
          <li><Link href='/courses'>Courses</Link></li>
           <li><Link href='/books'>Books</Link></li>
          {!session&&<li><Link href='/login'>Login</Link></li>}  
        </>
  return (
    <div className='bg-primary'>
    <div className="navbar w-11/12 max-w-7xl mx-auto text-white shadow-sm  ">
    
  <div className="navbar-start ">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {list}
      </ul>
    </div>
    
    <Link href='/'><p className='text-xl font-bold'>Learn<i>Verse</i></p></Link>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {list}
    </ul>
  {!session&&<Link href='/register' className="btn text-primary">Sign Up</Link>}
  {session&&<div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <div className="relative">
          <Bell size={24} className="text-gray-700" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium">{user?.name || "User"}</span>
          <Image
            src={user?.image || "https://i.ibb.co.com/zhQR0TqT/student.webp"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full w-11 h-12"
          />
        </div>
        <LogoutButton/>
      </div>}
  </div>
</div>
</div>
  )
}

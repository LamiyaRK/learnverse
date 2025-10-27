"use client"
import React from 'react'
import Link from 'next/link'
import registerUser from '@/app/actions/auth/registerUser';
import SocialLogin from '@/app/login/components/SocialLogin';
export default function RegisterForm() {
    const handleFormData=async(e)=>{
        e.preventDefault();
        const formData=e.target;
        const name=formData.name.value;
         const photo=formData.photo.value;
          const email=formData.email.value;
           const pass=formData.pass.value;
           registerUser({name,photo,email,pass})
    }
  return (
    <div>
      <form onSubmit={handleFormData} >
        <label className="block mb-2 font-medium" htmlFor="email">
         Name
        </label>
        <input
          id="name"
          type="text"
           name='name'
          placeholder="your name"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
       <label className="block mb-2 font-medium" htmlFor="email">
         photo
        </label>
        <input
          id="photo"
          type="URL"
           name='photo'
          placeholder="your photo URL"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-2 font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          name='email'
          placeholder="you@example.com"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-2 font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
           name='pass'
          placeholder="Your password"
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className=" w-full btn bg-primary text-white p-3 rounded "
        >
          Register
        </button>
        
      </form>
      <p className='text-sm mt-5 text-center'>OR Register With</p>
      <SocialLogin/>
      <p className='text-sm mt-5 text-center'>Already have an account?<Link href='/login' className='text-primary '>Login</Link></p>
      </div>
  )
}

"use client"
import React from 'react'
import Link from 'next/link'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import SocialLogin from './SocialLogin'

export default function LoginForm() {
  const router=useRouter()
     const handleFormData=async(e)=>{
            e.preventDefault();
            const formData=e.target;
            const email=formData.email.value;
               const password=formData.password.value;
               try{
       const res= await signIn("credentials",{email,password,redirect:false})
       if(res.ok)
       {   
             router.push('/')
             formData.reset()
             
       }else
       {
          toast("Failed to login",{
              type:'error',
              theme:'colored'
             })
       }

               }
               catch(error)
               {
             console.log(error)
             toast("Failed to login",{
              type:'error',
              theme:'colored'
             })
               }
               
             
        }
  return (
    <div>
     <form onSubmit={handleFormData} >
       

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
          name='password'
          placeholder="Your password"
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className=" w-full btn bg-primary text-white p-3 rounded "
        >
          Log In
        </button>
        
      </form>
      <p className='text-sm mt-5 text-center'>OR Sign In With</p>
      <SocialLogin/>
      <p className='text-sm mt-5 text-center'>Don't have na account?<Link href='/register' className='text-primary '>Register</Link></p>
      </div>
  )
}

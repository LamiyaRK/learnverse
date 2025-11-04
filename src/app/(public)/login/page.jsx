import Image from 'next/image'

import React from 'react'
import LoginForm from './components/LoginForm'

export default function LoginPage() {
  return (
    <div className='max-w-7xl mx-auto my-20 '>
     <h2 className="text-5xl font-bold mb-6 text-center">Login</h2>
     <div className='flex items-center gap-10'>
    <div className='w-[50%] my-10'>
         <Image
            src='https://i.ibb.co.com/jZQchwQX/milad-fakurian-f-UHv-ZWQc-VUU-unsplash.webp'
            alt='login'
            width={1000}
            height={700}
            className="w-full h-[500px] object-cover object-center"
             />
             </div>
       
             <div className='w-[50%] max-w-md'>
             <LoginForm></LoginForm>
             </div>
             </div>
    </div>
  )
}

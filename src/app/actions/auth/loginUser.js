"use server";
import bcrypt from 'bcrypt';
import dbConnect from "@/lib/dbConnect";

export  const loginUser=async(payload)=>{
    const {email,password}=payload
    const usercol=dbConnect('user')
    const user=await usercol.findOne({email});
    //console.log(user)
    if(!user)
        return null;
   const ispassok =await bcrypt.compare(password,user.pass);

   if(!ispassok) return null
        return user;
}
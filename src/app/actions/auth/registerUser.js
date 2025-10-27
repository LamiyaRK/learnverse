"use server"
import bcrypt from 'bcrypt'
import dbConnect from "@/lib/dbConnect";

export default async function registerUser(payload) {
    const {name,photo,email,pass}=payload
    if(!email||!pass)
        return null;
    const usercol=dbConnect("user")
    const result=await usercol.findOne({email:email});
    if(result)
        return null;
    else
    {   const hashedpass=await bcrypt.hash(pass,10)
       const newUser = {
    name,
    image:photo,     // you used `photo` here but in form you used `image`. Make consistent!
    email,
    pass: hashedpass,
  };
        const result=await usercol.insertOne(newUser);
        result.insertedId=result.insertedId.toString()
        return result;
    }
        return null;
 
}
//pages/api/auth/[...nextauth].js
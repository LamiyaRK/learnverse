import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const GET=async(req)=>{
    const courseCol=dbConnect("courses");
    const result=await courseCol.find().toArray();
    return NextResponse.json(result)
}

export const POST=async(req)=>{
   const posteddata=await req.json();
   const blogscol =dbConnect("blogs");
   const result=await blogscol.insertOne(posteddata);
   return NextResponse.json(result)
}
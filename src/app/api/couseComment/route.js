import dbConnect from "@/lib/dbConnect"
import { NextResponse } from "next/server";
export const POST=async(req)=>{
    try {
         const data=await req.json()
         const commentCol=dbConnect("comments");
         const res=await commentCol.insertOne({...data,
           createdAt: new Date()});
         return NextResponse.json(res)

    } catch (error) {
        console.error("Error posting comments:", error);
    return NextResponse.json({ error: "Failed to post comments" }, { status: 500 });
    }
}
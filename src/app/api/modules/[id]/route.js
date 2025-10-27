import dbConnect from "@/lib/dbConnect"
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET=async(req,{params})=>{
    try {
        const {id}=params;
         const modulesCol=dbConnect("course_modules");
         const res=await modulesCol.findOne({courseId:id});
         return NextResponse.json(res)

    } catch (error) {
        console.error("Error fetching modules:", error);
    return NextResponse.json({ error: "Failed to fetch modules" }, { status: 500 });
    }
}
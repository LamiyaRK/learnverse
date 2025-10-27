import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const GET = async (req,{params}) => {
  try {
    const {id}=await params;
    const instructorCol = await dbConnect("instructors"); // should return collection
    const result = await instructorCol
      .findOne({_id:new ObjectId(id)});
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
};

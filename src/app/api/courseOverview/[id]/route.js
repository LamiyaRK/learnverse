import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const GET = async (req, { params }) => {
    
  try {
    const { id } = params; // no await
    const courseCol = await dbConnect("course_overview"); // returns collection
    const result = await courseCol.findOne({ courseId: id });
    
    if (!result) {
      return NextResponse.json({ error: "Course overview not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching course overview:", error);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
};


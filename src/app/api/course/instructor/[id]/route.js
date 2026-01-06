import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const coursesCol = await dbConnect("courses");
//console.log(id)
    const courses = await coursesCol.find({ instructor: id }).toArray();
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

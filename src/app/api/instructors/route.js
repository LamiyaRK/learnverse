import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export const GET = async (req) => {
  try {
    const instructorCol = await dbConnect("instructors"); // should return collection
    const result = await instructorCol
      .find({})
      .sort({ "admin.salary": -1 }) // sort descending
      .toArray();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
};

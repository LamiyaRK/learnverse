import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export const GET = async (req) => {
  try {
    const instructorCol = await dbConnect("books"); // should return collection
    const result = await instructorCol
      .find()
     .toArray();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
};

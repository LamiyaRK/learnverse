import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export const GET = async (req) => {
  try {
    const courseCol = await dbConnect("courses"); // should return collection
    const result = await courseCol
      .find({})
      .sort({ enrolled: -1 }) // sort descending
      .limit(6)
      .toArray();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
};

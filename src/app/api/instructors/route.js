import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    //console.log("hi")
    const email = searchParams.get("email"); // optional query param

    const instructorCol = await dbConnect("instructors");

    if (email) {
      // return single instructor by email
      const instructor = await instructorCol.findOne({ email });
      if (!instructor) {
        return NextResponse.json({ error: "Instructor not found" }, { status: 404 });
      }
      return NextResponse.json(instructor);
    }

    // no email -> return all instructors sorted by earnings
    const allInstructors = await instructorCol
      .find({})
      .sort({ "admin.earnings": -1 })
      .toArray();

    return NextResponse.json(allInstructors);
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return NextResponse.json({ error: "Failed to fetch instructors" }, { status: 500 });
  }
};

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const GET = async () => {
  try {
    // 1️⃣ get session
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "instructor") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ find instructor by email
    const instructorCol = await dbConnect("instructors");
    const instructor = await instructorCol.findOne({
      email: session.user.email,
    });

    if (!instructor) {
      return NextResponse.json(
        { error: "Instructor not found" },
        { status: 404 }
      );
    }

    // 3️⃣ find courses by instructor id
    const courseCol = await dbConnect("courses");
    const courses = await courseCol
      .find({ instructor: instructor._id.toString() })
      .toArray();

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Instructor courses error:", error);
    return NextResponse.json(
      { error: "Failed to fetch instructor courses" },
      { status: 500 }
    );
  }
};

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const studentCol = dbConnect("student_info");
  const materialCol = dbConnect("study_materials");

  // 1️⃣ get enrolled courses
  const student = await studentCol.findOne({
    email: session.user.email,
  });
 //console.log(student)
  const enrolledCourses = student?.enrolledCourses || [];

  // 2️⃣ get materials only for enrolled courses
  const materials = await materialCol
    .find({ courseId: { $in: enrolledCourses } })
    .toArray();

  return NextResponse.json(materials);
};

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb"; // still needed for courses collection

export const POST = async (req) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { courseId } = await req.json(); // string

  const studentCol = dbConnect("student_info");
  const courseCol = dbConnect("courses");

  // 1️⃣ Find student
  const student = await studentCol.findOne({
    email: session.user.email,
  });

  // 2️⃣ Already enrolled check (STRING compare)
  if (student?.enrolledCourses?.includes(courseId)) {
    return NextResponse.json(
      { error: "Already enrolled" },
      { status: 400 }
    );
  }

  // 3️⃣ Upsert student & add courseId string
  await studentCol.updateOne(
    { email: session.user.email },
    {
      $addToSet: { enrolledCourses: courseId }, // ✅ string
      $setOnInsert: {
        email: session.user.email,
        createdAt: new Date(),
      },
      $set: {
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );

  // 4️⃣ Increment enrolled count in course (needs ObjectId)
  await courseCol.updateOne(
    { _id: new ObjectId(courseId) },
    { $inc: { enrolled: 1 } }
  );

  return NextResponse.json({ success: true });
};

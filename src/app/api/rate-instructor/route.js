import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const GET = async (req) => {
  try {
    const ratingsCol = dbConnect("instructor_ratings");
    const result = await ratingsCol.find().toArray();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const postedData = await req.json();
    const { courseId, instructor, ratings, comments } = postedData;
    const studentEmail = session.user.email;

    const studentCol = dbConnect("student_info");
    const ratingsCol = dbConnect("instructor_ratings");

    // ✅ check enrollment
    const student = await studentCol.findOne({
      email: studentEmail,
      enrolledCourses: courseId,
    });

    if (!student)
      return NextResponse.json(
        { error: "You are not enrolled in this course" },
        { status: 403 }
      );

    // ✅ prevent multiple rating
    const existing = await ratingsCol.findOne({
      courseId,
      instructor,
      studentEmail,
    });

    if (existing)
      return NextResponse.json(
        { error: "You have already rated this instructor" },
        { status: 409 }
      );

    // ✅ calculate average rating
    const ratingValues = Object.values(ratings);
    const avgRating = Number(
      (
        ratingValues.reduce((sum, r) => sum + r, 0) /
        ratingValues.length
      ).toFixed(2)
    );

    // ✅ insert rating
    const result = await ratingsCol.insertOne({
      courseId,
      instructor,
      studentEmail,
      ratings,          
      avgRating,        
      comments,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      avgRating,
      id: result.insertedId,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

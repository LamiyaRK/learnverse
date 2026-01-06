import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userCol = dbConnect("user");
    const studentCol = dbConnect("student_info");
    const courseCol = dbConnect("courses");
    const instructorCol = dbConnect("instructors");

    // Logged in user
    const user = await userCol.findOne(
      { email: session.user.email },
      { projection: { pass: 0 } }
    );

    // Student info
    const student = await studentCol.findOne({
      email: session.user.email,
    });

    const enrolledIds = student?.enrolledCourses || [];

    const courseObjectIds = enrolledIds
      .filter(id => ObjectId.isValid(id))
      .map(id => new ObjectId(id));

    let courses = await courseCol
      .find({ _id: { $in: courseObjectIds } })
      .toArray();

    /* -------------------------------
       🔹 FETCH INSTRUCTORS
    -------------------------------- */

    const instructorIds = courses
      .map(c => c.instructor)
      .filter(Boolean);

    const instructors = await instructorCol
      .find({ _id: { $in: instructorIds.map(id => new ObjectId(id)) } })
      .project({ name: 1 })
      .toArray();

    const instructorMap = {};
    instructors.forEach(inst => {
      instructorMap[inst._id.toString()] = inst.name;
    });

    /* -------------------------------
       🔹 MERGE NAME INTO COURSES
    -------------------------------- */

    courses = courses.map(course => ({
      ...course,
      instructorName: instructorMap[course.instructor] || "Unknown",
    }));

    // Dashboard stats
    const stats = {
      enrolledCourses: courses.length,
      inProgress: courses.length,
      certificates: courses.filter(c => c.certificate).length,
    };

    return NextResponse.json({
      user,
      stats,
      courses,
    });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

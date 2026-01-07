// app/api/study-material/[courseId]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(req, { params }) {
  try {
    const { courseId } = params;

    const col = await dbConnect("study_materials");
    const data = await col.findOne({ courseId });

    if (!data) {
      return NextResponse.json(
        { error: "Study material not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch study material" },
      { status: 500 }
    );
  }
}

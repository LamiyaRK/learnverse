import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

/* ADD MATERIAL */
export async function POST(req, { params }) {
  const { courseId } = params;
  const { moduleId, lessonId, material } = await req.json();

  const col = await dbConnect("study_materials");

  await col.updateOne(
    { courseId },
    {
      $push: {
        "modules.$[m].lessons.$[l].materials": material,
      },
    },
    {
      arrayFilters: [
        { "m.moduleId": moduleId },
        { "l.lessonId": lessonId },
      ],
    }
  );

  return NextResponse.json({ success: true });
}

/* DELETE MATERIAL */
export async function DELETE(req, { params }) {
  const { courseId } = params;
  const { moduleId, lessonId, title } = await req.json();

  const col = await dbConnect("study_materials");

  await col.updateOne(
    { courseId },
    {
      $pull: {
        "modules.$[m].lessons.$[l].materials": { title },
      },
    },
    {
      arrayFilters: [
        { "m.moduleId": moduleId },
        { "l.lessonId": lessonId },
      ],
    }
  );

  return NextResponse.json({ success: true });
}

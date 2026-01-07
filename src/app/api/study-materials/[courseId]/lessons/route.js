import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

/* ADD LESSON */
export async function POST(req, { params }) {
  const { courseId } = params;
  const { moduleId, lesson } = await req.json();

  const col = await dbConnect("study_materials");

  await col.updateOne(
    { courseId, "modules.moduleId": moduleId },
    { $push: { "modules.$.lessons": lesson } }
  );

  return NextResponse.json({ success: true });
}

/* DELETE LESSON */
export async function DELETE(req, { params }) {
  const { courseId } = params;
  const { moduleId, lessonId } = await req.json();

  const col = await dbConnect("study_materials");

  await col.updateOne(
    { courseId },
    {
      $pull: {
        "modules.$[m].lessons": { lessonId },
      },
    },
    {
      arrayFilters: [{ "m.moduleId": moduleId }],
    }
  );

  return NextResponse.json({ success: true });
}

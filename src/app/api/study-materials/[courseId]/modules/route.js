import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";


/* ADD MODULE */
export async function POST(req, { params }) {
  const { courseId } = params;
  const moduleData = await req.json(); // ✅ renamed

  const col = await dbConnect("study_materials");

  await col.updateOne(
    { courseId },
    { $push: { modules: moduleData } }
  );

  return NextResponse.json({ success: true });
}


/* EDIT MODULE */
export async function PUT(req, { params }) {
  const { courseId } = params;
  const { moduleId, title } = await req.json();

  const col = await dbConnect("study_materials");

  await col.updateOne(
    { courseId, "modules.moduleId": moduleId },
    { $set: { "modules.$.title": title } }
  );

  return NextResponse.json({ success: true });
}

/* DELETE MODULE */
export async function DELETE(req, { params }) {
  const { courseId } = params;
  const { moduleId } = await req.json();

  const col = await dbConnect("study_materials");

  await col.updateOne(
    { courseId },
    { $pull: { modules: { moduleId } } }
  );

  return NextResponse.json({ success: true });
}

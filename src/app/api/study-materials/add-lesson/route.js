// api/study-material/add-lesson/route.js
export const POST = async (req) => {
  const { courseId, moduleId, title } = await req.json();

  const col = await dbConnect("study_materials");

  await col.updateOne(
    { courseId, "modules.moduleId": moduleId },
    {
      $push: {
        "modules.$.lessons": {
          lessonId: crypto.randomUUID(),
          title,
          materials: []
        }
      }
    }
  );

  return NextResponse.json({ success: true });
};

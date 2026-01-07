// api/study-material/add-module/route.js
export const POST = async (req) => {
  const { courseId, title } = await req.json();

  const col = await dbConnect("study_materials");

  await col.updateOne(
    { courseId },
    {
      $push: {
        modules: {
          moduleId: crypto.randomUUID(),
          title,
          lessons: []
        }
      }
    }
  );

  return NextResponse.json({ success: true });
};

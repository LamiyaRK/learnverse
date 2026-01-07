// api/study-material/add-material/route.js
export const POST = async (req) => {
  const { courseId, moduleId, lessonId, material } = await req.json();

  const col = await dbConnect("study_materials");

  await col.updateOne(
    { courseId },
    {
      $push: {
        "modules.$[m].lessons.$[l].materials": {
          materialId: crypto.randomUUID(),
          ...material
        }
      }
    },
    {
      arrayFilters: [
        { "m.moduleId": moduleId },
        { "l.lessonId": lessonId }
      ]
    }
  );

  return NextResponse.json({ success: true });
};

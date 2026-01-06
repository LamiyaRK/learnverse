import { headers } from "next/headers";
import MaterialViewer from "./components/MaterialViewer";


async function getStudyMaterials() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/study-materials`,
    {headers: new Headers(await headers()),
      cache: "no-store", // always fresh
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch study materials");
  }

  return res.json();
}

export default async function StudyMaterialsPage() {
  const materials = await getStudyMaterials();

  return (
    <div className="py-20 w-full ">
      <h1 className="text-3xl font-semibold text-center pb-10">
         Study Materials
      </h1>

      {materials.length === 0 && (
        <p>No study materials available</p>
      )}

      <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {materials.map((material) => (
          <MaterialViewer
            key={material._id}
            material={material}
          />
        ))}
      </div>
    </div>
  );
}

import { headers } from "next/headers";
import Link from "next/link";

export default async function AddModulesPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/course/instructor`,
    {headers: new Headers(await headers()), cache: "no-store" }
  );
  const courses = await res.json();

  return (
    <div className="w-full max-w-7xl rounded-xl  flex flex-col mx-auto h-ful">
    <div className="p-8">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Manage Course Content
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition"
          >
            <img
              src={course.thumbnail}
              className="h-40 w-full object-cover rounded-t-2xl"
            />

            <div className="p-5 space-y-3">
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {course.shortDescription}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Published
                </span>

                <Link
                  href={`/dashboard/add-modules/${course._id}`}
                  className="text-sm text-white bg-primary px-4 py-2 rounded-lg"
                >
                  Manage →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

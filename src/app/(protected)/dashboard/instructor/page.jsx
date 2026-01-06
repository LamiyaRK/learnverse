import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

// Simple server fetch helper
async function fetcher(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export default async function InstructorDashboardPage() {
  // 1️⃣ Get session
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/login");
  }

  // 2️⃣ Get instructor info by email
  const instructor = await fetcher(
    `${process.env.NEXTAUTH_URL}/api/instructors?email=${session.user.email}`
  );


  if (!instructor || instructor.admin?.role !== "instructor") {
    redirect("/login");
  }

  // 3️⃣ Get instructor courses
  const courses = await fetcher(
    `${process.env.NEXTAUTH_URL}/api/course/instructor/${instructor._id}`
  );

  // 4️⃣ Stats
  const totalStudents = courses.reduce(
    (sum, c) => sum + (c.enrolled || 0),
    0
  );

  const totalCourses = courses.length;
  const totalEarnings = instructor.admin?.earnings || 0;

  return (
    <div className="p-8 space-y-10">
      {/* Profile Card */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-lg rounded-2xl p-6">
        <img
          src={instructor.profileImage || "/default-avatar.png"}
          alt={instructor.name}
          className="w-32 h-32 rounded-full border-4 border-primary object-cover"
        />

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-primary">
            {instructor.name}
          </h1>
          <p className="text-gray-500">
            {instructor.designation}
          </p>
          <p className="mt-2 text-gray-600">
            {instructor.bio || "No bio provided."}
          </p>

          <div className="flex justify-center md:justify-start gap-4 mt-3 text-sm">
            {instructor.socials?.linkedin && (
              <a
                href={instructor.socials.linkedin}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            )}
            {instructor.socials?.twitter && (
              <a
                href={instructor.socials.twitter}
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                Twitter
              </a>
            )}
            {instructor.socials?.github && (
              <a
                href={instructor.socials.github}
                target="_blank"
                className="text-gray-800 hover:underline"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat title="Total Courses" value={totalCourses} />
        <Stat title="Total Students" value={totalStudents} />
        <Stat title="Total Earnings ($)" value={totalEarnings} />
      </div>

      {/* Courses */}
      <div>
        <h2 className="text-2xl font-semibold text-primary mb-4">
          My Courses
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {course.shortDescription}
                </p>

                <div className="flex justify-between mt-3 text-sm text-gray-600">
                  <span>👥 {course.enrolled || 0}</span>
                  <span>⭐ {course.rating || 0}</span>
                </div>

                <p className="mt-2 font-medium text-primary">
                  ${course.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Small reusable stat card
function Stat({ title, value }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center">
      <h2 className="text-gray-400">{title}</h2>
      <p className="text-3xl font-bold text-primary mt-2">
        {value}
      </p>
    </div>
  );
}

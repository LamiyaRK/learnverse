import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata = {
  title: "Dashboard | LearnVerse",
  description: "Your personalized dashboard to manage courses and progress.",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // If not logged in, redirect to login
  if (!session) {
    redirect("/login");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/student/dashboard`, {
   headers: new Headers(await headers()),
 cache: "no-store",
});


if (!res.ok) {
return <div className="text-center mt-20">Failed to load dashboard</div>;
}


const { user, stats, courses } = await res.json();
return (
    <div className="p-6 space-y-10 w-full max-w-7xl mx-auto">


{/* Welcome Section */}
<div className="flex items-center gap-4 bg-base-100 p-6 rounded-xl shadow">
<Image
src={user?.image}
alt="profile"
width={80}
height={80}
className="rounded-full h-30 w-30 object-cover"
/>
<div>
<h1 className="text-2xl font-bold ">Welcome back, <span className="text-primary">{user?.name}</span></h1>
<p className="text-sm opacity-70">{user?.email}</p>
{!user?.bio && (
<Link href={'/dashboard/profile'}><p className="text-xs text-error mt-1">Complete your profile</p></Link>
)}
</div>
</div>


{/* Stats */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="bg-base-100 p-5 rounded-xl shadow text-center">
<p className="text-sm  text-primary">Enrolled Courses</p>
<p className="text-3xl font-bold">{stats.enrolledCourses}</p>
</div>
<div className="bg-base-100 p-5 rounded-xl shadow text-center">
<p className="text-sm text-primary">In Progress</p>
<p className="text-3xl font-bold">{stats.inProgress}</p>
</div>
<div className="bg-base-100 p-5 rounded-xl shadow text-center">
<p className="text-sm text-primary">Certificates</p>
<p className="text-3xl font-bold">{stats.certificates}</p>
</div>
</div>


{/* Continue Learning */}
<div>
<h2 className="text-xl font-semibold mb-4 text-primary">Continue Learning</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{courses.map((course) => (
<div key={course._id} className="bg-base-100 rounded-xl shadow overflow-hidden">
<Image
src={course.thumbnail}
alt={course.title}
width={600}
height={300}
className='h-[300px] w-full object-cover object-center'
/>
<div className="p-4 space-y-1">
<h3 className="font-bold text-lg">{course.title}</h3>
<p className="text-sm opacity-70">Instructor: {course.instructorName}</p>
<p className="text-sm opacity-70">Duration: {course.duration}</p>
<div className="mt-3 flex gap-1 justify-center">
<Link href={'/dashboard/study-materials'}><button className="btn btn-primary btn-sm ">Continue</button></Link>
<Link href={`/courses/${course._id}`}><button className="btn btn-primary btn-sm ">Rate Course</button></Link>
<Link href={`/instructors/${course.instructor}`}><button className="btn btn-primary btn-sm ">Rate Instructor</button></Link>
</div>
</div>
</div>
))}
</div>
</div>


</div>
  );
}

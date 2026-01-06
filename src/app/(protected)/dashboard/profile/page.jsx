import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileClient from "./components/ProfileClient";
import { headers } from 'next/headers'


export const metadata = {
  title: "My Profile - LearnVerse",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Fetch initial user data from backend API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`, {
     headers: new Headers(await headers()),
    cache: "no-store", // always fetch latest
  });

  const user = await res.json();
  //console.log(user)

  return (
    <div className=" py-20 w-full">
      <h1 className="text-3xl font-semibold text-center">My Profile</h1>
      <p className="text-center py-5 font-semibold opacity-70">
        Manage and update your personal information
      </p>

      {/* Pass user to client component */}
      <div className="max-w-4xl mx-auto">
        <ProfileClient user={user} />
      </div>
    </div>
  );
}

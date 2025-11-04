import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

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
return (
    <div className="space-y-6">
      
       
      
    </div>
  );
}

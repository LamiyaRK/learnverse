import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import SidebarDrawer from "@/courses/components/SidebarDrawer";

export const metadata = {
  title: "Dashboard - LearnVerse",
};

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen">
      {session && <SidebarDrawer />} {/* Sidebar only if logged in */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}

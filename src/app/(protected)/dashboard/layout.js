import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import "../../globals.css"; // if you want the same global styles
import SidebarDrawer from "./components/SidebarDrawer";
import DashNav from "./components/DashNav";
import NextAuthProvider from "@/app/Providers/NextAuthProvider";

export const metadata = {
  title: "Dashboard - LearnVerse",
};

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect to login if not authenticated
    // You can import `redirect` from next/navigation
    // import { redirect } from "next/navigation";
    // redirect("/login");
  }

  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50">
      <NextAuthProvider>
        <div className="flex min-h-screen">
          <div className=" min-h-screen">{session && <SidebarDrawer />}</div>
          <div className="flex-1">
          <DashNav user={session?.user}/>
          <main className=" p-6">
          {children}</main>
          </div>
        </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}

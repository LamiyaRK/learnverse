"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, LayoutDashboard, BookOpen, Settings, LogOut,MessageSquare,User } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    name: "Discussion",
    href: "/dashboard/discussion",
    icon: <MessageSquare size={18} />,
  },
  {
    name: "Study Materials",
    href: "/dashboard/study-materials",
    icon: <BookOpen size={18} />,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: <User size={18} />,
  },
];


export default function SidebarDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden p-3 text-gray-700 fixed top-4 left-4 z-50 bg-white rounded-md shadow-md"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-primary text-white transform 
          ${open ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
      >
       <Link href='/'> <div className="p-5 text-xl font-semibold border-b border-red-700">
          LearnVerse
        </div></Link>

        <nav className="flex flex-col p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-md hover:bg-red-800 transition 
                ${pathname === item.href ? "bg-red-800" : ""}`}
              onClick={() => setOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 p-3 rounded-md hover:bg-red-800 mt-6 transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 lg:hidden z-30"
        />
      )}
    </>
  );
}

"use client"; // required for React hooks if needed

import React, { useState } from "react";
import Link from "next/link";
import { FaHome, FaBook, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
import { signOut } from "next-auth/react";

export default function SidebarDrawer() {
  const [isOpen, setIsOpen] = useState(true); // toggle sidebar

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className={`font-bold text-lg ${!isOpen && "hidden"}`}>
            EduTech
          </span>
          <button onClick={toggleSidebar} className="text-white focus:outline-none">
            <FaBars />
          </button>
        </div>

        <nav className="flex-1 mt-4">
          <SidebarLink href="/" icon={<FaHome />} label="Dashboard" isOpen={isOpen} />
          <SidebarLink href="/courses" icon={<FaBook />} label="Courses" isOpen={isOpen} />
          <SidebarLink href="/profile" icon={<FaUser />} label="Profile" isOpen={isOpen} />
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 w-full hover:bg-gray-700 p-2 rounded"
          >
            <FaSignOutAlt />
            <span className={`${!isOpen && "hidden"}`}>Logout</span>
          </button>
        </div>
      </div>

      {/* Optional overlay or main content placeholder */}
    </div>
  );
}

function SidebarLink({ href, icon, label, isOpen }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded m-2 transition-all"
    >
      {icon}
      <span className={`${!isOpen && "hidden"}`}>{label}</span>
    </Link>
  );
}

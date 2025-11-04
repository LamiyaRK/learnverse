import Image from "next/image";
import { Bell } from "lucide-react";

export default function DashNav({ user }) {
  return (
    <nav className="flex justify-end bg-primary text-white shadow px-6 py-2 w-full">
     

      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <div className="relative">
          <Bell size={24} className="text-white" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <span className="text-white font-medium">{user?.name || "User"}</span>
          <Image
            src={user?.image || "https://i.ibb.co.com/zhQR0TqT/student.webp"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full w-13 h-13"
          />
        </div>
      </div>
    </nav>
  );
}

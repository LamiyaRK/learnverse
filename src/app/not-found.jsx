// app/not-found.jsx
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center text-gray-800">
      <h1 className="text-9xl font-extrabold text-gray-300">404</h1>
      <h2 className="text-3xl font-bold mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="btn-primary"
      >
        <Home size={18} />
        Go Back Home
      </Link>

      <div className="mt-12">
        <img
          src="https://illustrations.popsy.co/gray/error-404.svg"
          alt="404 illustration"
          className="w-64 opacity-80"
        />
      </div>
    </div>
  );
}

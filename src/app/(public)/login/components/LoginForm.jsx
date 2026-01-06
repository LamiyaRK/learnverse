"use client";

import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  const router = useRouter();

  const handleFormData = async (e) => {
    e.preventDefault();

    const formData = e.target;
    const email = formData.email.value;
    const password = formData.password.value;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res?.ok) {
        toast("Invalid email or password", {
          type: "error",
          theme: "colored",
        });
        return;
      }

      // 🔥 Fetch role after successful login
      const roleRes = await fetch(
        `/api/get-user-role?email=${email}`
      );

      const roleData = await roleRes.json();

      if (!roleRes.ok || !roleData.role) {
        toast("Failed to determine user role", {
          type: "error",
          theme: "colored",
        });
        return;
      }

      // 🚀 Role-based redirect
      router.push(`/dashboard/${roleData.role}`);
      formData.reset();
    } catch (error) {
      console.error(error);
      toast("Login failed", {
        type: "error",
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleFormData}>
        <label className="block mb-2 font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <label className="block mb-2 font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Your password"
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full btn bg-primary text-white p-3 rounded"
        >
          Log In
        </button>
      </form>

      <p className="text-sm mt-5 text-center">OR Sign In With</p>
      <SocialLogin />
      <p className="text-sm mt-5 text-center">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
}

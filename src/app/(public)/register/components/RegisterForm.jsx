"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Next.js 13 App Router
import { toast } from "react-toastify";
import registerUser from "@/app/actions/auth/registerUser";
import SocialLogin from "../../login/components/SocialLogin";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const router = useRouter();

  const handleFormData = async (e) => {
    e.preventDefault();
    const formData = e.target;
    const name = formData.name.value;
    const photo = formData.photo.value;
    const email = formData.email.value;
    const pass = formData.pass.value;

    try {
      const res = await registerUser({ name, photo, email, pass });

if (res?.success) {
        // Auto-login the user after registration
        const signInRes = await signIn("credentials", {
          redirect: false,
          email,
          password: pass,
        });

        if (signInRes?.ok) {
          toast.success("Registration successful!");
          router.push("/dashboard");
        } else {
          toast.error("Registration succeeded, but login failed!");
        }
      } else {
        toast.error(res?.message || "Registration failed!");
      }

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <form onSubmit={handleFormData}>
        <label className="block mb-2 font-medium" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-2 font-medium" htmlFor="photo">
          Photo
        </label>
        <input
          id="photo"
          type="url"
          name="photo"
          placeholder="Your photo URL"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-2 font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-2 font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="pass"
          placeholder="Your password"
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full btn bg-primary text-white p-3 rounded"
        >
          Register
        </button>
      </form>

      <p className="text-sm mt-5 text-center">OR Register With</p>
      <SocialLogin />

      <p className="text-sm mt-5 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </p>
    </div>
  );
}

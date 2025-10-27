"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SocialLogin() {
  const router = useRouter();

  const handleSocialLogin = async (providerName) => {
    const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl") || "/";
    const result = await signIn(providerName, { callbackUrl, redirect: false });

    if (result?.error) {
      toast.error("Login failed! Please try again.");
    } else {
      toast.success("Login successful!");
      router.push(callbackUrl);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-5">
      <div
        onClick={() => handleSocialLogin("google")}
        className="bg-gray-200 p-3 rounded-full cursor-pointer"
      >
        <FaGoogle size={30} />
      </div>
      <div
        onClick={() => handleSocialLogin("github")}
        className="bg-gray-200 p-3 rounded-full cursor-pointer"
      >
        <FaGithub size={30} />
      </div>
    </div>
  );
}

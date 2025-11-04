"use server";

import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";

export default async function registerUser(payload) {
  const { name, photo, email, pass } = payload;

  if (!email || !pass) {
    return { success: false, message: "Email and password are required" };
  }

  const usercol = dbConnect("user");
  const existingUser = await usercol.findOne({ email });

  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  const hashedPass = await bcrypt.hash(pass, 10);

  const newUser = {
    name,
    image: photo, // make consistent with your form
    email,
    pass: hashedPass,
  };

  const result = await usercol.insertOne(newUser);
  result.insertedId = result.insertedId.toString();

  return { success: true, data: { ...newUser, _id: result.insertedId } };
}

//pages/api/auth/[...nextauth].js
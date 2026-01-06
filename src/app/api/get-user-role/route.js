import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
    
  const { searchParams } = new URL(req.url);
 
  const email = searchParams.get("email");
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const usersCol = dbConnect("user");
  const user = await usersCol.findOne({ email: email });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ role: user.role }); // expects 'student', 'instructor', 'admin'
}

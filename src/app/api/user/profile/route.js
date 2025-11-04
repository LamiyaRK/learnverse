import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


export async function GET() {
  const session = await getServerSession(authOptions);
console.log(session)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await dbConnect("user");
  const user = await db.findOne(
    { email: session.user.email },
    { projection: { pass: 0 } } // never return password
  );

  return NextResponse.json(user || {});
}

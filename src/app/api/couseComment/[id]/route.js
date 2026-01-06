import dbConnect from "@/lib/dbConnect"
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET=async(req,{params})=>{
    try {
        const {id}=params;
         const commentCol=dbConnect("comments");
         const res=await commentCol.find({courseId:id}).toArray();
         return NextResponse.json(res)

    } catch (error) {
        console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
}

export const PATCH = async (req, { params }) => {
  try {
    const { id } = params;
   // console.log(params)
    const updatedData = await req.json();

    const commentCol =dbConnect("comments");

    // Only update provided fields (like commentText)
    const result = await commentCol.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updatedData, updatedAt: new Date() } }
    );
       //console.log(result)
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
   // console.log(params)
    const { id } = params;
    const commentCol = await dbConnect("comments");
    const result = await commentCol.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0)
      return NextResponse.json({ message: "No comment found" }, { status: 404 });

    return NextResponse.json({ message: "Comment deleted successfully!" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
};
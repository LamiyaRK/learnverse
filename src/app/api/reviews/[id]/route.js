import dbConnect from "@/lib/dbConnect"
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET=async(req,{params})=>{
    try {
        const {id}=params;
         const reviewsCol=dbConnect("course_review");
         const res=await reviewsCol.findOne({courseId:id});
         return NextResponse.json(res)

    } catch (error) {
        console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

export const PATCH = async (req, { params }) => {
  try {
    const { id } = params;
    const { star } = await req.json();

    if (!star || star < 1 || star > 5) {
      return NextResponse.json({ error: "Invalid star rating" }, { status: 400 });
    }

    // connect to collection
    const reviewsCol =dbConnect("course_review");

    // find the course review by courseId
    const courseReview = await reviewsCol.findOne({ courseId: id });
    if (!courseReview) {
      return NextResponse.json({ error: "Course review not found" }, { status: 404 });
    }

    // increment the selected star count
    const starKey = `${star}Star`;
    const updatedCount = (courseReview.reviews?.[starKey] || 0) + 1;

    // update that star count in DB
    await reviewsCol.updateOne(
      { courseId: id },
      { $set: { [`reviews.${starKey}`]: updatedCount } }
    );

    // fetch updated record
    const updatedReview = await reviewsCol.findOne({ courseId: id });

    // recalculate average rating
    const totalRatings = Object.values(updatedReview.reviews).reduce((a, b) => a + b, 0);
    const weightedSum =
      updatedReview.reviews["1Star"] * 1 +
      updatedReview.reviews["2Star"] * 2 +
      updatedReview.reviews["3Star"] * 3 +
      updatedReview.reviews["4Star"] * 4 +
      updatedReview.reviews["5Star"] * 5;

    const avgRating = totalRatings > 0 ? weightedSum / totalRatings : 0;

    // update average in DB
    await reviewsCol.updateOne(
      { courseId: id },
      { $set: { averageRating: avgRating } }
    );

    return NextResponse.json({ success: true, avgRating });

  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
};
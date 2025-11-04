"use client";
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

export default function Ratings({ id }) {
  const [average, setAverage] = useState(0);

  // Fetch current average rating on mount
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/${id}`);
        if (!res.ok) throw new Error("Failed to fetch rating");
        const data = await res.json();
        setAverage(data?.avgRating || 0);
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };
    fetchRating();
  }, [id]);

  // Handle star click
  const handleClick = async (star) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ star }),
      });

      if (!res.ok) throw new Error("Failed to update rating");

      const updated = await res.json();
      setAverage(updated.avgRating);
    } catch (err) {
      console.error("Error updating rating:", err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleClick(star)}
            className="hover:scale-110 transition"
            title={`Rate ${star} star`}
          >
            <Star
              fill={star <= Math.round(average) ? "gold" : "none"}
              color="gold"
              size={32}
            />
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-700">Average Rating: {average.toFixed(1)} ⭐</p>
    </div>
  );
}

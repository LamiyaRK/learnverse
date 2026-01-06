"use client";
import { useState } from "react";
import Swal from "sweetalert2";

export default function InstructorRating({ courseId, instructor }) {
  const criteria = [
    { key: "subjectKnowledge", label: "Subject Knowledge" },
    { key: "lessonPlanning", label: "Lesson Planning & Delivery" },
    { key: "studentEngagement", label: "Student Engagement" },
    { key: "evaluationFeedback", label: "Fair Evaluation & Feedbacks" },
    { key: "studentFriendly", label: "Student-friendly Attitude" },
    { key: "useOfTechnology", label: "Use of Technology" },
  ];

  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState("");

  const handleChange = (key, value) => {
    setRatings({ ...ratings, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/rate-instructor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, instructor, ratings, comments }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit rating");

      Swal.fire("Success", "Your rating has been submitted!", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="border p-4 rounded shadow-md max-w-xl mx-auto mb-40">
      <h2 className="text-xl font-bold mb-4 text-center">Rate <i className="text-primary">{instructor}</i> </h2>

      {criteria.map((c) => (
        <div key={c.key} className="mb-3">
          <label className="block font-medium mb-1 text-primary">{c.label}</label>
          <select
            className="border rounded p-1 w-full"
            value={ratings[c.key] || ""}
            onChange={(e) => handleChange(c.key, Number(e.target.value))}
          >
            <option value="">Select rating</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n} >{n}</option>
            ))}
          </select>
        </div>
      ))}

      <div className="mb-3">
        <label className="block font-medium mb-1 text-primary">Comments</label>
        <textarea
          className="border rounded p-2 w-full"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <button
        className="bg-primary text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={handleSubmit}
      >
        Submit Rating
      </button>
    </div>
  );
}

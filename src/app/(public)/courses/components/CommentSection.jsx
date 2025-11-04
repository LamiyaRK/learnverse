"use client";
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function CommentSection({ id }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [editId, setEditId] = useState(null); // for tracking which comment is being edited
  const { data: session } = useSession();
  const user = session?.user;

  // Fetch comments for this course
  useEffect(() => {
    fetch(`/api/couseComment/${id}`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [id]);

  // Add or edit comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (editId) {
      // Update existing comment
      //console.log("Hi")
      const res = await fetch(`/api/couseComment/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentText }),
      });
          
      if (res.ok) {
        setEditId(null);
        setCommentText("");
        const updated = await fetch(`/api/couseComment/${id}`).then(r => r.json());
        setComments(updated);
      }
    } else {
      // Post new comment
      const newComment = {
        userEmail: user.email,
        userName: user.name,
        userPhoto: user.image,
        courseId: id,
        commentText,
      };

      const res = await fetch(`/api/couseComment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      if (res.ok) {
        setCommentText("");
        const updated = await fetch(`/api/couseComment/${id}`).then(r => r.json());
        setComments(updated);
      }
    }
  };

  // Delete comment
  const handleDelete = async (commentId) => {
    const confirmDelete = confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/couseComment/${commentId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setComments(prev => prev.filter(c => c._id !== commentId));
    }
  };

  // Set comment for editing
  const handleEdit = (comment) => {
    setEditId(comment._id);
    setCommentText(comment.commentText);
  };

  return (
    <div className="mt-8">
      {/* Comment input form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-6 flex gap-3 items-center">
          <Image
            src={user.image || "https://i.ibb.co/GvhCsH5F/charlie-green-3-Jmf-ENc-L24-M-unsplash.jpg"}
            height={50}
            width={50}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={editId ? "Edit your comment..." : "Write a comment..."}
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary">
            {editId ? "Update" : "Post"}
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-500 italic">
          Please log in to post a comment.
        </p>
      )}

      {/* Comment List */}
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c._id} className="bg-base-100 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Image
                  src={c.userPhoto || "https://i.ibb.co/GvhCsH5F/charlie-green-3-Jmf-ENc-L24-M-unsplash.jpg"}
                  height={40}
                  width={40}
                  alt={c.userName}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">{c.userName}</h4>
                  <p className="mt-1 text-sm text-gray-700">{c.commentText}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Edit/Delete buttons for owner only */}
              {user?.email === c.userEmail && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

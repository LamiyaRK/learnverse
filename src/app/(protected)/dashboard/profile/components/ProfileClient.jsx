"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function ProfileClient({ user }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
        setEditMode(false);
      } else {
        const data = await res.json();
        toast.error(data?.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (!user)
    return (
      <div className="text-center py-10 text-gray-500">Loading profile...</div>
    );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 mt-10">
      <Toaster />

      {/* Profile Header */}
      <div className="flex flex-col items-center">
        <img
          src={formData.image || "/default-avatar.png"}
          alt={formData.name || "User"}
          className="w-32 h-32 rounded-full object-cover border-4 border-primary"
        />
        <h2 className="text-2xl font-semibold mt-4">{formData.name}</h2>
        <p className="text-gray-500">{formData.email}</p>
        <p className="bg-gray-100 px-3 py-1 mt-2 rounded-full text-sm">
          Role: {formData.role || "User"}
        </p>
      </div>

      {/* Editable Info */}
      <div className="mt-8 space-y-4">
        {["name", "image", "phone", "address", "bio"].map((field) => (
          <div key={field}>
            <label className="block text-gray-600 font-medium capitalize">
              {field}
            </label>
            {editMode ? (
              <input
                type="text"
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
                placeholder={`Enter your ${field}`}
              />
            ) : (
              <p className="text-gray-800">
                {formData[field] || "Not provided yet"}
              </p>
            )}
          </div>
        ))}

        {/* Email (read-only) */}
        <div>
          <label className="block text-gray-600 font-medium">Email</label>
          <p className="text-gray-800">{formData.email}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-end gap-4">
        {editMode ? (
          <>
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-accent text-white rounded-lg"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-accent text-white rounded-lg"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

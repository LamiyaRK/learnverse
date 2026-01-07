'use client'
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AddLessonModal({
  isOpen,
  onClose,
  courseId,
  moduleId,
  onSuccess, // refresh / revalidate callback
}) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('video');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!title || !url) {
      toast.error("All fields required");
      return;
    }

    const payload = {
      moduleId,
      lessonId: `les-${Date.now()}`,
      title,
      materials: [
        {
          type,
          title: `${title} Material`,
          url,
        },
      ],
    };

    try {
      setLoading(true);

      const res = await fetch(
        `/api/study-materials/${courseId}/lesson`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Lesson added successfully 🎉");

      setTitle('');
      setUrl('');
      setType('video');

      onSuccess?.(); // parent refresh
      onClose();
    } catch (err) {
      toast.error("Failed to add lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
        
        <h2 className="text-xl font-semibold mb-4">
          ➕ Add New Lesson
        </h2>

        <label className="text-sm font-medium">Lesson Title</label>
        <input
          className="w-full mt-1 mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          placeholder="e.g. Introduction to React"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="text-sm font-medium">Material Type</label>
        <select
          className="w-full mt-1 mb-4 px-4 py-2 border rounded-lg"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="video">🎥 Video</option>
          <option value="pdf">📄 PDF</option>
        </select>

        <label className="text-sm font-medium">Material URL</label>
        <input
          className="w-full mt-1 mb-6 px-4 py-2 border rounded-lg"
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-primary text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Lesson"}
          </button>
        </div>
      </div>
    </div>
  );
}

'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

export default function ModulesClient({ courseId, modules: initialModules = [] }) {
  const [modules, setModules] = useState(
    initialModules.map(m => ({ ...m, lessons: m.lessons || [] }))
  )

  const [showModal, setShowModal] = useState(false)
  const [activeModuleId, setActiveModuleId] = useState(null)

  const [lessonTitle, setLessonTitle] = useState('')
  const [materialType, setMaterialType] = useState('video')
  const [materialUrl, setMaterialUrl] = useState('')

  /* ================= ADD MODULE (Dynamic Name) ================= */

  const handleAddModule = async () => {
    const { value: moduleTitle } = await Swal.fire({
      title: 'New Module Name',
      input: 'text',
      inputPlaceholder: 'Enter module title',
      showCancelButton: true,
      confirmButtonText: 'Add',
      confirmButtonColor: '#2563eb',
      inputValidator: value => {
        if (!value) return 'Module name required'
      },
    })

    if (!moduleTitle) return

    const newModule = {
      moduleId: `mod-${Date.now()}`,
      title: moduleTitle,
    }

    try {
      const res = await fetch(`/api/study-materials/${courseId}/modules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newModule),
      })

      if (!res.ok) throw new Error()

      setModules(prev => [...prev, { ...newModule, lessons: [] }])
      toast.success('Module added')
    } catch {
      toast.error('Failed to add module')
    }
  }

  /* ================= DELETE MODULE (CONFIRM) ================= */

  const handleDeleteModule = async moduleId => {
    const confirm = await Swal.fire({
      title: 'Delete Module?',
      text: 'All lessons under this module will be removed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Yes, delete',
    })

    if (!confirm.isConfirmed) return

    try {
      const res = await fetch(`/api/study-materials/${courseId}/modules`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId }),
      })

      if (!res.ok) throw new Error()

      setModules(prev => prev.filter(m => m.moduleId !== moduleId))
      toast.success('Module deleted')
    } catch {
      toast.error('Failed to delete module')
    }
  }

  /* ================= LESSON ================= */

  const openLessonModal = moduleId => {
    setActiveModuleId(moduleId)
    setShowModal(true)
  }

  const handleSaveLesson = async () => {
    if (!lessonTitle || !materialUrl) {
      toast.error('All fields required')
      return
    }

    const payload = {
  moduleId: activeModuleId,
  lesson: {
    lessonId: `les-${Date.now()}`,
    title: lessonTitle,
    materials: [
      {
        type: materialType,
        title: lessonTitle,
        url: materialUrl,
      },
    ],
  },
}


    try {
      const res = await fetch(`/api/study-materials/${courseId}/lessons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error()

      setModules(prev =>
  prev.map(m =>
    m.moduleId === activeModuleId
      ? { ...m, lessons: [...m.lessons, payload.lesson] }
      : m
  )
)


      toast.success('Lesson added')
      setShowModal(false)
      setLessonTitle('')
      setMaterialUrl('')
      setMaterialType('video')
    } catch {
      toast.error('Failed to add lesson')
    }
  }

  /* ================= DELETE LESSON (CONFIRM) ================= */

  const handleDeleteLesson = async (moduleId, lessonId) => {
    const confirm = await Swal.fire({
      title: 'Delete Lesson?',
      text: 'This lesson will be permanently removed',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Delete',
    })

    if (!confirm.isConfirmed) return

    try {
      const res = await fetch(`/api/study-materials/${courseId}/lessons`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, lessonId }),
      })

      if (!res.ok) throw new Error()

      setModules(prev =>
        prev.map(m =>
          m.moduleId === moduleId
            ? { ...m, lessons: m.lessons.filter(l => l?.lessonId !== lessonId) }
            : m
        )
      )

      toast.success('Lesson deleted')
    } catch {
      toast.error('Failed to delete lesson')
    }
  }

  return (
    <>
      <div className="space-y-4">
        {modules.map(mod => (
          <details key={mod.moduleId} className="bg-white rounded-xl shadow p-5">
            <summary className="cursor-pointer font-semibold text-lg">
              📘 {mod.title}
            </summary>

            <div className="mt-4 space-y-4">
              {(mod?.lessons || []).map(lesson => (
                <div key={lesson?.lessonId} className="ml-4 border-l pl-4">
                  <h4 className="font-medium">🎓 {lesson?.title}</h4>

                  {(lesson?.materials || []).map((m, i) => (
                    <div key={i} className="mt-2">
                      {m.type === 'video' && (
                        <iframe className="w-full h-52 rounded-lg" src={m.url} />
                      )}
                      {m.type === 'pdf' && (
                        <a href={m.url} target="_blank" className="text-blue-600 underline">
                          📄 {m.title}
                        </a>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={() => handleDeleteLesson(mod?.moduleId, lesson?.lessonId)}
                    className="mt-2 text-xs text-red-600"
                  >
                    Delete Lesson
                  </button>
                </div>
              ))}

              <div className="flex gap-3">
                <button
                  onClick={() => openLessonModal(mod.moduleId)}
                  className="text-sm text-primary"
                >
                  ➕ Add Lesson
                </button>

                <button
                  onClick={() => handleDeleteModule(mod.moduleId)}
                  className="text-sm text-red-600"
                >
                  🗑 Delete Module
                </button>
              </div>
            </div>
          </details>
        ))}

        <button
          onClick={handleAddModule}
          className="px-6 py-3 bg-primary text-white rounded-xl"
        >
          ➕ Add New Module
        </button>
      </div>

      {/* LESSON MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Add Lesson</h2>

            <input
              className="w-full mb-3 border p-2 rounded"
              placeholder="Lesson title"
              value={lessonTitle}
              onChange={e => setLessonTitle(e.target.value)}
            />

            <select
              className="w-full mb-3 border p-2 rounded"
              value={materialType}
              onChange={e => setMaterialType(e.target.value)}
            >
              <option value="video">Video</option>
              <option value="pdf">PDF</option>
            </select>

            <input
              className="w-full mb-4 border p-2 rounded"
              placeholder="Material URL"
              value={materialUrl}
              onChange={e => setMaterialUrl(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={handleSaveLesson}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

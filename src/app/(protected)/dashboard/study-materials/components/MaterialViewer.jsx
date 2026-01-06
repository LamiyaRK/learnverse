"use client";

import { useState } from "react";

export default function MaterialViewer({ material }) {
  const [openModule, setOpenModule] = useState(null);
  const [openLesson, setOpenLesson] = useState(null);

  return (
    <div className="border rounded-xl p-6 shadow bg-white">
      {/* Course Title */}
      <h2 className="font-bold text-2xl text-primary mb-6 text-center">
        {material.title}
      </h2>

      {/* Modules */}
      {material.modules.map((module) => {
        const isModuleOpen = openModule === module.moduleId;

        return (
          <div key={module.moduleId} className="mb-4">
            {/* Module Header */}
            <button
              onClick={() => {
                setOpenModule(isModuleOpen ? null : module.moduleId);
                setOpenLesson(null); // reset lesson when module changes
              }}
              className="w-full flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition px-5 py-3 rounded-lg font-semibold text-lg"
            >
              <span>{module.title}</span>

              {/* Arrow */}
              <span
                className={`transform transition-transform duration-300 ${
                  isModuleOpen ? "rotate-90" : ""
                }`}
              >
                ▶
              </span>
            </button>

            {/* Lessons */}
            {isModuleOpen && (
              <div className="mt-4 pl-4 space-y-3">
                {module.lessons.map((lesson) => {
                  const isLessonOpen = openLesson === lesson.lessonId;

                  return (
                    <div key={lesson.lessonId}>
                      {/* Lesson Header */}
                      <button
                        onClick={() =>
                          setOpenLesson(
                            isLessonOpen ? null : lesson.lessonId
                          )
                        }
                        className="w-full flex justify-between items-center bg-red-50 hover:bg-red-100 transition px-4 py-2 rounded-md font-medium text-red-500"
                      >
                        <span>{lesson.title}</span>

                        {/* Arrow */}
                        <span
                          className={`transform transition-transform duration-300 ${
                            isLessonOpen ? "rotate-90" : ""
                          }`}
                        >
                          ▶
                        </span>
                      </button>

                      {/* Materials */}
                      {isLessonOpen && (
                        <div className="mt-3 pl-4 space-y-4">
                          {lesson.materials.map((mat, idx) => (
                            <div
                              key={idx}
                              className="border rounded-lg p-3 bg-gray-50"
                            >
                              <p className="font-medium mb-2">
                                {mat.title}
                              </p>

                              {mat.type === "video" && (
                                <iframe
                                  src={mat.url}
                                  width="100%"
                                  height="260"
                                  allowFullScreen
                                  className="rounded-lg"
                                />
                              )}

                              {mat.type === "pdf" && (
                                <iframe
                                  src={mat.url}
                                  width="100%"
                                  height="350"
                                  className="rounded-lg"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

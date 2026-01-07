// app/(protected)/dashboard/instructor/add-modules/[courseId]/page.jsx
import { headers } from 'next/headers';
import React from 'react';
import ModulesClient from '../components/ModulesClient';


export default async function ManageModules({ params }) {
  const { courseId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/study-materials/${courseId}`,
    { headers: new Headers(await headers()), cache: "no-store" }
  );
  const data = await res.json();

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold text-primary">
        Course Modules & Materials
      </h1>

      <ModulesClient courseId={courseId} modules={data?.modules || []} />
    </div>
  );
}

"use client";

import { StatusMessage } from "@/src/components/ui/StatusMessage";
import { useAdminAcademic } from "../hooks/useAdminAcademic";
import { CourseForm } from "./CourseForm";
import { CourseList } from "./CourseList";
import { SemesterForm } from "./SemesterForm";
import { SemesterList } from "./SemesterList";

export function AdminAcademicPageShell() {
  const {
    courseForm,
    courseLookup,
    courses,
    editingCourseId,
    editingSemesterId,
    isSubmitting,
    message,
    semesterForm,
    semesters,
    status,
    deleteCourse,
    deleteSemester,
    editCourse,
    editSemester,
    resetCourseForm,
    resetSemesterForm,
    submitCourse,
    submitSemester,
    updateCourseField,
    updateSemesterField,
  } = useAdminAcademic();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6">
        <header className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-cyan-700">Admin</p>
          <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Academic setup</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Manage courses first, then add semesters under those courses.
                Deleting a course removes every related semester.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-slate-100 px-5 py-3">
                <p className="text-2xl font-semibold">{courses.length}</p>
                <p className="text-xs font-medium uppercase text-slate-500">Courses</p>
              </div>
              <div className="rounded-lg bg-slate-100 px-5 py-3">
                <p className="text-2xl font-semibold">{semesters.length}</p>
                <p className="text-xs font-medium uppercase text-slate-500">Semesters</p>
              </div>
            </div>
          </div>
        </header>

        <StatusMessage message={message} status={status} />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="grid gap-6">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">
                {editingCourseId ? "Update course" : "Add course"}
              </h2>
              <div className="mt-5">
                <CourseForm
                  form={courseForm}
                  isEditing={Boolean(editingCourseId)}
                  isSubmitting={isSubmitting}
                  onCancel={resetCourseForm}
                  onSubmit={submitCourse}
                  onUpdateField={updateCourseField}
                />
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Courses</h2>
              <div className="mt-5">
                <CourseList courses={courses} onDelete={deleteCourse} onEdit={editCourse} />
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">
                {editingSemesterId ? "Update semester" : "Add semester"}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Semester creation is available after at least one course exists.
              </p>
              <div className="mt-5">
                <SemesterForm
                  courses={courses}
                  form={semesterForm}
                  isEditing={Boolean(editingSemesterId)}
                  isSubmitting={isSubmitting}
                  onCancel={resetSemesterForm}
                  onSubmit={submitSemester}
                  onUpdateField={updateSemesterField}
                />
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Semesters</h2>
              <div className="mt-5">
                <SemesterList
                  courseLookup={courseLookup}
                  semesters={semesters}
                  onDelete={deleteSemester}
                  onEdit={editSemester}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

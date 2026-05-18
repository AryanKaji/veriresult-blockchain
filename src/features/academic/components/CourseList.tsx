"use client";

import { Button } from "@/src/components/ui/Button";
import { AdminCourse } from "@/src/types/academic/adminAcademic.types";

type CourseListProps = {
  courses: AdminCourse[];
  onDelete: (courseId: string) => void;
  onEdit: (course: AdminCourse) => void;
};

export function CourseList({ courses, onDelete, onEdit }: CourseListProps) {
  if (courses.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500">
        No courses yet. Add a course before creating semesters.
      </p>
    );
  }

  return (
    <div className="grid gap-3">
      {courses.map((course) => (
        <article className="rounded-lg border border-slate-200 p-4" key={course.id}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-slate-950">{course.courseName}</h3>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                  {course.courseCode}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {course.description || "No description"}
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500">
                {course.durationInYears} year course · {course.semesterIds.length} semester
                {course.semesterIds.length === 1 ? "" : "s"} ·{" "}
                {course.isAvailable ? "Available" : "Unavailable"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => onEdit(course)} type="button" variant="secondary">
                Edit
              </Button>
              <Button onClick={() => onDelete(course.id)} type="button" variant="ghost">
                Delete
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

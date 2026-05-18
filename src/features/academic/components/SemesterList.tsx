"use client";

import { Button } from "@/src/components/ui/Button";
import {
  AdminCourse,
  AdminSemester,
} from "@/src/types/academic/adminAcademic.types";

type SemesterListProps = {
  courseLookup: Map<string, AdminCourse>;
  semesters: AdminSemester[];
  onDelete: (semesterId: string) => void;
  onEdit: (semester: AdminSemester) => void;
};

export function SemesterList({
  courseLookup,
  semesters,
  onDelete,
  onEdit,
}: SemesterListProps) {
  if (semesters.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500">
        No semesters yet. Create a course, then add semesters under it.
      </p>
    );
  }

  return (
    <div className="grid gap-3">
      {semesters.map((semester) => {
        const course = courseLookup.get(semester.courseId);

        return (
          <article className="rounded-lg border border-slate-200 p-4" key={semester.id}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-slate-950">{semester.semesterCode}</h3>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                    Semester {semester.semesterNumber}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {course ? `${course.courseCode} - ${course.courseName}` : "Unknown course"}
                </p>
                <p className="mt-2 text-xs font-medium text-slate-500">
                  {semester.startingDate} to {semester.endingDate}
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => onEdit(semester)} type="button" variant="secondary">
                  Edit
                </Button>
                <Button onClick={() => onDelete(semester.id)} type="button" variant="ghost">
                  Delete
                </Button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

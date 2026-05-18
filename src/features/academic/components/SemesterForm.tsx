"use client";

import { FormEvent } from "react";
import { Button } from "@/src/components/ui/Button";
import { TextField } from "@/src/components/ui/TextField";
import {
  AdminCourse,
  SemesterInput,
} from "@/src/types/academic/adminAcademic.types";

type SemesterFormProps = {
  courses: AdminCourse[];
  form: SemesterInput;
  isEditing: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpdateField: (name: keyof SemesterInput, value: string | number) => void;
};

export function SemesterForm({
  courses,
  form,
  isEditing,
  isSubmitting,
  onCancel,
  onSubmit,
  onUpdateField,
}: SemesterFormProps) {
  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Course
        <select
          className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-200"
          disabled={courses.length === 0}
          name="courseId"
          onChange={(event) => onUpdateField("courseId", event.target.value)}
          required
          value={form.courseId}
        >
          <option value="">Select course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.courseCode} - {course.courseName}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Semester code"
          name="semesterCode"
          onChange={(event) => onUpdateField("semesterCode", event.target.value)}
          placeholder="BCA-SEM1"
          required
          type="text"
          value={form.semesterCode}
        />
        <TextField
          label="Semester number"
          max={12}
          min={1}
          name="semesterNumber"
          onChange={(event) => onUpdateField("semesterNumber", Number(event.target.value))}
          required
          type="number"
          value={form.semesterNumber}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Starting date"
          name="startingDate"
          onChange={(event) => onUpdateField("startingDate", event.target.value)}
          required
          type="date"
          value={form.startingDate}
        />
        <TextField
          label="Ending date"
          name="endingDate"
          onChange={(event) => onUpdateField("endingDate", event.target.value)}
          required
          type="date"
          value={form.endingDate}
        />
      </div>

      <div className="flex gap-3">
        <Button
          className="flex-1"
          disabled={isSubmitting || courses.length === 0}
          type="submit"
        >
          {isSubmitting ? "Saving..." : isEditing ? "Update semester" : "Add semester"}
        </Button>
        {isEditing ? (
          <Button disabled={isSubmitting} onClick={onCancel} type="button" variant="secondary">
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}

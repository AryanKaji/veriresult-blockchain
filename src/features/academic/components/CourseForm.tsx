"use client";

import { FormEvent } from "react";
import { Button } from "@/src/components/ui/Button";
import { TextField } from "@/src/components/ui/TextField";
import { CourseInput } from "@/src/types/academic/adminAcademic.types";

type CourseFormProps = {
  form: CourseInput;
  isEditing: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpdateField: (name: keyof CourseInput, value: string | number | boolean) => void;
};

export function CourseForm({
  form,
  isEditing,
  isSubmitting,
  onCancel,
  onSubmit,
  onUpdateField,
}: CourseFormProps) {
  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Course code"
          name="courseCode"
          onChange={(event) => onUpdateField("courseCode", event.target.value)}
          placeholder="BCA"
          required
          type="text"
          value={form.courseCode}
        />
        <TextField
          label="Duration (in years)"
          max={6}
          min={1}
          name="durationInYears"
          onChange={(event) => onUpdateField("durationInYears", Number(event.target.value))}
          required
          type="number"
          value={form.durationInYears}
        />
      </div>

      <TextField
        label="Course name"
        name="courseName"
        onChange={(event) => onUpdateField("courseName", event.target.value)}
        placeholder="Bachelor of Computer Applications"
        required
        type="text"
        value={form.courseName}
      />

      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Description
        <textarea
          className="min-h-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-200"
          name="description"
          onChange={(event) => onUpdateField("description", event.target.value)}
          placeholder="Short course description"
          value={form.description}
        />
      </label>

      <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm font-medium text-slate-700">
        <input
          checked={form.isAvailable}
          className="h-4 w-4 accent-slate-950"
          name="isAvailable"
          onChange={(event) => onUpdateField("isAvailable", event.target.checked)}
          type="checkbox"
        />
        Available for enrollment
      </label>

      <div className="flex gap-3">
        <Button className="flex-1" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Saving..." : isEditing ? "Update course" : "Add course"}
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

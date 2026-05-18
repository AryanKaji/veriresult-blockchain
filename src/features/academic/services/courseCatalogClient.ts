import { CourseOption } from "@/src/types/academic/adminAcademic.types";

export async function getCourseOptions() {
  const response = await fetch("/api/courses");
  const data = (await response.json().catch(() => ({}))) as CourseOption[] | { message?: string };

  if (!response.ok) {
    throw new Error("message" in data ? data.message ?? "Unable to load courses." : "Unable to load courses.");
  }

  return data as CourseOption[];
}

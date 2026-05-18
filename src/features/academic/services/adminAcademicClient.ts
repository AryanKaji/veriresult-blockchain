import {
  AcademicPayload,
  AdminCourse,
  AdminSemester,
  CourseInput,
  SemesterInput,
} from "@/src/types/academic/adminAcademic.types";

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message ?? "Request failed");
  }

  return data as T;
}

export async function getAcademicPayload(): Promise<AcademicPayload> {
  const [courses, semesters] = await Promise.all([
    fetch("/api/admin/courses").then((response) => parseResponse<AdminCourse[]>(response)),
    fetch("/api/admin/semesters").then((response) => parseResponse<AdminSemester[]>(response)),
  ]);

  return { courses, semesters };
}

export async function saveCourse(input: CourseInput, courseId?: string) {
  const response = await fetch(
    courseId ? `/api/admin/courses/${courseId}` : "/api/admin/courses",
    {
      method: courseId ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );

  return parseResponse<{ message: string; course: AdminCourse }>(response);
}

export async function removeCourse(courseId: string) {
  const response = await fetch(`/api/admin/courses/${courseId}`, {
    method: "DELETE",
  });

  return parseResponse<{ message: string; deletedCourseId: string }>(response);
}

export async function saveSemester(input: SemesterInput, semesterId?: string) {
  const response = await fetch(
    semesterId ? `/api/admin/semesters/${semesterId}` : "/api/admin/semesters",
    {
      method: semesterId ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );

  return parseResponse<{ message: string; semester: AdminSemester }>(response);
}

export async function removeSemester(semesterId: string) {
  const response = await fetch(`/api/admin/semesters/${semesterId}`, {
    method: "DELETE",
  });

  return parseResponse<{ message: string; deletedSemesterId: string }>(response);
}

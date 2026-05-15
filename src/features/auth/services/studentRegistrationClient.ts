import {
  StudentRegistrationInput,
  StudentRegistrationResult,
} from "@/src/types/auth/studentRegistration.types";

export async function submitStudentRegistration(
  input: StudentRegistrationInput
): Promise<StudentRegistrationResult> {
  const response = await fetch("/api/auth/student/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = (await response.json().catch(() => ({}))) as Partial<StudentRegistrationResult>;

  if (!response.ok) {
    throw new Error(data.message ?? "Unable to register student.");
  }

  if (!data.student) {
    throw new Error("Registration completed without student details.");
  }

  return {
    message: data.message ?? "Student registered successfully",
    student: data.student,
  };
}

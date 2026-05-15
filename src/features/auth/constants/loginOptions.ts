import { LoginRole } from "@/src/types/auth/login.types";

export type LoginOption = {
  role: LoginRole;
  label: string;
  title: string;
  subtitle: string;
  identifierLabel: string;
  identifierName: "email" | "enrollmentNumber";
  identifierType: "email" | "text";
  identifierPlaceholder: string;
  endpoint: string;
  destination: string;
};

export const LOGIN_OPTIONS: LoginOption[] = [
  {
    role: "admin",
    label: "Admin",
    title: "Admin portal",
    subtitle: "Manage teachers, students, classes, subjects, and academic setup.",
    identifierLabel: "Email address",
    identifierName: "email",
    identifierType: "email",
    identifierPlaceholder: "admin@example.com",
    endpoint: "/api/auth/admin/login",
    destination: "/admin",
  },
  {
    role: "teacher",
    label: "Teacher",
    title: "Teacher workspace",
    subtitle: "Enter marks, review assigned subjects, and manage evaluations.",
    identifierLabel: "Email address",
    identifierName: "email",
    identifierType: "email",
    identifierPlaceholder: "teacher@example.com",
    endpoint: "/api/auth/teacher/login",
    destination: "/teacher",
  },
  {
    role: "student",
    label: "Student",
    title: "Student results",
    subtitle: "View marks, semester results, and progress details.",
    identifierLabel: "Enrollment number",
    identifierName: "enrollmentNumber",
    identifierType: "text",
    identifierPlaceholder: "ENR-2026-001",
    endpoint: "/api/auth/student/login",
    destination: "/student",
  },
];

export const STAFF_LOGIN_OPTIONS = LOGIN_OPTIONS.filter(
  (option) => option.role !== "student"
);

export const STUDENT_LOGIN_OPTION = getLoginOption("student");

export function getLoginOption(role: LoginRole) {
  return LOGIN_OPTIONS.find((option) => option.role === role) ?? LOGIN_OPTIONS[0];
}

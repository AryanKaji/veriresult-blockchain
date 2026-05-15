export type LoginRole = "admin" | "teacher" | "student";

export type LoginStatus = "idle" | "submitting" | "success" | "error";

export type LoginCredentials = {
  email: string;
  enrollmentNumber: string;
  password: string;
};

export type LoginResult = {
  message: string;
};

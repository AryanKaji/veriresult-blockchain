export type StudentRegistrationInput = {
  name: string;
  email: string;
  password: string;
  courseCode: string;
  dateOfBirth?: string;
};

export type StudentRegistrationFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  courseCode: string;
  dateOfBirth?: string;
};

export type StudentRegistrationStatus = "idle" | "submitting" | "success" | "error";

export type RegisteredStudent = {
  id: string;
  name: string;
  email: string;
  role: "student";
  isActive: boolean;
  enrollmentNumber: string;
  rollNumber: number;
  courseCode: string;
  admissionDate?: Date;
  dateOfBirth?: Date;
};

export type StudentRegistrationResult = {
  message: string;
  student: RegisteredStudent;
};

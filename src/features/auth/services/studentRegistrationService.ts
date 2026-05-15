import bcrypt from "bcryptjs";
import StudentModel from "@/src/models/user/student.model";
import { StudentRegistrationInput, RegisteredStudent } from "@/src/types/auth/studentRegistration.types";
import { UserRole } from "@/src/types/user/role.types";
import { ApiError } from "@/src/lib/http/apiError";
import { connectDB } from "@/src/lib/db";
import { formatRollNumber, getNextRoll } from "@/src/lib/utils/getNextRoll";

function normalizeRegistrationInput(input: Partial<StudentRegistrationInput>) {
  const name = input.name?.trim();
  const email = input.email?.trim().toLowerCase();
  const password = input.password;
  const courseCode = input.courseCode?.trim().toUpperCase();

  if (!name || !email || !password || !courseCode) {
    throw new ApiError("Name, email, password, and course code are required", 400);
  }

  if (password.length < 6) {
    throw new ApiError("Password must be at least 6 characters", 400);
  }

  return {
    courseCode,
    dateOfBirth: input.dateOfBirth,
    email,
    name,
    password,
  };
}

function buildEnrollmentNumber(courseCode: string, rollNumber: number) {
  const year = new Date().getFullYear();

  return `ENR-${year}-${courseCode}-${formatRollNumber(rollNumber)}`;
}

function serializeStudent(student: {
  _id: unknown;
  name: string;
  email: string;
  role: UserRole.STUDENT;
  isActive: boolean;
  enrollmentNumber: string;
  rollNumber: number;
  courseCode: string;
  admissionDate?: Date;
  dateOfBirth?: Date;
}): RegisteredStudent {
  return {
    id: String(student._id),
    name: student.name,
    email: student.email,
    role: student.role,
    isActive: student.isActive,
    enrollmentNumber: student.enrollmentNumber,
    rollNumber: student.rollNumber,
    courseCode: student.courseCode,
    admissionDate: student.admissionDate,
    dateOfBirth: student.dateOfBirth,
  };
}

export async function registerStudent(input: Partial<StudentRegistrationInput>) {
  await connectDB();

  const payload = normalizeRegistrationInput(input);
  const existing = await StudentModel.findOne({ email: payload.email });

  if (existing) {
    throw new ApiError("Student already exists", 409);
  }

  const rollNumber = await getNextRoll();
  const enrollmentNumber = buildEnrollmentNumber(payload.courseCode, rollNumber);
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const student = await StudentModel.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    courseCode: payload.courseCode,
    dateOfBirth: payload.dateOfBirth ? new Date(payload.dateOfBirth) : undefined,
    rollNumber,
    enrollmentNumber,
    role: UserRole.STUDENT,
  });

  return serializeStudent(student);
}

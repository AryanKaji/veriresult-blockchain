import mongoose from "mongoose";
import CourseModel from "@/src/models/academic/course.model";
import SemesterModel from "@/src/models/academic/semester.model";
import {
  AdminCourse,
  AdminSemester,
  CourseOption,
  CourseInput,
  SemesterInput,
} from "@/src/types/academic/adminAcademic.types";
import { ApiError } from "@/src/lib/http/apiError";
import { connectDB } from "@/src/lib/db";

function isDuplicateKeyError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}

function assertObjectId(id: string, label: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(`Invalid ${label}`, 400);
  }
}

function normalizeCourseInput(input: Partial<CourseInput>): CourseInput {
  const courseCode = input.courseCode?.trim().toUpperCase();
  const courseName = input.courseName?.trim();
  const description = input.description?.trim() ?? "";
  const durationInYears = Number(input.durationInYears);
  const isAvailable = input.isAvailable ?? true;

  if (!courseCode || !courseName || !durationInYears) {
    throw new ApiError("Course code, course name, and duration are required", 400);
  }

  if (durationInYears < 1 || durationInYears > 6) {
    throw new ApiError("Course duration must be between 1 and 6 years", 400);
  }

  return {
    courseCode,
    courseName,
    description,
    durationInYears,
    isAvailable,
  };
}

function normalizeSemesterInput(input: Partial<SemesterInput>): SemesterInput {
  const semesterCode = input.semesterCode?.trim().toUpperCase();
  const semesterNumber = Number(input.semesterNumber);
  const startingDate = input.startingDate;
  const endingDate = input.endingDate;
  const courseId = input.courseId?.trim();

  if (!semesterCode || !semesterNumber || !startingDate || !endingDate || !courseId) {
    throw new ApiError("Semester code, number, dates, and course are required", 400);
  }

  if (semesterNumber < 1 || semesterNumber > 12) {
    throw new ApiError("Semester number must be between 1 and 12", 400);
  }

  if (new Date(startingDate) >= new Date(endingDate)) {
    throw new ApiError("Semester ending date must be after starting date", 400);
  }

  assertObjectId(courseId, "course");

  return {
    semesterCode,
    semesterNumber,
    startingDate,
    endingDate,
    courseId,
  };
}

function serializeCourse(course: {
  _id: unknown;
  courseCode: string;
  courseName: string;
  description?: string;
  durationInYears: number;
  semesterIds?: unknown[];
  isAvailable: boolean;
}): AdminCourse {
  return {
    id: String(course._id),
    courseCode: course.courseCode,
    courseName: course.courseName,
    description: course.description ?? "",
    durationInYears: course.durationInYears,
    semesterIds: (course.semesterIds ?? []).map(String),
    isAvailable: course.isAvailable,
  };
}

function serializeSemester(semester: {
  _id: unknown;
  semesterCode: string;
  semesterNumber: number;
  startingDate: Date;
  endingDate: Date;
  courseId: unknown;
  subjectIds?: unknown[];
}): AdminSemester {
  return {
    id: String(semester._id),
    semesterCode: semester.semesterCode,
    semesterNumber: semester.semesterNumber,
    startingDate: semester.startingDate.toISOString().slice(0, 10),
    endingDate: semester.endingDate.toISOString().slice(0, 10),
    courseId: String(semester.courseId),
    subjectIds: (semester.subjectIds ?? []).map(String),
  };
}

function serializeCourseOption(course: {
  _id: unknown;
  courseCode: string;
  courseName: string;
  durationInYears: number;
}): CourseOption {
  return {
    id: String(course._id),
    courseCode: course.courseCode,
    courseName: course.courseName,
    durationInYears: course.durationInYears,
  };
}

export async function listCourses() {
  await connectDB();

  const courses = await CourseModel.find().sort({ courseCode: 1 });
  return courses.map(serializeCourse);
}

export async function listAvailableCourseOptions() {
  await connectDB();

  const courses = await CourseModel.find({ isAvailable: true }).sort({ courseCode: 1 });
  return courses.map(serializeCourseOption);
}

export async function createCourse(input: Partial<CourseInput>) {
  await connectDB();

  try {
    const course = await CourseModel.create(normalizeCourseInput(input));
    return serializeCourse(course);
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      throw new ApiError("Course code or name already exists", 409);
    }

    throw error;
  }
}

export async function updateCourse(courseId: string, input: Partial<CourseInput>) {
  await connectDB();
  assertObjectId(courseId, "course");

  try {
    const course = await CourseModel.findByIdAndUpdate(
      courseId,
      normalizeCourseInput(input),
      { new: true, runValidators: true }
    );

    if (!course) {
      throw new ApiError("Course not found", 404);
    }

    return serializeCourse(course);
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      throw new ApiError("Course code or name already exists", 409);
    }

    throw error;
  }
}

export async function deleteCourse(courseId: string) {
  await connectDB();
  assertObjectId(courseId, "course");

  const course = await CourseModel.findById(courseId);

  if (!course) {
    throw new ApiError("Course not found", 404);
  }

  await SemesterModel.deleteMany({ courseId: course._id });
  await CourseModel.findByIdAndDelete(course._id);

  return { deletedCourseId: courseId };
}

export async function listSemesters() {
  await connectDB();

  const semesters = await SemesterModel.find().sort({ courseId: 1, semesterNumber: 1 });
  return semesters.map(serializeSemester);
}

export async function createSemester(input: Partial<SemesterInput>) {
  await connectDB();

  const payload = normalizeSemesterInput(input);
  const course = await CourseModel.findById(payload.courseId);

  if (!course) {
    throw new ApiError("Create the course before adding semesters", 400);
  }

  try {
    const semester = await SemesterModel.create({
      ...payload,
      startingDate: new Date(payload.startingDate),
      endingDate: new Date(payload.endingDate),
    });

    await CourseModel.findByIdAndUpdate(payload.courseId, {
      $addToSet: { semesterIds: semester._id },
    });

    return serializeSemester(semester);
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      throw new ApiError("Semester code or number already exists for this course", 409);
    }

    throw error;
  }
}

export async function updateSemester(semesterId: string, input: Partial<SemesterInput>) {
  await connectDB();
  assertObjectId(semesterId, "semester");

  const payload = normalizeSemesterInput(input);
  const course = await CourseModel.findById(payload.courseId);

  if (!course) {
    throw new ApiError("Create the course before assigning semesters", 400);
  }

  try {
    const currentSemester = await SemesterModel.findById(semesterId);

    if (!currentSemester) {
      throw new ApiError("Semester not found", 404);
    }

    const semester = await SemesterModel.findByIdAndUpdate(
      semesterId,
      {
        ...payload,
        startingDate: new Date(payload.startingDate),
        endingDate: new Date(payload.endingDate),
      },
      { new: true, runValidators: true }
    );

    if (!semester) {
      throw new ApiError("Semester not found", 404);
    }

    if (String(currentSemester.courseId) !== payload.courseId) {
      await CourseModel.findByIdAndUpdate(currentSemester.courseId, {
        $pull: { semesterIds: currentSemester._id },
      });
      await CourseModel.findByIdAndUpdate(payload.courseId, {
        $addToSet: { semesterIds: semester._id },
      });
    }

    return serializeSemester(semester);
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      throw new ApiError("Semester code or number already exists for this course", 409);
    }

    throw error;
  }
}

export async function deleteSemester(semesterId: string) {
  await connectDB();
  assertObjectId(semesterId, "semester");

  const semester = await SemesterModel.findByIdAndDelete(semesterId);

  if (!semester) {
    throw new ApiError("Semester not found", 404);
  }

  await CourseModel.findByIdAndUpdate(semester.courseId, {
    $pull: { semesterIds: semester._id },
  });

  return { deletedSemesterId: semesterId };
}

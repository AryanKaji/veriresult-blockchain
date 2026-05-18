export type AdminCourse = {
  id: string;
  courseCode: string;
  courseName: string;
  description: string;
  durationInYears: number;
  semesterIds: string[];
  isAvailable: boolean;
};

export type AdminSemester = {
  id: string;
  semesterCode: string;
  semesterNumber: number;
  startingDate: string;
  endingDate: string;
  courseId: string;
  subjectIds: string[];
};

export type CourseInput = {
  courseCode: string;
  courseName: string;
  description: string;
  durationInYears: number;
  isAvailable: boolean;
};

export type SemesterInput = {
  semesterCode: string;
  semesterNumber: number;
  startingDate: string;
  endingDate: string;
  courseId: string;
};

export type AcademicPayload = {
  courses: AdminCourse[];
  semesters: AdminSemester[];
};

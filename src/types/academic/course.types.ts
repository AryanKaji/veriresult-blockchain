import { Document, Types } from "mongoose";

export interface ICourse {
    courseCode: string;                 // unique code for each course (e.g., "BCA", "MCA", etc.)
    courseName: string;                 // name of the course (e.g., "Bachelor of Computer Applications", etc.)
    description?: string;
    durationInYears: number;            // e.g., 1, 2, 3 etc.
    semesterIds: Types.ObjectId[];      // array of semester IDs associated with this course
    isAvailable: boolean;               // shows if this course is currently available for enrollment or not
}

export interface CourseDocument extends ICourse, Document { }

import { Document, Types } from "mongoose";

export interface ISemester {
    semesterCode: string;               // e.g., "BCA-SEM1", "MCA-SEM1", etc.
    semesterNumber: number;             // e.g., 1, 2, 3 etc.
    startingDate: Date;                 // starting Date of the Semester
    endingDate: Date;                   // ending Date of the Semester
    courseId: Types.ObjectId;           // course ID of the course
    subjectIds: Types.ObjectId[];       // array of subject IDs for the subjects in this semester
}

export interface SemesterDocument extends ISemester, Document { }
    
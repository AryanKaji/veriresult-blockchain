import { Document, Types } from "mongoose";

export interface AcademicYear {
    startYear: number;   // e.g. 2025
    endYear: number;    // e.g. 2026
}

export interface IClass {
    className: string;                              // e.g. "first Year", "Second Year", "Third Year" etc.
    section: string;                            // e.g. "A", "B", "C" etc.
    semesterId: Types.ObjectId;
    academicYear: AcademicYear;
    classTeacherId: Types.ObjectId | null;      // ObjectId of teacher
    numberOfStudents: number;                   // total number of students in the class
}

export interface ClassDocument extends IClass, Document { }

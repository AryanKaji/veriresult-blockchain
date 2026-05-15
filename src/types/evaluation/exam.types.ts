import { Document, Types } from "mongoose";

export enum ExamType {
    INTERNAL = "internal",
    MIDTERM = "midterm",
    FINAL = "final",
}

export interface SubjectMapping {
    subjectId: Types.ObjectId;
    examDate: Date;
}

export interface IExam {
    examName: string;                       // "Mid Term Exam 2026"
    examType: ExamType;
    courseId: Types.ObjectId;
    semesterId: Types.ObjectId;
    subjectDateMappings: SubjectMapping[];  // Array of subject and their corresponding exam dates
    startDate: Date;
    endDate: Date;
    totalMarks: number;
    passingMarks: number;
    isPublished: boolean;                   // once true -> no edits
}

export interface ExamDocument extends IExam, Document { }

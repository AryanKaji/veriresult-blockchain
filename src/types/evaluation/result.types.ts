import { Document, Types } from "mongoose";

export enum ResultStatus {
    PASS = "pass",
    FAIL = "fail",
    PENDING = "pending"
}

export interface ISubjectResult {
    subjectId: Types.ObjectId;
    marksObtained: number;
    maxMarks: number;
    grade?: string;
}

export interface IResult {
    studentEnrollmentNumber: string;
    courseId: Types.ObjectId;
    semesterId: Types.ObjectId;
    examId: Types.ObjectId;
    subjectResults: ISubjectResult[];
    totalMarksObtained: number;
    totalMaxMarks: number;
    percentage: number;
    status: ResultStatus;
    publishedAt?: Date;
    resultPdfUrl?: string;
    verificationCode?: string;
    generatedBy?: Types.ObjectId;
    isFinalized: boolean;   // once true -> NEVER update
}

export interface ResultDocument extends IResult, Document { }

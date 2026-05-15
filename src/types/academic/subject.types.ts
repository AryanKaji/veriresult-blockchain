import { Document, Types } from "mongoose";

export interface ISubject {
    subjectCode: string;           // e.g. "BCA101"
    subjectName: string;           // e.g. "Data Structures"
    description?: string;
    courseId: Types.ObjectId;      // linked course
    semesterId: Types.ObjectId;    // linked semester
    teacherIds: Types.ObjectId[];  // multiple teachers possible
    isPractical: boolean;          // is subject practical or not
}

export interface SubjectDocument extends ISubject, Document { }

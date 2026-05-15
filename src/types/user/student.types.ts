import { Document } from "mongoose";
import { UserRole } from "./role.types";
import { IBaseUser } from "./user.types";

export interface IStudent extends IBaseUser {
    enrollmentNumber: string;   // unique enrollment number for each students
    dateOfBirth?: Date;
    rollNumber: number;
    role: UserRole.STUDENT;
    courseCode: string;         // course code of course this strudent belongs to
    admissionDate?: Date;
}

export interface StudentDocument extends IStudent, Document { }

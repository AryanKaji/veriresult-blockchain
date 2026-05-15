import { Document, Types } from "mongoose";
import { UserRole } from "./role.types";
import { IBaseUser } from "./user.types";

export interface ITeacher extends IBaseUser {
    role: UserRole.TEACHER;
    assignedSubjectIds?: Types.ObjectId[];
}

export interface ITeacherDocument extends ITeacher, Document { }

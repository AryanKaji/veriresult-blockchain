import { Document } from "mongoose";
import { UserRole } from "./role.types";
import { IBaseUser } from "./user.types";

export interface IAdmin extends IBaseUser {
    role: UserRole.ADMIN;
}

export interface IAdminDocument extends IAdmin, Document { }

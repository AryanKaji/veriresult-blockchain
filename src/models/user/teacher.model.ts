import mongoose, { Schema } from "mongoose";
import { UserRole } from "@/src/types/user/role.types";
import { ITeacherDocument } from "@/src/types/user/teacher.types";

const TeacherSchema = new Schema<ITeacherDocument>({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: [UserRole.TEACHER],
        default: UserRole.TEACHER,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    assignedSubjectIds: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subject",
        },
    ],
}, { timestamps: true });

TeacherSchema.index({ email: 1 });
TeacherSchema.index({ assignedSubjectIds: 1 });
TeacherSchema.index({ isActive: 1 });

const TeacherModel = mongoose.models.Teacher ||
    mongoose.model("Teacher", TeacherSchema);

export default TeacherModel;

import mongoose, { Schema } from "mongoose";
import { UserRole } from "@/src/types/user/role.types";
import { StudentDocument } from "@/src/types/user/student.types";

const StudentSchema = new Schema<StudentDocument>({
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
        enum: [UserRole.STUDENT],
        default: UserRole.STUDENT,
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    enrollmentNumber: {
        type: String,
        required: true,
        unique: true,
    },

    rollNumber: {
        type: Number,
        default: 0,
        required: true,
    },

    dateOfBirth: {
        type: Date,
    },

    courseCode: {
        type: String,
        required: true,
    },

    admissionDate: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

StudentSchema.index({ enrollmentNumber: 1 });
StudentSchema.index({ courseCode: 1 });
StudentSchema.index({ rollNumber: 1 });
StudentSchema.index({ courseCode: 1, rollNumber: 1 });
StudentSchema.index({ isActive: 1 });

const StudentModel = mongoose.models.Student ||
    mongoose.model("Student", StudentSchema);

export default StudentModel;

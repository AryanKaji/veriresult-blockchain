import mongoose, { Schema } from "mongoose";
import { SemesterDocument } from "@/src/types/academic/semester.types";

const SemesterSchema = new Schema<SemesterDocument>({
    semesterCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
    },

    semesterNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
    },

    startingDate: {
        type: Date,
        required: true,
    },

    endingDate: {
        type: Date,
        required: true,
    },

    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },

    subjectIds: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Subject",
        }],
        default: []
    }
}, { timestamps: true });

SemesterSchema.index({ courseId: 1 });
SemesterSchema.index({ semesterNumber: 1 });
SemesterSchema.index({ courseId: 1, semesterNumber: 1 }, { unique: true });

const SemesterModel =
    mongoose.models.Semester ||
    mongoose.model<SemesterDocument>("Semester", SemesterSchema);

export default SemesterModel;

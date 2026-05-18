import { CourseDocument } from "@/src/types/academic/course.types";
import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema<CourseDocument>({
    courseCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    courseName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    durationInYears: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },

    semesterIds: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Semester",
        }],
        default: [],
    },

    isAvailable: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

CourseSchema.index({ courseCode: 1 });
CourseSchema.index({ isAvailable: 1 });

const CourseModel = mongoose.models.Course ||
    mongoose.model("Course", CourseSchema);

export default CourseModel;

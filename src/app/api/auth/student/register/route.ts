import { NextResponse } from "next/server";
import { registerStudent } from "@/src/features/auth/services/studentRegistrationService";
import { ApiError } from "@/src/lib/http/apiError";

// register new Student
export async function POST(req: Request) {
    try {
        const student = await registerStudent(await req.json());

        return NextResponse.json(
            {
                message: "Student registered successfully",
                student,
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof ApiError) {
            return NextResponse.json(
                { message: error.message },
                { status: error.statusCode }
            );
        }

        console.error("Student registration failed:", error);
        return NextResponse.json(
            { message: "Unable to register student" },
            { status: 500 }
        );
    }
}

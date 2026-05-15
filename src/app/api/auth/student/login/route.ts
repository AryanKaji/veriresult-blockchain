import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { StudentModel } from "@/src/models/user/student.model";
import { signToken } from "@/src/lib/auth/jwt";
import { setAuthCookie } from "@/src/lib/auth/cookies";

export async function POST(req: Request) {
    const { enrollmentNumber, password } = await req.json();

    const student = await StudentModel.findOne({ enrollmentNumber });

    if (!student) {
        return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({
        id: student._id,
        role: "student",
        enrollmentNumber: student.enrollmentNumber,
    });

    const res = NextResponse.json({ message: "Student login success" });

    res.headers.set("Set-Cookie", setAuthCookie(token));

    return res;
}

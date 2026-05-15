import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import TeacherModel from "@/src/models/user/teacher.model";
import { signToken } from "@/src/lib/auth/jwt";
import { setAuthCookie } from "@/src/lib/auth/cookies";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const teacher = await TeacherModel.findOne({ email });

    if (!teacher) {
        return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({
        id: teacher._id,
        role: "teacher",
        email: teacher.email,
    });

    const res = NextResponse.json({ message: "Teacher login success" });

    res.headers.set("Set-Cookie", setAuthCookie(token));

    return res;
}

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import TeacherModel from "@/src/models/user/teacher.model";
import { requireAdmin } from "@/src/lib/auth/adminGuard";
import { connectDB } from "@/src/lib/db";


// create a new teacher
export async function POST(req: NextRequest) {
    await connectDB();

    const admin = requireAdmin(req);

    if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, email, password } = await req.json();

    const existing = await TeacherModel.findOne({ email });

    if (existing) {
        return NextResponse.json({ message: "Teacher already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await TeacherModel.create({
        name,
        email,
        password: hashedPassword,
    });

    return NextResponse.json({
        message: "Teacher created successfully",
        teacher,
    });
}


// get all teachers
export async function GET(req: NextRequest) {
    const admin = requireAdmin(req);

    if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const teachers = await TeacherModel.find().select("-password");

    return NextResponse.json(teachers);
}

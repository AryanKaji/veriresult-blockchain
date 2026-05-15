import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/auth/adminGuard";
import bcrypt from "bcryptjs";
import TeacherModel from "@/src/models/user/teacher.model";
import { connectDB } from "@/src/lib/db";

interface TeacherUpdateBody {
    name?: string;
    email?: string;
    password?: string;
    isActive?: boolean;
}


// update teacher by id
export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ teacherId: string }> }
) {
    await connectDB();

    const { teacherId } = await context.params;
    if (!teacherId) {
        return NextResponse.json(
            { success: false, message: "ID is required" },
            { status: 400 }
        );
    }

    const admin = requireAdmin(req);

    if (!admin) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const body: TeacherUpdateBody = await req.json();

    const updateData: Partial<TeacherUpdateBody> = {
        name: body.name,
        email: body.email,
        isActive: body.isActive,
    };

    if (body.password) {
        updateData.password = await bcrypt.hash(body.password, 10);
    }

    const teacher = await TeacherModel.findByIdAndUpdate(
        teacherId,
        updateData,
        { returnDocument: 'after' }
    ).select("-password");

    if (!teacher) {
        return NextResponse.json(
            { message: "Teacher not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({
        message: "Teacher updated",
        teacher,
    });
}


// delete teacher by id
export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ teacherId: string }> }
) {
    await connectDB();

    const { teacherId } = await context.params;
    if (!teacherId) {
        return NextResponse.json(
            { success: false, message: "ID is required" },
            { status: 400 }
        );
    }

    const admin = requireAdmin(req);

    if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const deleted = await TeacherModel.findByIdAndDelete(teacherId);

    if (!deleted) {
        return NextResponse.json(
            { message: "Teacher not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({
        message: "Teacher deleted successfully",
    });
}

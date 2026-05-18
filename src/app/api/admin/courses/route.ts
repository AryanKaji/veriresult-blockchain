import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/auth/adminGuard";
import { handleApiError } from "@/src/lib/http/handleApiError";
import { createCourse, listCourses } from "@/src/features/academic/services/adminAcademicService";

function unauthorized() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) {
    return unauthorized();
  }

  try {
    return NextResponse.json(await listCourses());
  } catch (error) {
    return handleApiError(error, "Unable to load courses");
  }
}

export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) {
    return unauthorized();
  }

  try {
    const course = await createCourse(await req.json());

    return NextResponse.json(
      { message: "Course created successfully", course },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error, "Unable to create course");
  }
}

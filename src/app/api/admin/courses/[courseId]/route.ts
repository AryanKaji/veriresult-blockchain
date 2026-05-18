import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/auth/adminGuard";
import { deleteCourse, updateCourse } from "@/src/features/academic/services/adminAcademicService";
import { handleApiError } from "@/src/lib/http/handleApiError";

type CourseRouteContext = {
  params: Promise<{
    courseId: string;
  }>;
};

function unauthorized() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export async function PATCH(req: NextRequest, context: CourseRouteContext) {
  if (!requireAdmin(req)) {
    return unauthorized();
  }

  try {
    const { courseId } = await context.params;
    const course = await updateCourse(courseId, await req.json());

    return NextResponse.json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    return handleApiError(error, "Unable to update course");
  }
}

export async function DELETE(req: NextRequest, context: CourseRouteContext) {
  if (!requireAdmin(req)) {
    return unauthorized();
  }

  try {
    const { courseId } = await context.params;
    const result = await deleteCourse(courseId);

    return NextResponse.json({
      message: "Course and related semesters deleted successfully",
      ...result,
    });
  } catch (error) {
    return handleApiError(error, "Unable to delete course");
  }
}

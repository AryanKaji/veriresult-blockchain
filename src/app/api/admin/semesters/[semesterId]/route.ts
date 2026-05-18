import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/auth/adminGuard";
import {
  deleteSemester,
  updateSemester,
} from "@/src/features/academic/services/adminAcademicService";
import { handleApiError } from "@/src/lib/http/handleApiError";

type SemesterRouteContext = {
  params: Promise<{
    semesterId: string;
  }>;
};

function unauthorized() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export async function PATCH(req: NextRequest, context: SemesterRouteContext) {
  if (!requireAdmin(req)) {
    return unauthorized();
  }

  try {
    const { semesterId } = await context.params;
    const semester = await updateSemester(semesterId, await req.json());

    return NextResponse.json({
      message: "Semester updated successfully",
      semester,
    });
  } catch (error) {
    return handleApiError(error, "Unable to update semester");
  }
}

export async function DELETE(req: NextRequest, context: SemesterRouteContext) {
  if (!requireAdmin(req)) {
    return unauthorized();
  }

  try {
    const { semesterId } = await context.params;
    const result = await deleteSemester(semesterId);

    return NextResponse.json({
      message: "Semester deleted successfully",
      ...result,
    });
  } catch (error) {
    return handleApiError(error, "Unable to delete semester");
  }
}

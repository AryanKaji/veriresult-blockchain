import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/auth/adminGuard";
import { createSemester, listSemesters } from "@/src/features/academic/services/adminAcademicService";
import { handleApiError } from "@/src/lib/http/handleApiError";

function unauthorized() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) {
    return unauthorized();
  }

  try {
    return NextResponse.json(await listSemesters());
  } catch (error) {
    return handleApiError(error, "Unable to load semesters");
  }
}

export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) {
    return unauthorized();
  }

  try {
    const semester = await createSemester(await req.json());

    return NextResponse.json(
      { message: "Semester created successfully", semester },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error, "Unable to create semester");
  }
}

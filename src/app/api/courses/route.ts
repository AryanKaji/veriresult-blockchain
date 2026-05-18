import { NextResponse } from "next/server";
import { listAvailableCourseOptions } from "@/src/features/academic/services/adminAcademicService";
import { handleApiError } from "@/src/lib/http/handleApiError";

export async function GET() {
  try {
    return NextResponse.json(await listAvailableCourseOptions());
  } catch (error) {
    return handleApiError(error, "Unable to load courses");
  }
}

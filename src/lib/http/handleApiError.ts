import { NextResponse } from "next/server";
import { ApiError } from "./apiError";

export function handleApiError(error: unknown, fallbackMessage: string) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }

  console.error(fallbackMessage, error);
  return NextResponse.json({ message: fallbackMessage }, { status: 500 });
}

import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";
import { JwtPayload } from "@/src/types/auth/jwt.types";

export function requireAdmin(req: NextRequest): JwtPayload | null {
    const token = req.cookies.get("token")?.value;

    if (!token) return null;

    try {
        const decoded = verifyToken(token) as JwtPayload;

        if (decoded.role !== "admin") return null;

        return decoded;
    } catch {
        return null;
    }
}

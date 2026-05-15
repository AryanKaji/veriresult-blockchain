import jwt from "jsonwebtoken";
import { JwtPayload } from "@/src/types/auth/jwt.types";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function signToken(payload: object) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d",
    });
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

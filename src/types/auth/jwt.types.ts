export interface JwtPayload {
    id?: string;
    role: "admin" | "teacher" | "student";
    email?: string;
    enrollmentNumber?: string;
    iat?: number;
    exp?: number;
}

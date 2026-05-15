import { NextResponse } from "next/server";
import { signToken } from "@/src/lib/auth/jwt";
import { setAuthCookie } from "@/src/lib/auth/cookies";


// admin login
export async function POST(req: Request) {
    const { email, password } = await req.json();

    const isValid =
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD;

    if (!isValid) {
        return NextResponse.json(
            { message: "Invalid admin credentials" },
            { status: 401 }
        );
    }

    const token = signToken({
        role: "admin",
        email,
    });

    const res = NextResponse.json({ message: "Admin login success" });

    res.headers.set("Set-Cookie", setAuthCookie(token));

    return res;
}

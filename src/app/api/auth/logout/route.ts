import { NextResponse } from "next/server";


// logout route
export async function POST() {
    const res = NextResponse.json({ message: "Logged out" });

    res.headers.set(
        "Set-Cookie",
        "token=; Path=/; HttpOnly; Max-Age=0"
    );

    return res;
}

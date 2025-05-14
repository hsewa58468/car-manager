// middleware.ts
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
    if (request.method === "POST") {
        const data = await request.json();
        if (!data.name || !data.price) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }
    }
    return NextResponse.next();
}

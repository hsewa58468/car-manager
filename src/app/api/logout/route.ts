// app/api/logout/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export const dynamic = "force-dynamic"; // 禁用靜態快取

export async function POST(req: Request) {
    const { refreshToken } = await req.json();
    await prisma.refreshToken.updateMany({
        where: { hashedToken: refreshToken },
        data: { revoked: true },
    });
    return NextResponse.json({ message: "登出成功" }, { status: 200 });
}

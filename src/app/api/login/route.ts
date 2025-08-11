// // app/api/login/route.ts
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { prisma } from "@lib/prisma";

// export const dynamic = "force-dynamic"; // 禁用靜態快取

// export async function POST(req: Request) {
//     const { email, password } = await req.json();
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//         return NextResponse.json({ error: "帳號或密碼錯誤" }, { status: 401 });
//     }
//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) {
//         return NextResponse.json({ error: "帳號或密碼錯誤" }, { status: 401 });
//     }
//     // 產生 accessToken
//     const accessToken = jwt.sign(
//         { userId: user.id, role: user.role },
//         process.env.JWT_SECRET!,
//         { expiresIn: "1h" }
//     );
//     // 產生 refreshToken 並儲存於資料庫
//     const refreshToken = jwt.sign(
//         { userId: user.id },
//         process.env.JWT_SECRET!,
//         { expiresIn: "7d" }
//     );
//     await prisma.refreshToken.create({
//         data: {
//             hashedToken: refreshToken, // 建議加密儲存
//             userId: user.id,
//             expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//         },
//     });
//     return NextResponse.json({ accessToken, refreshToken }, { status: 200 });
// }

// // app/api/logout/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "@lib/prisma";
// import bcrypt from "bcryptjs";

// export const dynamic = "force-dynamic"; // 禁用靜態快取

// export async function POST(request: Request) {
//     try {
//         const { email, password, role } = await request.json();

//         // 檢查 email 是否已存在
//         const exist = await prisma.user.findUnique({ where: { email } });
//         if (exist) {
//             return NextResponse.json(
//                 { error: "Email 已註冊" },
//                 { status: 409 }
//             );
//         }

//         // 密碼加密
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // 建立新用戶
//         const newUser = await prisma.user.create({
//             data: {
//                 email,
//                 password: hashedPassword,
//                 role,
//             },
//             select: {
//                 id: true,
//                 email: true,
//                 role: true,
//                 createdAt: true,
//             },
//         });

//         return NextResponse.json({ user: newUser }, { status: 201 });
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//         return NextResponse.json({ error: "註冊失敗" }, { status: 500 });
//     }
// }

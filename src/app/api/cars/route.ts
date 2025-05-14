// app/api/cars/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export const dynamic = "force-dynamic"; // 禁用靜態快取

// 取得當前資料
export async function GET() {
    try {
        const cars = await prisma.car.findMany({
            include: { specs: true },
        });
        return NextResponse.json(cars);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ error: "Database Error" }, { status: 500 });
    }
}

// 新增資料
export async function POST(request: Request) {
    try {
        const { id, brand, name, price, imageUrl, specs } =
            await request.json();

        // 檢查是否已存在關聯規格
        const existingCar = await prisma.car.findFirst({
            where: { name },
            include: { specs: true },
        });

        if (existingCar?.specs) {
            return NextResponse.json(
                { error: "此車輛已有規格配置" },
                { status: 400 }
            );
        }

        // 新建車輛與規格
        const newCar = await prisma.car.create({
            data: {
                id,
                brand,
                name,
                price,
                imageUrl,
                specs: {
                    create: {
                        year: specs.year,
                        color: specs.color,
                        engineCC: specs.engineCC,
                        transmission: specs.transmission,
                    },
                },
            },
            include: { specs: true },
        });

        return NextResponse.json(newCar, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "資料庫寫入失敗" }, { status: 500 });
    }
}

// 刪除指定資料
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        // 級聯刪除關聯規格
        await prisma.car.delete({
            where: { id },
            include: { specs: true },
        });

        return NextResponse.json(
            { message: "刪除成功，ID 已釋放" },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "刪除失敗" }, { status: 500 });
    }
}

// scripts/seed.ts
import { prisma } from "@lib/prisma";

const carData = [
    {
        id: "Toyota-suv-01",
        brand: "Toyota",
        name: "Corolla Cross",
        price: "約 $79.9~110.9 萬",
        imageUrl: "https://example.com/corolla.jpg",
        specs: {
            year: 2025,
            color: "多色可選",
            engineCC: "1798cc / 1987cc",
            transmission: "CVT",
        },
    },
];

async function main() {
    // 使用事務批量處理
    await prisma.$transaction(
        carData.map((car) =>
            prisma.car.create({
                data: {
                    id: car.id,
                    brand: car.brand,
                    name: car.name,
                    price: car.price,
                    imageUrl: car.imageUrl,
                    specs: {
                        create: {
                            // 關鍵修正：使用嵌套 create
                            year: car.specs.year,
                            color: car.specs.color,
                            engineCC: car.specs.engineCC,
                            transmission: car.specs.transmission,
                        },
                    },
                },
            })
        )
    );
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

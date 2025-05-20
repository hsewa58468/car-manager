// scripts/seed.ts
import { prisma } from "@lib/prisma";

const carData = [
    {
        id: "Toyota-suv-01",
        brand: "Toyota",
        name: "Corolla Cross",
        price: "約 $79.9~110.9 萬",
        imageUrl: "https://example.com/corolla.jpg",
        imageGroup: [
            "https://static.liontech.com.tw/ConsoleAPData/PublicationStatic/lion_tw_b2c/zh-tw/_ModelFile/PrimaryVisual/150504/795367c680c84f6897577a34f0ab70c1.jpg",
            "https://static.liontech.com.tw/ConsoleAPData/PublicationStatic/lion_tw_b2c/zh-tw/_ModelFile/PrimaryVisual/150504/4becddd8b4b74481abb77003d7a6e508.jpg",
            "https://static.liontech.com.tw/ConsoleAPData/PublicationStatic/lion_tw_b2c/zh-tw/_ModelFile/PrimaryVisual/150504/384c3d7e75814e13a49fad7259f8a73d.jpg",
        ],
        specs: {
            year: 2025,
            color: "多色可選",
            engineCC: "1798cc / 1987cc",
            transmission: "CVT",
        },
        info: [
            {
                title: "主被動安全",
                special: [
                    "7 具 SRS 輔助氣囊",
                    "Toyota Safety Sense 3.0",
                    "VSC 車輛穩定控制系統",
                    "ACC 主動車距維持巡航",
                ],
            },
            {
                title: "外觀配備",
                special: ["LED 頭燈", "17 吋鋁圈", "電動摺疊後視鏡"],
            },
            {
                title: "內裝配備",
                special: ["皮質座椅", "雙區恆溫空調", "9 吋多媒體觸控螢幕"],
            },
            {
                title: "動力規格",
                special: [
                    "1798cc 直列四缸引擎",
                    "最大馬力 140ps",
                    "CVT 無段變速",
                ],
            },
            {
                title: "科技/多媒體",
                special: [
                    "Apple CarPlay / Android Auto",
                    "倒車顯影",
                    "數位儀表",
                ],
            },
        ],
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

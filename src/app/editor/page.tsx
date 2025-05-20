"use client";
import React, { useEffect, useState, useCallback } from "react";
// import { prisma } from "@lib/prisma";
const carDetail = {
    id: "Toyota-suv-01",
    brand: "Toyota",
    name: "Corolla Cross",
    imageGroup: [
        "https://static.liontech.com.tw/ConsoleAPData/PublicationStatic/lion_tw_b2c/zh-tw/_ModelFile/PrimaryVisual/150504/795367c680c84f6897577a34f0ab70c1.jpg",
        "https://static.liontech.com.tw/ConsoleAPData/PublicationStatic/lion_tw_b2c/zh-tw/_ModelFile/PrimaryVisual/150504/4becddd8b4b74481abb77003d7a6e508.jpg",
        "https://static.liontech.com.tw/ConsoleAPData/PublicationStatic/lion_tw_b2c/zh-tw/_ModelFile/PrimaryVisual/150504/384c3d7e75814e13a49fad7259f8a73d.jpg",
    ],
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
            special: ["1798cc 直列四缸引擎", "最大馬力 140ps", "CVT 無段變速"],
        },
        {
            title: "科技/多媒體",
            special: ["Apple CarPlay / Android Auto", "倒車顯影", "數位儀表"],
        },
    ],
};

type CarData = {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
    imageGroup: string[];
    specs: {
        year: number;
        transmission: string;
    }[];
    info: {
        title: string;
        special: string[];
    }[];
};

export default function Editor() {
    const [deleteId, setDeleteId] = useState<string>("");

    const [cars, setCars] = useState<CarData[]>([]);

    const fetchCars = useCallback(() => {
        fetch("/api/cars", {
            method: "GET", // 明確指定方法
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => setCars(data));
    }, []);

    // 初始化載入與刷新觸發
    useEffect(() => {
        fetchCars();
    }, [fetchCars]); // 加入 refreshKey 作為依賴
    useEffect(() => {
        console.log("確認結果", cars);
    }, [cars]);

    // 前端元件中
    async function addCar() {
        const response = await fetch("/api/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
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
                        special: [
                            "皮質座椅",
                            "雙區恆溫空調",
                            "9 吋多媒體觸控螢幕",
                        ],
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
            }),
        });
        const result = await response.json();
        console.log("新增結果:", result);
        fetchCars();
    }
    async function deleteCar(id: string) {
        const res = await fetch("/api/cars", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        const result = await res.json();
        console.log(result);
        fetchCars();
    }

    return (
        <div className="max-w-[980px] mx-auto p-4">
            {/* 車名 */}
            <h1 className="text-2xl font-bold mb-6">{carDetail.name}</h1>
            <button onClick={addCar}>add info</button>
            <input
                type="input"
                id="idData"
                className="border border-gray-300 rounded p-2 m-4"
                value={deleteId ?? ""}
                onChange={(e) => setDeleteId(e.target.value)}
            />
            <button onClick={() => deleteCar(deleteId)}>delete info</button>
        </div>
    );
}

"use client";
import React, { useEffect, useState, useCallback } from "react";
import CollapsibleTabs from "@/components/collapse";
import Carousel from "@/components/carousel";
import CollapsePanel from "@/components/test";

import { I_CarData } from "../interfaces/common_type";
// import { prisma } from "@lib/prisma";
const carDetail = {
    id: "Toyota-suv-01",
    brand: "Toyota",
    name: "Corolla Cross",
    image: [
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

const renderItems = (items: typeof carDetail.info) => {
    return (
        <div className="flex-1 flex flex-col gap-4">
            {items.map((item, index) => (
                <CollapsibleTabs
                    key={item.title}
                    section={item.title}
                    items={item.special}
                    index={index}
                />
            ))}
        </div>
    );
};

export default function Info() {
    const splitIndex = Math.ceil(carDetail.info.length / 2);
    const leftItems = carDetail.info.slice(0, splitIndex);
    const rightItems = carDetail.info.slice(splitIndex);

    const [cars, setCars] = useState<I_CarData[]>([]);

    const fetchCars = useCallback(() => {
        fetch("/api/cars", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => setCars(data));
    }, []);

    useEffect(() => {
        fetchCars();
    }, [fetchCars]);

    useEffect(() => {
        console.log(cars);
    }, [cars]);

    return (
        <div className="max-w-[980px] mt-[45px] mx-auto p-4 ">
            {/* 上方大圖 */}
            <Carousel images={carDetail.image} altPrefix={carDetail.name} />
            {/* 車名 */}
            <h1 className="text-2xl font-bold mb-6">{carDetail.name}</h1>
            {/* 分區規格 */}
            <div className="mb-8 p-6 bg-[#f3f3f37a] rounded-lg shadow-md ">
                <h2 className="text-3xl font-bold mb-6">車輛規格</h2>
                <div className="flex gap-4">
                    {renderItems(leftItems)}
                    {renderItems(rightItems)}
                </div>
            </div>

            <CollapsePanel />
        </div>
    );
}

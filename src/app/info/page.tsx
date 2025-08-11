"use client";
import React, { useEffect, useState, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

import CollapsibleTabs from "@/components/collapse";
import Carousel from "@/components/carousel";
import WrapBlock from "@/components/wrapBlock";
import CarWithWheels from "@/components/movingCar";
import Chat from "@/components/chat";
// import CollapsePanel from "@/components/test";

// import { I_CarData } from "../interfaces/common_type";
const carDetail = {
    id: "Mazda-suv-01",
    brand: "Mazda",
    name: "CX-5",
    image: ["/cx5_1.jpg", "/cx5_2.jpg", "/cx5_3.jpg"],
    info: [
        {
            title: "主被動安全",
            special: [
                "6 具 SRS 輔助氣囊",
                "Mazda i-ACTIVSENSE 主動安全科技",
                "DSC 動態穩定控制系統",
                "MRCC 全速域主動車距巡航",
                "SBS 智慧型煞車輔助系統",
            ],
        },
        {
            title: "外觀配備",
            special: [
                "LED 頭燈（自動水平調整）",
                "19 吋鋁合金輪圈",
                "電動摺疊防眩後視鏡",
                "感應式雨刷",
            ],
        },
        {
            title: "內裝配備",
            special: [
                "NAPPA 真皮座椅",
                "雙區恆溫空調",
                "10.25 吋多媒體觸控螢幕",
                "BOSE® 環繞音響系統",
            ],
        },
        {
            title: "動力規格",
            special: [
                "2488cc SKYACTIV-G 直列四缸引擎",
                "最大馬力 194ps",
                "6 速手自排變速箱",
                "i-STOP 怠速熄火系統",
            ],
        },
        {
            title: "科技/多媒體",
            special: [
                "Apple CarPlay / Android Auto",
                "360° 環景影像輔助",
                "數位儀表",
                "智慧型免鑰匙系統",
            ],
        },
    ],
};

const key_equipment = [
    {
        name: "MRCC 全速域主動車距巡航",
        description:
            "先進的主動安全系統，包含自動緊急煞車、車道偏移警示等功能。",
        icon: "memberIcon",
    },
    {
        name: "LED 頭燈",
        description: "提供更佳的照明效果和能效。",
        icon: "memberIcon",
    },
    {
        name: "雙區恆溫空調",
        description: "前後座乘客可享受不同的溫度設定。",
        icon: "memberIcon",
    },
];

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
    const [windowWidth, setWindowWidth] = useState(1920); // 預設值可自訂
    const [botOpen, setBotOpen] = useState(false);
    const [botAniOpen, setBotAniOpen] = useState(false);

    function openBot() {
        setBotOpen(true);
        setBotAniOpen(true);
    }

    function closeBot() {
        setBotAniOpen(false);
        setTimeout(() => {
            setBotOpen(false);
        }, 500); // 延遲以確保動畫效果
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
        }
    }, []);

    // const [cars, setCars] = useState<I_CarData[]>([]);
    // console.log("cars", cars);

    // const fetchCars = useCallback(() => {
    //     fetch("/api/cars", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((data) => setCars(data));
    // }, []);

    // useEffect(() => {
    //     // fetchCars();
    // }, [fetchCars]);

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [`${0 - 480}px`, `${windowWidth}px`]
    );

    return (
        <div ref={ref} className="max-w-[980px] mt-[45px] mx-auto p-4 ">
            <section className="relative w-full flex flex-col items-center justify-center py-2 bg-white">
                <h1 className="text-2xl font-bold">
                    {carDetail.brand} {carDetail.name}
                </h1>
            </section>

            {/* 輪播圖 */}
            <section className="w-full py-6 text-white flex items-center justify-center">
                <Carousel images={carDetail.image} altPrefix={carDetail.name} />
            </section>

            <section className="flex flex-col px-6 w-full py-10 rounded bg-gray-50 gap-y-8">
                <WrapBlock title="重點配備" map={key_equipment} />
                <h2 className="text-2xl font-bold">車輛規格</h2>
                <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderItems(leftItems)}
                    {renderItems(rightItems)}
                </div>{" "}
            </section>

            <section className="z-[-1] sticky top-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-center px-6">
                <h1 className="text-5xl font-bold mb-6">Mazda</h1>
                <p className="text-xl max-w-2xl text-gray-600">
                    專注完美 近乎苛求
                </p>
            </section>

            <section className="px-6 py-24">
                <h2 className="text-4xl font-semibold mb-6">車型介紹</h2>
                <p className="text-lg text-gray-700 max-w-3xl">
                    本車採用流線型設計，融合現代科技與極致性能，適合城市與長途旅行使用。
                </p>
            </section>

            <section className="px-6 py-12 bg-white rounded">
                <h2 className="text-4xl font-semibold mb-6">功能特色</h2>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                    <li>智慧駕駛輔助系統</li>
                    <li>全景玻璃車頂</li>
                    <li>多模式電動驅動</li>
                    <li>智慧語音控制</li>
                </ul>
            </section>

            <section className="px-6 py-24">
                <h2 className="text-4xl font-semibold mb-6">配備與內裝</h2>
                <p className="text-lg text-gray-700 max-w-3xl">
                    豪華內裝搭配環繞音響系統與環境氛圍燈，提供極致舒適駕乘體驗。
                </p>
            </section>

            <section className="px-6 py-12 bg-white rounded">
                <h2 className="text-4xl font-semibold mb-6">技術規格</h2>
                <table className="w-full max-w-4xl mx-auto table-auto border text-left">
                    <tbody>
                        <tr className="border-b">
                            <th className="py-2 px-4">最大馬力</th>
                            <td className="py-2 px-4">194ps</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-2 px-4">變速箱</th>
                            <td className="py-2 px-4">6速手自排</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-2 px-4">驅動方式</th>
                            <td className="py-2 px-4">前輪驅動/四輪驅動</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-2 px-4">油耗</th>
                            <td className="py-2 px-4">平均 13.6 km/L</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* <CollapsePanel /> */}

            {/* moving car */}
            <CarWithWheels x={x} scrollYProgress={scrollYProgress} />

            {/* chatbot */}
            <button
                onClick={() => openBot()}
                className="fixed bottom-24 right-6 z-50 h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition cursor-pointer focus:outline-none"
                aria-label="開啟聊天">
                {/* 可用自訂icon、SVG或 emoji */}
                <img src="/robot.png" />
            </button>

            {/* 背景半透明遮罩 */}
            {botOpen && (
                <div
                    className={`fixed inset-0 md:z-50 bg-black/60 flex justify-center items-center md:justify-end `}
                    onClick={() => closeBot()}>
                    <div
                        className={`m-4 sm:my-8 sm:mx-24  w-[360px] ${
                            botAniOpen
                                ? "animate-fade-in-slide-left"
                                : "animate-fade-out-slide-left"
                        }`}
                        onClick={(e) => e.stopPropagation()}>
                        <Chat />
                    </div>
                </div>
            )}
        </div>
    );
}

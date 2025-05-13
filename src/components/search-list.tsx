"use client";

import React from "react";

const cars = [
    {
        id: 1,
        name: "Corolla Cross",
        price: "約 $79.9~110.9 萬",
        image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=800&q=80",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "1798cc / 1987cc",
            變速箱: "CVT",
        },
    },
    {
        id: 2,
        name: "Town Ace 廂型車/貨卡",
        price: "約 $51.5~62.5 萬",
        image: "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=800&q=80",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "1496cc",
            變速箱: "5速手排 / 4速自排",
        },
    },
    {
        id: 3,
        name: "RAV4",
        price: "約 $97.9~131.9 萬",
        image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "1987cc / 2487cc",
            變速箱: "CVT / E-CVT",
        },
    },
    {
        id: 4,
        name: "Yaris Cross",
        price: "約 $69.5~79.5 萬",
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "1490cc",
            變速箱: "CVT",
        },
    },
    {
        id: 5,
        name: "Yaris",
        price: "約 $59.5~69.5 萬",
        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "1496cc",
            變速箱: "CVT",
        },
    },
    {
        id: 6,
        name: "Corolla Altis",
        price: "約 $74.5~89.5 萬",
        image: "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=800&q=80",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "1798cc",
            變速箱: "CVT",
        },
    },
    {
        id: 7,
        name: "Camry",
        price: "約 $109.9~139.9 萬",
        image: "https://hotaicdn.azureedge.net/toyotaweb/CAR_202407041114277HB6HCG8.png",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "2487cc",
            變速箱: "E-CVT",
        },
    },
    {
        id: 8,
        name: "GR86",
        price: "約 $158.0 萬",
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "2387cc",
            變速箱: "6速手排 / 6速自排",
        },
    },
    {
        id: 9,
        name: "GR Yaris",
        price: "約 $168.0 萬",
        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "1618cc",
            變速箱: "6速手排",
        },
    },
    {
        id: 10,
        name: "Corolla Sport",
        price: "約 $85.5~92.5 萬",
        image: "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=800&q=80",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "1798cc",
            變速箱: "CVT",
        },
    },
    {
        id: 11,
        name: "Prius PHEV",
        price: "約 $129.9~137.9 萬",
        image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "1987cc + 電動馬達",
            變速箱: "E-CVT",
        },
    },
    {
        id: 12,
        name: "Crown",
        price: "約 $157.0~210.0 萬",
        image: "//hotaicdn.azureedge.net/toyotaweb/CMS_20250417132123A2A13759.jpg",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "2393cc",
            變速箱: "E-CVT",
        },
    },
    {
        id: 13,
        name: "Land Cruiser 250",
        price: "預計 $250.0 萬以上",
        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "2755cc 柴油輕油電",
            變速箱: "8速自排",
        },
    },
    {
        id: 14,
        name: "Alphard PHEV",
        price: "預計 $250.0 萬以上",
        image: "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=800&q=80",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "2487cc + 電動馬達",
            變速箱: "E-CVT",
        },
    },
    {
        id: 15,
        name: "GR Supra",
        price: "約 $258.0 萬",
        image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80",
        specs: {
            年份: 2025,
            顏色: "多色可選",
            排氣量: "2998cc",
            變速箱: "8速自排",
        },
    },
];

const SearchList: React.FC = () => {
    return (
        <div className="space-y-6 mt-8 px-[5%] w-full">
            {cars.map((car) => (
                <div
                    key={car.name}
                    className="relative flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden max-w-md md:max-w-2xl mx-auto mb-6">
                    {/* 圖片區塊 */}
                    <img
                        className="w-full h-48 object-cover md:w-48 md:h-auto"
                        src={car.image}
                        alt={car.name}
                    />
                    {/* 內容區塊 */}
                    <div className="flex flex-col justify-between p-4 flex-1 relative">
                        <div>
                            <h3 className="text-gray-700 text-xl font-bold mb-2">
                                {car.name}
                            </h3>
                            <ul className="text-gray-700 text-sm space-y-1">
                                {Object.entries(car.specs).map(
                                    ([key, value]) => (
                                        <li key={key}>
                                            <span className="font-medium">
                                                {key}：
                                            </span>
                                            <span>{value}</span>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        {/* 價格：m板下方/pc右下 */}
                        <div>
                            {/* m板直式下方價格 */}
                            <div className="block md:hidden mt-4">
                                <span className="text-lg font-bold text-blue-700">
                                    {car.price}
                                </span>
                            </div>
                            {/* pc橫式右下價格 */}
                            <div className="hidden md:block absolute right-4 bottom-4">
                                <span className="text-lg font-bold text-blue-700">
                                    {car.price}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchList;

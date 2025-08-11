"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface CarouselProps {
    images: string[];
    altPrefix: string;
}

const Carousel = ({ images, altPrefix }: CarouselProps) => {
    const clonedImages = React.useMemo(() => {
        if (images.length <= 1) return images;
        return [images[images.length - 1], ...images, images[0]];
    }, [images]);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isover, setIsover] = useState(false);
    const startX = useRef(0);
    const isDragging = useRef(false);

    const goToPrev = () => {
        if (isAnimating) return;
        const prevIndex =
            (currentIndex - 1 + clonedImages.length) % clonedImages.length;
        setIsAnimating(true);
        setCurrentIndex(prevIndex);
        if (prevIndex === 0) {
            setTimeout(() => {
                setIsover(true);
                setCurrentIndex(images.length);
            }, 350);
        }
        setTimeout(() => {
            setIsAnimating(false);
            setIsover(false);
        }, 400);
    };

    const goToNext = React.useCallback(() => {
        if (isAnimating) return;
        const nextIndex = (currentIndex + 1) % clonedImages.length;

        setIsAnimating(true);
        setCurrentIndex(nextIndex);
        if (nextIndex === clonedImages.length - 1) {
            setTimeout(() => {
                setIsover(true);
                setCurrentIndex(1);
            }, 350);
        }

        setTimeout(() => {
            setIsAnimating(false);
            setIsover(false);
        }, 400);
    }, [isAnimating, currentIndex, clonedImages.length]);

    // 觸控事件
    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        startX.current = e.touches[0].clientX;
        isDragging.current = true;
    };
    const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging.current) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX.current;
        if (diff > 50) {
            goToPrev();
            isDragging.current = false;
        } else if (diff < -50) {
            goToNext();
            isDragging.current = false;
        }
    };
    const onTouchEnd = () => {
        isDragging.current = false;
    };

    // 自動輪播
    useEffect(() => {
        const intervalId = setInterval(() => {
            goToNext();
        }, 5000);
        return () => clearInterval(intervalId); // 清除 interval
    }, [currentIndex, goToNext]); // 或 []

    return (
        <div
            className="w-full max-w-[1920px] mx-auto rounded-xl overflow-hidden mb-6 shadow relative group"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}>
            {/* 輪播圖片容器 */}
            <div className="relative aspect-video overflow-hidden">
                <div
                    className={`flex ${
                        isover
                            ? ""
                            : "transition-transform duration-400 ease-in-out"
                    } `}
                    style={{
                        width: `${clonedImages.length * 100}%`,
                        transform: `translateX(-${
                            currentIndex * (100 / clonedImages.length)
                        }%)`,
                    }}>
                    {clonedImages.map((img, index) => (
                        <div
                            key={index}
                            className={`relative w-full aspect-video`}>
                            <Image
                                src={img}
                                alt={`${altPrefix} - 圖片 ${index + 1}`}
                                fill
                                className="object-cover"
                                priority={index === 0}
                                sizes="100vw"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* 導航按鈕 */}
            <button
                onClick={goToPrev}
                className="hidden absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors group-hover:opacity-100">
                Prev
            </button>
            <button
                onClick={goToNext}
                className="hidden absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors group-hover:opacity-100">
                Next
            </button>

            {/* 指示點 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            index + 1 === currentIndex
                                ? "bg-white"
                                : "bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;

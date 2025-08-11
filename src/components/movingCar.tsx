"use client";
import React, { useState, useEffect } from "react";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";

interface CarWithWheelsProps {
    x: MotionValue<string>;
    scrollYProgress?: MotionValue<number>;
}

function CarWithWheels({ x }: CarWithWheelsProps) {
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const totalScrollForOneRotation = 60; // 3600px 滾動一圈
        const handleScroll = () => {
            const deg = (window.scrollY / totalScrollForOneRotation) * 360;
            setAngle(deg);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div
            style={{ x }}
            className="w-[500px] h-[200px] fixed bottom-[50px] left-0 pointer-events-none">
            {/* 車身 */}
            <Image
                src="/car.png"
                alt="Car Body"
                width={500}
                height={200}
                className="absolute left-0 top-0 w-full opacity-20 "
            />
            {/* 後輪 */}
            <Image
                src="/wheel.png"
                alt="Front Wheel"
                className="absolute left-[60px] top-[175px] opacity-10 "
                width={75}
                height={75}
                style={{ transform: `rotate(${angle}deg)` }}
            />
            {/* 前輪 */}
            <Image
                src="/wheel.png"
                alt="Rear Wheel"
                className="absolute left-[353px] top-[175px] opacity-10 "
                width={75}
                height={75}
                style={{ transform: `rotate(${angle}deg)` }}
            />
        </motion.div>
    );
}

export default CarWithWheels;

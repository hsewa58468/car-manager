"use client";
import React, { useEffect, useState } from "react";
import Error from "next/error";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);

        if (typeof window !== "undefined") {
            console.log("window");

            setIsLoggedIn(!!localStorage.getItem("accessToken"));

            const handler = () => {
                setIsLoggedIn(!!localStorage.getItem("accessToken"));
            };
            window.addEventListener("storage", handler);

            return () => window.removeEventListener("storage", handler);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            setIsLoggedIn(!!localStorage.getItem("accessToken"));
        }
    }, [pathname, isMounted]);

    async function logout() {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await fetch("/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });
        const data = await res.json();
        setIsLoggedIn(false);

        if (res.ok) {
            // 清除本地 token
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            console.log(data.message);
            return true;
        } else {
            throw new Error(data.error || "登出失敗");
        }
    }
    return (
        <nav className="flex space-x-6 py-4 px-8 bg-gray-800 text-white text-lg font-bold">
            <Link href="/" className="hover:text-blue-300">
                首頁
            </Link>
            <Link href="/search" className="hover:text-blue-300">
                搜尋
            </Link>
            <Link href="/info" className="hover:text-blue-300">
                資訊
            </Link>
            {isMounted && isLoggedIn && (
                <Link href="/editor" className="hover:text-blue-300">
                    後臺編輯
                </Link>
            )}
            <Link href="/Administrator" className="hover:text-blue-300">
                log
            </Link>
            {isMounted && isLoggedIn && (
                <button
                    className={`absolute top-0 right-0 border border-red-300 rounded p-2 m-2`}
                    onClick={logout}>
                    登出
                </button>
            )}
        </nav>
    );
}

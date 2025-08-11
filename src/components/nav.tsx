"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="relative left-1/2 top-12 -translate-x-1/2 w-40 flex space-x-6 py-4 px-8 text-white text-lg font-bold rounded-full bg-slate-500 shadow-lg shadow-slate-500/50 z-10">
            <Link href="/" className="hover:text-blue-300">
                首頁
            </Link>
            {/* <Link href="/search" className="hover:text-blue-300">
                搜尋
            </Link> */}
            <Link href="/info" className="hover:text-blue-300">
                資訊
            </Link>
            
        </nav>
    );
}

"use client";
import Link from "next/link";

export default function Navbar() {
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
        </nav>
    );
}

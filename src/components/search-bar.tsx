"use client";

import React, { useState, FormEvent } from "react";

interface SearchBarProps {
    onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (onSearch) onSearch(query);
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-6"
            role="search">
            <label htmlFor="search-bar" className="sr-only">
                搜尋
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    {/* 搜尋圖示 (SVG) */}
                    <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    id="search-bar"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="請輸入關鍵字"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                    搜尋
                </button>
            </div>
        </form>
    );
};

export default SearchBar;

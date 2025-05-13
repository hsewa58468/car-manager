"use client";
import React, { useState } from "react";

interface CollapsibleTabsProps {
    section: string;
    items: string[];
    index: number;
}

const CollapsibleTabs: React.FC<CollapsibleTabsProps> = ({
    section,
    items,
    index,
}) => {
    const [open, setOpen] = useState<boolean>(true);
    return (
        <div className={`mb-4 ${index % 2 !== 0 ? "right" : "left"}`}>
            <div
                key={section}
                className={`font-hand inset-shadow-b-dark mx-auto flex w-full flex-1 flex-col rounded-xl bg-neutral-300 p-5`}>
                <h2
                    className="text-lg font-semibold mb-2 text-black border-l-4 border-blue-500 pl-2 cursor-pointer select-none"
                    onClick={() => setOpen(!open)}>
                    {section}
                </h2>
                <ul
                    className={`list-disc list-inside text-gray-700 scale-y-0 origin-top duration-400 ${
                        open ? "scale-y-100 max-h-none" : "max-h-0"
                    }`}>
                    {items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CollapsibleTabs;

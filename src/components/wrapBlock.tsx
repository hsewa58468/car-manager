import React from "react";

interface infoMapProps {
    name?: string;
    description?: string;
    icon?: string;
}

interface WrapBlockProps {
    title?: string;
    map?: infoMapProps[];
}

function wrapBlock({ title, map }: WrapBlockProps) {
    return (
        <section>
            <h5 className="font-bold text-2xl ">{title}</h5>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                {map?.map((child, index) => (
                    <div
                        key={index}
                        className="flex-1 p-4 bg-white rounded-lg shadow-md">
                        <p className="font-bold">{map?.[index]?.name}</p>
                        {child.description}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default wrapBlock;

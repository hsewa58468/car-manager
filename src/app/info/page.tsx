// app/info/page.tsx
import CollapsibleTabs from "@/components/collapse";
import Carousel from "@/components/carousel";

const carDetail = {
    name: "Corolla Cross",
    image: [
        "https://static.liontech.com.tw/ConsoleAPData/PublicationStatic/lion_tw_b2c/zh-tw/_ModelFile/PrimaryVisual/150504/795367c680c84f6897577a34f0ab70c1.jpg",
        "https://static.liontech.com.tw/ConsoleAPData/PublicationStatic/lion_tw_b2c/zh-tw/_ModelFile/PrimaryVisual/150504/4becddd8b4b74481abb77003d7a6e508.jpg",
        "https://static.liontech.com.tw/ConsoleAPData/PublicationStatic/lion_tw_b2c/zh-tw/_ModelFile/PrimaryVisual/150504/384c3d7e75814e13a49fad7259f8a73d.jpg",
    ],
    specs: {
        主被動安全: [
            "7 具 SRS 輔助氣囊",
            "Toyota Safety Sense 3.0",
            "VSC 車輛穩定控制系統",
            "ACC 主動車距維持巡航",
        ],
        外觀配備: ["LED 頭燈", "17 吋鋁圈", "電動摺疊後視鏡"],
        內裝配備: ["皮質座椅", "雙區恆溫空調", "9 吋多媒體觸控螢幕"],
        動力規格: ["1798cc 直列四缸引擎", "最大馬力 140ps", "CVT 無段變速"],
        "科技/多媒體": ["Apple CarPlay / Android Auto", "倒車顯影", "數位儀表"],
    },
};

export default function Info() {
    const infoTab = Object.entries(carDetail.specs);
    const splitIndex = Math.ceil(infoTab.length / 2);
    const leftItems = infoTab.slice(0, splitIndex);
    const rightItems = infoTab.slice(splitIndex);

    return (
        <div className="max-w-[980px] mx-auto p-4">
            {/* 上方大圖 */}
            <Carousel images={carDetail.image} altPrefix={carDetail.name} />
            {/* 車名 */}
            <h1 className="text-2xl font-bold mb-6">{carDetail.name}</h1>
            {/* 分區規格 */}
            <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-4">
                    {leftItems.map(([section, items], index) => (
                        <CollapsibleTabs
                            key={section}
                            section={section}
                            items={items}
                            index={index}
                        />
                    ))}
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    {rightItems.map(([section, items], index) => (
                        <CollapsibleTabs
                            key={section}
                            section={section}
                            items={items}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

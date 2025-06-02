import React, { useState, useRef } from "react";

function CollapsePanel() {
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null as HTMLDivElement | null);

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: 6,
                overflow: "hidden",
                width: 360,
            }}>
            {/* 標題區塊 */}
            <div
                style={{
                    background: "#f5f5f5",
                    padding: "16px 20px",
                    cursor: "pointer",
                    userSelect: "none",
                    fontWeight: 600,
                }}
                onClick={() => setOpen((v) => !v)}>
                常見問題
            </div>
            {/* 內容區塊，動畫效果 */}
            <div
                ref={contentRef}
                style={{
                    maxHeight: open ? 50 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    background: "#fff",
                }}>
                <div style={{ padding: open ? "16px 20px" : "0 20px" }}>
                    這裡是展開後的內容，可以放任何 React 元素
                </div>
            </div>
        </div>
    );
}

export default CollapsePanel;

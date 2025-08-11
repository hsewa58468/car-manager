import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
export default function Chat() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<
        { role: string; text: string; timeStamp: string }[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto"; // 先重置高度
            // 計算 scrollHeight，限制最大高度為5行（約 5*行高）
            const lineHeight = 24; // 可依 Tailwind p-2 對應高度微調
            const maxHeight = lineHeight * 5;

            const newHeight = Math.min(textarea.scrollHeight, maxHeight);
            textarea.style.height = newHeight + "px";
        }
    }, [input]);

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // 防止換行
            if (input.trim()) {
                sendMessage();
            }
        }
        // 如果是 Shift + Enter，默認行為為換行，不用特別處理
    }

    async function sendMessage() {
        if (!input.trim()) return;
        const newMsgs = [
            ...messages,
            { role: "user", text: input, timeStamp: new Date().toISOString() },
        ];
        setMessages(newMsgs);
        setIsLoading(true);
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input, history: newMsgs }),
        });
        const json = await res.json();
        setMessages([
            ...newMsgs,
            {
                role: "model",
                text: json.message,
                timeStamp: new Date().toISOString(),
            },
        ]);
        setInput("");
        setIsLoading(false);
    }
    return (
        <div className="flex flex-col h-[80vh] max-w-xl mx-auto my-8 rounded-md shadow bg-white custom-scrollbar">
            <div className="flex-1 overflow-auto p-4 space-y-2">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={
                            msg.role === "user" ? "text-right" : "text-left"
                        }>
                        <div
                            className={
                                msg.role === "user"
                                    ? "bg-blue-100 text-blue-900 inline-block px-3 py-2 rounded-lg"
                                    : "bg-gray-100 text-gray-800 inline-block px-3 py-2 rounded-lg"
                            }>
                            <ReactMarkdown components={markdownComponents}>
                                {msg.text}
                            </ReactMarkdown>
                            <div className="text-xs text-gray-400 mt-1 text-right select-none">
                                {msg.timeStamp ? formatTime(msg.timeStamp) : ""}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div>
                        <span className="animate-spin-reverse">⏳</span>{" "}
                        回覆傳送中...
                    </div>
                )}
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                }}
                className="relative flex m-2 px-4 pt-4 pb-12 bg-[#403e3f80] rounded-lg shadow-md border border-gray-300">
                <textarea
                    ref={textareaRef}
                    className="flex-1 p-2 rounded resize-none overflow-y-auto text-white focus:outline-none "
                    placeholder="請描述你的購車需求..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={1}
                    style={{
                        maxHeight: "120px",
                        minHeight: "48px",
                    }}
                    onKeyDown={handleKeyDown}
                />
                <button
                    type="submit"
                    className="absolute bottom-2 right-2 h-12 w-16 bg-[#3d3d3b] text-white rounded-lg disabled:opacity-50 cursor-pointer"
                    disabled={isLoading}>
                    送出
                </button>
            </form>
        </div>
    );
}

// 格式化時間戳記為 HH:MM
function formatTime(ts: number | string) {
    const d = typeof ts === "string" ? new Date(ts) : new Date(Number(ts));
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // 例：14:05
}

// Markdown 元件樣式(gpt 回覆會用到的為主)
const markdownComponents = {
    h1: ({ ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
    h2: ({ ...props }) => (
        <h2 className="text-2xl font-semibold mb-3" {...props} />
    ),
    h3: ({ ...props }) => (
        <h3 className="text-xl font-semibold mb-2" {...props} />
    ),
    p: ({ ...props }) => <p className="mb-2" {...props} />,
    ul: ({ ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
    ol: ({ ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
    li: ({ ...props }) => <li className="mb-1" {...props} />,
    a: ({ ...props }) => (
        <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
            {...props}
        />
    ),
    strong: ({ ...props }) => <strong className="font-bold" {...props} />,
    em: ({ ...props }) => <em className="italic" {...props} />,
    blockquote: ({ ...props }) => (
        <blockquote
            className="border-l-4 border-gray-300 pl-4 italic my-2"
            {...props}
        />
    ),
};

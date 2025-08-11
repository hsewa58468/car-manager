// 使用新版 @google/genai
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
    try {
        const { message, history, timestamp } = await req.json();

        const ai = new GoogleGenAI({
            apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
        });

        interface HistoryMessage {
            role: string; // "user" 或 "model"
            text: string;
            timestamp: string;
        }
        const formattedHistory = (history || []).map((msg: HistoryMessage) => ({
            role: msg.role, // "user" 或 "model"
            parts: [{ text: msg.text }],
            timestamp: msg.timestamp,
        }));

        const systemPrompt =
            "你是一個Mazda的專業車輛顧問，根據顧客需求推薦最適合的車款並詳細說明車輛、車款、型號、價錢、特點、油耗。任何與車輛、車款、型號、價錢、特點、油耗、維護保養等無關的問題，請直接告知：『很抱歉，我僅能回答汽車相關問題。』，不要嘗試回覆或討論其他主題。請用繁體中文回答。";
        const preMessage = { role: "user", parts: [{ text: systemPrompt }] };

        const userMsg = {
            role: "user",
            parts: [{ text: message }],
            timestamp: timestamp,
        };

        const contents = [preMessage, ...formattedHistory, userMsg];

        const res = await ai.models.generateContent({
            model: "gemini-2.0-flash-001",
            contents,
        });

        const text =
            res.candidates?.[0]?.content?.parts
                ?.map((part) => part.text)
                .join("") || "（GPT 沒有產生回應）";

        return new Response(JSON.stringify({ message: text }), { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return new Response(JSON.stringify({ message: "伺服器錯誤" }), {
            status: 500,
        });
    }
}

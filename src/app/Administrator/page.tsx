"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

type callRegister = {
    email: string;
    password: string;
    role: string;
};

export default function Administrator() {
    const router = useRouter();
    const [mode, setMode] = useState<"login" | "register">("register");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    function handleToggle(newMode: "login" | "register") {
        if (!!localStorage.getItem("accessToken") && newMode === "login") {
            console.log("已登入");
            return;
        }
        setMode(newMode);
    }

    async function register({ email, password, role }: callRegister) {
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, role }),
        });
        const data = await res.json();
        if (res.ok) {
            // 註冊成功，data.user 為新用戶資訊
            return data.user;
        } else {
            // 處理錯誤訊息
            throw new Error(data.error || "註冊失敗");
        }
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            if (!!localStorage.getItem("accessToken")) {
                console.log("已登入");
                return;
            }
            if (mode === "login") {
                const user = await login({ email, password });
                console.log("登入成功", user);
                router.push("/editor");
            } else if (mode === "register") {
                const user = await register({ email, password, role });
                console.log("註冊成功", user);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // 登入
    async function login({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
            // 登入成功，取得 accessToken、refreshToken
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            return true;
        } else {
            throw new Error(data.error || "登入失敗");
        }
    }

    // 登出

    return (
        <div className="max-w-[980px] mx-auto p-4">
            <div className="relative w-48 h-12 mx-auto my-8 bg-gray-200 rounded-full flex items-center shadow-md">
                <span
                    className={`absolute top-1 w-1/2 h-10 rounded-full bg-white shadow transition-transform duration-500 ${
                        mode === "register"
                            ? "translate-x-[4%]"
                            : "translate-x-[96%]"
                    }
                    `}
                />
                <button
                    className={`flex-1 z-10 py-2 rounded-full font-semibold transition-colors duration-200 ${
                        mode === "register"
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                    }`}
                    onClick={() => handleToggle("register")}>
                    註冊
                </button>
                <button
                    className={`flex-1 z-10 py-2 rounded-full font-semibold transition-colors duration-200 ${
                        mode === "login"
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                    }`}
                    onClick={() => handleToggle("login")}>
                    登入
                </button>
            </div>
            <form
                id="regform"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4">
                <input
                    className="border border-gray-300 rounded p-2 m-4"
                    type="text"
                    name="login_name"
                    required
                    pattern="^[a-zA-Z0-9._-]{5,}$"
                    maxLength={16}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="請輸入帳號"
                />
                <input
                    className="border border-gray-300 rounded p-2 m-4"
                    type="password"
                    name="login_pass1"
                    required
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="至少8位，含大小寫與數字"
                />
                <input
                    className="border border-gray-300 rounded p-2 m-4"
                    type="text"
                    name="realname"
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="USER | ADMIN | EDITOR"
                    pattern="^(USER|ADMIN|EDITOR)$"
                />
                <button type="submit">
                    {mode === "login" ? "登入" : "註冊"}
                </button>
            </form>
        </div>
    );
}

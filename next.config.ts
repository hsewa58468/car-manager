import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,POST,PUT,DELETE",
                    },
                ],
            },
        ];
    },
    images: {
        deviceSizes: [360, 640, 1080], // 只生成這三個寬度
        imageSizes: [16, 32, 48], // 小圖標專用尺寸
        remotePatterns: [
            {
                protocol: "https",
                hostname: "hotaicdn.azureedge.net",
                pathname: "/toyotaweb/**",
            },
            {
                protocol: "https",
                hostname: "static.liontech.com.tw",
                pathname: "/ConsoleAPData/**",
            },
        ],
    },
};

export default nextConfig;

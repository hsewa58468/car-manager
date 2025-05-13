import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

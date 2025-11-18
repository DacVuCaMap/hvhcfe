import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Phần này Turbopack mới đọc được
  turbo: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  // Phần images Turbopack ĐÃ hỗ trợ từ Next 15.1+, giữ nguyên
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Bỏ phần webpack cũ đi vì Turbopack không đọc
  // webpack(config) { ... } ← xóa mẹ nó đi
};

export default nextConfig;
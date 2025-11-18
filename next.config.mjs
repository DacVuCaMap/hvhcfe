/** @type {import('next').NextConfig} */
const nextConfig = {
  // THÊM CÁI NÀY – cho phép mọi domain (dev với ngrok thì để **)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  // Giữ nguyên phần SVG
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
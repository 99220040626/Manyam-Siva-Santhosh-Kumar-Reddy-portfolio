import type { NextConfig } from "next";
const config: NextConfig = { reactStrictMode: true, transpilePackages: ["three"], images: { formats: ["image/avif", "image/webp"] } };
export default config;

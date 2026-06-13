import type { NextConfig } from "next";

const isProd = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/ailter-app" : "",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;

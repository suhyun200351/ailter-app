import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ailter",
    short_name: "Ailter",
    description: "청소년을 위한 AI 콘텐츠 신뢰 판단 서비스",
    start_url: `${BP}/`,
    display: "standalone",
    background_color: "#F9FAFB",
    theme_color: "#FF3C38",
    orientation: "portrait",
    icons: [
      { src: `${BP}/assets/app-icon.png`, sizes: "192x192", type: "image/png" },
      { src: `${BP}/assets/app-icon.png`, sizes: "512x512", type: "image/png" },
    ],
  };
}

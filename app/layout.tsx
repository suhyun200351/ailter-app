import type { Metadata, Viewport } from "next";
import "./globals.css";

const base = process.env.GITHUB_ACTIONS === "true" ? "/ailter-app" : "";
const fontWeights = [
  [100, "Thin"], [200, "ExtraLight"], [300, "Light"], [400, "Regular"],
  [500, "Medium"], [600, "SemiBold"], [700, "Bold"], [800, "ExtraBold"], [900, "Black"],
] as const;
const fontCSS = fontWeights
  .map(([w, n]) => `@font-face{font-family:"Pretendard";font-weight:${w};font-display:swap;src:url("${base}/fonts/Pretendard-${n}.woff")format("woff");}`)
  .join("");

export const metadata: Metadata = {
  title: "Ailter",
  description: "청소년을 위한 AI 콘텐츠 신뢰 판단 서비스",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ailter",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FF3C38",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <style dangerouslySetInnerHTML={{ __html: fontCSS }} />
      </head>
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}

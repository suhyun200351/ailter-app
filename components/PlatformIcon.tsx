import Image from "next/image";
import type { Platform } from "@/lib/mock/records";

const platformMap: Record<Platform, { src: string; alt: string }> = {
  Instagram: { src: "/assets/logo-instagram.png", alt: "Instagram" },
  TikTok:    { src: "/assets/logo-tiktok.png",    alt: "TikTok" },
  YouTube:   { src: "/assets/logo-youtube.png",   alt: "YouTube" },
};

export function PlatformIcon({ platform, size = 24 }: { platform: Platform; size?: number }) {
  const p = platformMap[platform];
  return (
    <Image src={p.src} alt={p.alt} width={size} height={size} className="rounded-md object-contain" />
  );
}

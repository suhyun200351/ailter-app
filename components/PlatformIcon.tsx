import type { Platform } from "@/lib/mock/records";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const platformMap: Record<Platform, { src: string; alt: string }> = {
  Instagram: { src: "/assets/logo-instagram.png", alt: "Instagram" },
  TikTok:    { src: "/assets/logo-tiktok.png",    alt: "TikTok" },
  YouTube:   { src: "/assets/logo-youtube.png",   alt: "YouTube" },
};

export function PlatformIcon({ platform, size = 24 }: { platform: Platform; size?: number }) {
  const p = platformMap[platform];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${BP}${p.src}`} alt={p.alt} width={size} height={size} className="rounded-md object-contain" />
  );
}

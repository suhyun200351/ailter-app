"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function SplashPage() {
  const router = useRouter();
  const isOnboarded = useStore((s) => s.isOnboarded);

  useEffect(() => {
    if (isOnboarded) router.replace("/home");
  }, [isOnboarded, router]);

  const go = () => router.push("/age");

  return (
    <div className="mobile-shell flex flex-col min-h-svh bg-white">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
        <div className="w-44 h-44 mb-6 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BP}/assets/mascot-greet.png`}
            alt="Ailter 마스코트"
            width={176}
            height={176}
            className="object-contain"
          />
        </div>

        <h1 className="text-[38px] font-black text-[#1E1E1E] mb-2">Ailter</h1>
        <p className="text-[15px] text-[#6F717C] text-center leading-relaxed">
          청소년을 위한<br />AI 콘텐츠 신뢰 판단 서비스
        </p>

        <div className="flex items-center gap-2 mt-6 flex-wrap justify-center">
          {["분석 완료", "위험 감지", "학습 가이드"].map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 bg-[#F9FAFB] border border-[#E9EBEF] rounded-full text-[12px] font-medium text-[#6F717C]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Social buttons */}
      <div
        className="px-6 flex flex-col gap-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 32px)" }}
      >
        <button
          onClick={go}
          className="w-full h-[52px] bg-[#FEE500] rounded-2xl flex items-center justify-center gap-2.5 text-[15px] font-semibold text-[#1E1E1E] active:scale-[.98] transition-transform"
        >
          <KakaoIcon />
          카카오로 시작하기
        </button>
        <button
          onClick={go}
          className="w-full h-[52px] bg-white border border-[#E9EBEF] rounded-2xl flex items-center justify-center gap-2.5 text-[15px] font-semibold text-[#1E1E1E] active:scale-[.98] transition-transform"
        >
          <GoogleIcon />
          구글로 시작하기
        </button>
        <button
          onClick={go}
          className="w-full h-[52px] bg-[#1E1E1E] rounded-2xl flex items-center justify-center gap-2.5 text-[15px] font-semibold text-white active:scale-[.98] transition-transform"
        >
          <AppleIcon />
          애플로 시작하기
        </button>
      </div>
    </div>
  );
}

function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M12 3C6.9 3 2.8 6.2 2.8 10.2c0 2.6 1.7 4.8 4.3 6.1-.2.7-.7 2.4-.8 2.8-.1.5.2.5.4.4.2-.1 2.5-1.7 3.5-2.4.6.1 1.2.1 1.8.1 5.1 0 9.2-3.2 9.2-7.2S17.1 3 12 3Z" fill="#1E1E1E" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 4.5 29.5 2.5 24 2.5 12.1 2.5 2.5 12.1 2.5 24S12.1 45.5 24 45.5 45.5 35.9 45.5 24c0-1.2-.1-2.3-.3-3.5z" />
      <path fill="#FF3D00" d="m4.3 13.7 6.6 4.8C12.7 14.1 17.9 11 24 11c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 4.5 29.5 2.5 24 2.5 16.3 2.5 9.6 6.9 6.3 13.3z" />
      <path fill="#4CAF50" d="M24 45.5c5.4 0 10.3-2 13.9-5.3l-6.4-5.4c-2 1.5-4.6 2.4-7.5 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 41 16.2 45.5 24 45.5z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.4 5.4C39.9 36.9 45.5 31 45.5 24c0-1.2-.1-2.3-.3-3.5z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 384 512" fill="white">
      <path d="M318.7 268c-.5-58 47.4-85.8 49.5-87.2-27-39.5-69-45-83.9-45.6-35.7-3.6-69.7 21-87.8 21-18 0-46-20.5-75.6-20-38.9.6-74.8 22.6-94.8 57.5-40.4 70.1-10.3 173.8 29 230.7 19.2 27.8 42.1 59 72.1 57.9 28.9-1.2 39.9-18.7 74.9-18.7s44.8 18.7 75.4 18.1c31.2-.5 50.9-28.3 70-56.3 22.1-32.1 31.2-63.2 31.7-64.8-.7-.3-60.8-23.3-61.3-92.5zM260.9 96.5c15.9-19.3 26.7-46.1 23.7-72.9-22.9.9-50.7 15.3-67.2 34.5-14.8 17-27.8 44.3-24.3 70.5 25.6 2 51.8-13 67.8-32.1z" />
    </svg>
  );
}

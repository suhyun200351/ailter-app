"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const learningCards = [
  {
    id: "image",
    title: "AI 이미지 특징",
    desc: "어색한 손가락, 배경 왜곡 찾기",
    image: "/assets/learn-image.png",
    href: "/trust",
  },
  {
    id: "deepfake",
    title: "딥페이크 영상 구별",
    desc: "입 모양과 음성의 싱크를 확인하는 법",
    image: "/assets/learn-deepfake.png",
    href: "/trust",
  },
];

const caseStudies = [
  {
    id: "tiktok",
    title: "틱톡 딥페이크 챌린지",
    image: "/assets/reels-tiktok.png",
    href: "/trust",
  },
  {
    id: "instagram",
    title: "인스타그램 허위 광고",
    image: "/assets/reels-instagram.png",
    href: "/trust",
  },
  {
    id: "youtube",
    title: "쇼츠 정보",
    image: "/assets/reels-youtube.png",
    href: "/trust",
  },
];

export default function GuidePage() {
  const { aiActive, toggleAI } = useStore();

  return (
    <div className="flex flex-col">
      {/* AppBar */}
      <div
        className="flex items-center gap-2 px-5 bg-white border-b border-[#F0F1F4] sticky top-0 z-10"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)", paddingBottom: "12px" }}
      >
        <span className="text-[20px] font-black text-[#FF3C38] flex-1">Ailter</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[12px] font-medium text-[#6F717C]">AI감지</span>
          <button
            onClick={toggleAI}
            className="relative w-10 h-5 rounded-full transition-colors"
            style={{ background: aiActive ? "#FF3C38" : "#C5C6CD" }}
          >
            <span
              className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all"
              style={{ left: aiActive ? "calc(100% - 18px)" : "2px" }}
            />
          </button>
        </div>
        <button className="w-9 h-9 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
              stroke="#1E1E1E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke="#1E1E1E" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        <button className="w-9 h-9 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="#1E1E1E" strokeWidth="1.8" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
              stroke="#1E1E1E" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="px-4 py-4 flex flex-col gap-5">
        {/* 실전 테스트 카드 */}
        <div
          className="rounded-3xl px-5 py-5 flex items-center gap-4"
          style={{ background: "#FFF5F4", border: "1.5px solid #FFD4D3" }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-[#FF3C38] mb-1">실전 테스트</p>
            <p className="text-[20px] font-black text-[#1E1E1E] leading-tight mb-1">
              AI 콘텐츠 테스트
            </p>
            <p className="text-[13px] text-[#6F717C]">퀴즈를 통해 실력을 확인하세요!</p>
          </div>
          <Link href="/trust">
            <button className="px-5 py-3 bg-[#FF3C38] rounded-2xl text-[14px] font-bold text-white flex-shrink-0 active:scale-[.97] transition-transform">
              시작하기
            </button>
          </Link>
        </div>

        {/* 오늘의 학습 카드 섹션 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[16px] font-bold text-[#1E1E1E]">오늘의 학습 카드</p>
            <button className="text-[13px] text-[#999BA5]">전체보기</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {learningCards.map((card) => (
              <Link key={card.id} href={card.href}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-[0_0_20px_0_rgba(0,0,0,0.04)] active:scale-[.98] transition-transform">
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${BP}${card.image}`}
                      alt={card.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="px-3 py-3">
                    <p className="text-[14px] font-bold text-[#1E1E1E] leading-tight mb-1">{card.title}</p>
                    <p className="text-[12px] text-[#6F717C] leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 콘텐츠 사례 학습 섹션 */}
        <div>
          <p className="text-[16px] font-bold text-[#1E1E1E] mb-3">콘텐츠 사례 학습</p>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {caseStudies.map((item) => (
              <Link key={item.id} href={item.href} className="flex-shrink-0">
                <div className="w-[140px] active:scale-[.98] transition-transform">
                  <div className="relative w-[140px] h-[140px] rounded-2xl overflow-hidden mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${BP}${item.image}`}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-[13px] font-semibold text-[#1E1E1E] leading-snug px-0.5">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

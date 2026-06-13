"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { records } from "@/lib/mock/records";
import { weeklyStats } from "@/lib/mock/analysis";
import { trustLevelConfig } from "@/lib/mock/trustLevels";

const platformThumb: Record<string, string> = {
  Instagram: "/assets/reels-instagram.png",
  TikTok:    "/assets/reels-tiktok.png",
  YouTube:   "/assets/reels-youtube.png",
};

const platformLogo: Record<string, string> = {
  Instagram: "/assets/logo-instagram.png",
  TikTok:    "/assets/logo-tiktok.png",
  YouTube:   "/assets/logo-youtube.png",
};

function DotBadge({ level }: { level: 1 | 2 | 3 }) {
  const cfg = trustLevelConfig[level];
  return (
    <span
      className="flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
      style={{ color: cfg.color, background: cfg.bg }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  );
}

export default function RecordsPage() {
  const { aiActive, toggleAI } = useStore();
  const [showAll, setShowAll] = useState(false);

  const dangerCount = records.filter((r) => r.isDangerous).length;
  const displayRecords = showAll ? records : records.slice(0, 3);

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

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Hero stats card */}
        <div
          className="rounded-3xl px-5 py-5 flex items-center gap-4"
          style={{ background: aiActive ? "#FFF5F4" : "#F9FAFB" }}
        >
          <div className="flex-1">
            <h2 className="text-[20px] font-black text-[#1E1E1E] leading-tight mb-4">
              안전하게 콘텐츠를<br />분석 중이에요
            </h2>
            <div className="flex gap-5">
              <div>
                <p className="text-[11px] text-[#6F717C] mb-0.5">오늘 분석 콘텐츠</p>
                <p className="text-[20px] font-black text-[#009EFF] leading-none">
                  {weeklyStats.total}<span className="text-[13px] font-semibold ml-0.5">건</span>
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#6F717C] mb-0.5">위험 콘텐츠</p>
                <p className="text-[20px] font-black text-[#FF3C38] leading-none">
                  {dangerCount}<span className="text-[13px] font-semibold ml-0.5">건</span>
                </p>
              </div>
            </div>
          </div>
          <Image
            src="/assets/mascot-greet.png"
            alt="마스코트"
            width={80}
            height={80}
            className="object-contain flex-shrink-0"
          />
        </div>

        {/* Share warning card */}
        <div className="bg-white border border-[#F0F1F4] rounded-2xl px-5 py-4 flex items-center gap-3 shadow-[0_0_20px_0_rgba(0,0,0,0.04)]">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ border: "2px solid #FF3C38" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4M12 17h.01" stroke="#FF3C38" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-[#1E1E1E]">공유 전 경고 받은 콘텐츠</p>
            <p className="text-[12px] text-[#6F717C] mt-0.5">{dangerCount}건의 콘텐츠가 경고를 받았어요</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="m9 6 6 6-6 6" stroke="#C5C6CD" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Records section */}
        <div>
          <p className="text-[16px] font-bold text-[#1E1E1E] mb-3">분석 기록</p>

          <div className="bg-white rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.04)] overflow-hidden">
            {displayRecords.map((record, idx) => (
              <Link key={record.id} href={`/records/${record.id}`}>
                <div
                  className="active:bg-[#F9FAFB] transition-colors"
                  style={idx > 0 ? { borderTop: "1px solid #F0F1F4" } : {}}
                >
                  {/* Platform row */}
                  <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                    <Image
                      src={platformLogo[record.platform] ?? platformLogo["Instagram"]}
                      alt={record.platform}
                      width={32}
                      height={32}
                      className="rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-[#1E1E1E]">{record.platform}</p>
                      <p className="text-[12px] text-[#999BA5]">{record.time}</p>
                    </div>
                    <DotBadge level={record.trustLevel} />
                  </div>

                  {/* Thumbnail + description row */}
                  <div className="flex gap-3 px-4 pb-4">
                    <Image
                      src={platformThumb[record.platform] ?? platformThumb["Instagram"]}
                      alt={record.title}
                      width={72}
                      height={72}
                      className="rounded-xl object-cover flex-shrink-0"
                      style={{ width: 72, height: 72 }}
                    />
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-[14px] font-semibold text-[#1E1E1E] mb-1 truncate">{record.title}</p>
                      <p className="text-[12px] text-[#6F717C] leading-relaxed line-clamp-2">
                        {record.reasons[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 더보기 button */}
          {!showAll && records.length > 3 && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full mt-3 py-[14px] bg-[#F0F1F4] rounded-2xl text-[14px] font-semibold text-[#6F717C] flex items-center justify-center gap-1.5 active:bg-[#E9EBEF] transition-colors"
            >
              더보기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="m6 9 6 6 6-6" stroke="#6F717C" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

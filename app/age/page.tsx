"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore, type AgeGroup } from "@/lib/store";

const options: { id: AgeGroup; label: string; sub: string }[] = [
  { id: "under13", label: "13세 이하",  sub: "초등학생 (최고 수준 보호)" },
  { id: "14-16",   label: "14~16세",    sub: "중학생 (보호 기능 안내)" },
  { id: "17-19",   label: "17~19세",    sub: "고등학생 (경고·가이드 조정)" },
  { id: "adult",   label: "20세 이상",  sub: "성인 (일반 사용자 기준)" },
];

export default function AgePage() {
  const router = useRouter();
  const setAge = useStore((s) => s.setAge);
  const [selected, setSelected] = useState<AgeGroup>(null);

  const next = () => {
    if (!selected) return;
    setAge(selected);
    if (selected === "adult") {
      router.push("/permission");
    } else {
      router.push("/protect");
    }
  };

  return (
    <div className="mobile-shell flex flex-col min-h-svh bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-[calc(env(safe-area-inset-top)+16px)] pb-4">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F9FAFB] active:bg-[#F0F1F4]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="m15 6-6 6 6 6" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1 h-1.5 bg-[#F0F1F4] rounded-full">
          <div className="h-full w-1/3 bg-[#FF3C38] rounded-full" />
        </div>
        <span className="text-[12px] text-[#999BA5] font-medium">1 / 3</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-6">
        <h2 className="text-[22px] font-bold text-[#1E1E1E] leading-snug mb-1">
          연령대를 선택해주세요
        </h2>
        <p className="text-[14px] text-[#6F717C] mb-8 leading-relaxed">
          연령대에 따라 보호 기능과 추천 콘텐츠 기준이 달라져요
        </p>

        <div className="flex flex-col gap-3">
          {options.map((opt) => {
            const active = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className="w-full px-5 py-4 rounded-2xl border-2 text-left transition-all active:scale-[.98]"
                style={{
                  borderColor: active ? "#FF3C38" : "#E9EBEF",
                  background: active ? "#FFF5F5" : "#FAFAFA",
                }}
              >
                <p className="text-[16px] font-semibold" style={{ color: active ? "#FF3C38" : "#1E1E1E" }}>
                  {opt.label}
                </p>
                <p className="text-[13px] mt-0.5" style={{ color: active ? "#FF6360" : "#6F717C" }}>
                  {opt.sub}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div
        className="px-6 pb-8"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)" }}
      >
        <button
          onClick={next}
          disabled={!selected}
          className="w-full h-[52px] rounded-2xl text-[15px] font-semibold transition-all"
          style={{
            background: selected ? "#FF3C38" : "#E9EBEF",
            color: selected ? "#fff" : "#999BA5",
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}

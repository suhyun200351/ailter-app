"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

const perms = [
  {
    id: "notify",
    required: true,
    label: "알림 권한",
    desc: "위험 콘텐츠 감지 시 즉시 알림을 받아요",
  },
  {
    id: "screen",
    required: true,
    label: "SNS 화면 감지 권한",
    desc: "SNS 이용 중 콘텐츠 실시간 분석에 필요해요",
  },
  {
    id: "storage",
    required: false,
    label: "저장 권한",
    desc: "분석 기록과 위험 콘텐츠 이력을 저장해요",
  },
];

export default function PermissionPage() {
  const router = useRouter();
  const setOnboarded = useStore((s) => s.setOnboarded);
  const [checked, setChecked] = useState<Record<string, boolean>>({
    notify: false,
    screen: false,
    storage: false,
  });

  const allChecked = perms.every((p) => checked[p.id]);
  const requiredChecked = perms.filter((p) => p.required).every((p) => checked[p.id]);

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleAll = () => {
    const next = !allChecked;
    setChecked({ notify: next, screen: next, storage: next });
  };

  const finish = () => {
    setOnboarded(true);
    router.replace("/home");
  };

  return (
    <div className="mobile-shell flex flex-col min-h-svh bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-[calc(env(safe-area-inset-top)+16px)] pb-4">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F9FAFB]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="m15 6-6 6 6 6" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1 h-1.5 bg-[#F0F1F4] rounded-full">
          <div className="h-full w-full bg-[#FF3C38] rounded-full" />
        </div>
        <span className="text-[12px] text-[#999BA5] font-medium">3 / 3</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-4">
        <h2 className="text-[22px] font-bold text-[#1E1E1E] leading-snug mb-1">
          서비스 이용을 위해<br />아래 권한이 필요해요
        </h2>
        <p className="text-[14px] text-[#6F717C] mb-8 leading-relaxed">
          필수 권한 거부 시 일부 서비스 이용이 제한돼요
        </p>

        {/* All agree */}
        <button
          onClick={toggleAll}
          className="w-full flex items-center gap-3 px-4 py-4 bg-[#F9FAFB] rounded-2xl mb-3"
        >
          <CheckCircle checked={allChecked} />
          <span className="text-[15px] font-semibold text-[#1E1E1E]">약관 전체 동의</span>
        </button>

        <div className="h-px bg-[#F0F1F4] mb-3" />

        {/* Individual perms */}
        <div className="flex flex-col gap-2">
          {perms.map((p) => (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl"
              style={{ background: checked[p.id] ? "#FFF5F5" : "#FAFAFA" }}
            >
              <CheckCircle checked={checked[p.id]} />
              <div className="flex-1 text-left">
                <p className="text-[14px] font-semibold text-[#1E1E1E] flex items-center gap-2">
                  {p.label}
                  {p.required && (
                    <span className="text-[11px] font-medium text-[#FF3C38] bg-[#FFE1E0] px-1.5 py-0.5 rounded-full">
                      필수
                    </span>
                  )}
                </p>
                <p className="text-[12px] text-[#6F717C] mt-0.5">{p.desc}</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="m9 6 6 6-6 6" stroke="#C5C6CD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="px-6 flex flex-col gap-2 mt-6"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)" }}
      >
        <button
          onClick={finish}
          disabled={!requiredChecked}
          className="w-full h-[52px] rounded-2xl text-[15px] font-semibold transition-all active:scale-[.98]"
          style={{
            background: requiredChecked ? "#FF3C38" : "#E9EBEF",
            color: requiredChecked ? "#fff" : "#999BA5",
          }}
        >
          권한 허용하기
        </button>
        <button
          onClick={finish}
          className="w-full h-[44px] text-[14px] text-[#999BA5] font-medium"
        >
          다음에 하기
        </button>
      </div>
    </div>
  );
}

function CheckCircle({ checked }: { checked: boolean }) {
  return (
    <div
      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
      style={{ background: checked ? "#FF3C38" : "#E9EBEF" }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path d="m5 12 4.5 4.5L19 7" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

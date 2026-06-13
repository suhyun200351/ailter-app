"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

const ageLabel: Record<string, string> = {
  under13: "13세 이하",
  "14-16": "14~16세",
  "17-19": "17~19세",
  adult: "20세 이상",
};

export default function SettingsPage() {
  const router = useRouter();
  const {
    age,
    aiActive, toggleAI,
    notificationsOn, toggleNotifications,
    showBadge, toggleBadge,
    setOnboarded,
  } = useStore();

  const logout = () => {
    setOnboarded(false);
    router.replace("/");
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div
        className="bg-white border-b border-[#F0F1F4]"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)", paddingBottom: "16px" }}
      >
        <h1 className="text-[20px] font-bold text-[#1E1E1E] px-5">설정</h1>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        {/* Profile card */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_0_20px_0_rgba(0,0,0,0.04)] flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#FFE1E0] flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.6" stroke="#FF3C38" strokeWidth="1.8" />
              <path d="M4.8 19.5a7.2 7.2 0 0 1 14.4 0" stroke="#FF3C38" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[16px] font-semibold text-[#1E1E1E]">Ailter 사용자</p>
            <p className="text-[13px] text-[#6F717C]">{ageLabel[age ?? "adult"]} 계정</p>
          </div>
          <span className="text-[12px] font-medium text-[#FF3C38] bg-[#FFE1E0] px-2.5 py-1 rounded-full">
            {ageLabel[age ?? "adult"]}
          </span>
        </div>

        {/* AI & Analysis */}
        <SectionHeader title="분석 설정" />
        <div className="bg-white rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.04)] divide-y divide-[#F0F1F4]">
          <ToggleRow
            label="AI 콘텐츠 감지"
            desc="SNS 이용 중 실시간 분석"
            checked={aiActive}
            onToggle={toggleAI}
          />
          <ToggleRow
            label="위험 알림"
            desc="위험 콘텐츠 감지 시 알림 표시"
            checked={notificationsOn}
            onToggle={toggleNotifications}
          />
          <ToggleRow
            label="AI 라벨 표시"
            desc="AI 의심 콘텐츠에 배지 표시"
            checked={showBadge}
            onToggle={toggleBadge}
          />
        </div>

        {/* Notifications */}
        <SectionHeader title="알림 설정" />
        <div className="bg-white rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.04)] divide-y divide-[#F0F1F4]">
          <NavRow label="위험 콘텐츠 알림" value="켜짐" />
          <NavRow label="공유 전 경고 알림" value="켜짐" />
          <NavRow label="분석 완료 알림" value="꺼짐" />
        </div>

        {/* Account */}
        <SectionHeader title="계정 설정" />
        <div className="bg-white rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.04)] divide-y divide-[#F0F1F4]">
          <NavRow label="개인정보 관리" />
          <NavRow label="연령대 변경" value={ageLabel[age ?? "adult"]} onPress={() => router.push("/age")} />
          <NavRow label="이용약관" />
          <NavRow label="개인정보 처리방침" />
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.04)] divide-y divide-[#F0F1F4]">
          <button
            onClick={logout}
            className="w-full flex items-center px-5 py-4"
          >
            <span className="text-[14px] font-medium text-[#FF3C38] flex-1 text-left">로그아웃</span>
          </button>
          <button className="w-full flex items-center px-5 py-4">
            <span className="text-[14px] font-medium text-[#FF3C38] flex-1 text-left">회원 탈퇴</span>
          </button>
        </div>

        {/* App info */}
        <p className="text-center text-[12px] text-[#C5C6CD] py-2">Ailter v1.0.0 · 2026</p>
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <p className="text-[12px] font-semibold text-[#999BA5] px-1">{title}</p>;
}

function ToggleRow({
  label, desc, checked, onToggle,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center px-5 py-4 gap-3">
      <div className="flex-1">
        <p className="text-[14px] font-medium text-[#1E1E1E]">{label}</p>
        <p className="text-[12px] text-[#999BA5] mt-0.5">{desc}</p>
      </div>
      <button
        onClick={onToggle}
        className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
        style={{ background: checked ? "#FF3C38" : "#C5C6CD" }}
      >
        <span
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all"
          style={{ left: checked ? "calc(100% - 20px)" : "4px" }}
        />
      </button>
    </div>
  );
}

function NavRow({
  label, value, onPress,
}: {
  label: string;
  value?: string;
  onPress?: () => void;
}) {
  return (
    <button
      onClick={onPress}
      className="w-full flex items-center px-5 py-4 gap-3"
    >
      <span className="text-[14px] font-medium text-[#1E1E1E] flex-1 text-left">{label}</span>
      {value && <span className="text-[13px] text-[#999BA5]">{value}</span>}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="m9 6 6 6-6 6" stroke="#C5C6CD" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

"use client";

import { useRouter, useParams } from "next/navigation";
import { records } from "@/lib/mock/records";
import { trustLevelConfig } from "@/lib/mock/trustLevels";
import { PlatformIcon } from "@/components/PlatformIcon";

function TrustGauge({ value, level, color }: { value: number; level: string; color: string }) {
  const r = 68, cx = 100, cy = 100;
  const v = Math.max(0.5, Math.min(value, 99.5));
  const angleDeg = 180 + (v / 100) * 180;
  const angleRad = angleDeg * (Math.PI / 180);
  const ex = cx + r * Math.cos(angleRad);
  const ey = cy + r * Math.sin(angleRad);
  return (
    <svg viewBox="0 24 200 104" className="w-full max-w-[200px] mx-auto">
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        stroke="#F0F1F4" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`}
        stroke={color} strokeWidth="14" fill="none" strokeLinecap="round" />
      <circle cx={ex.toFixed(2)} cy={ey.toFixed(2)} r="7" fill="white" stroke={color} strokeWidth="3" />
      <text x="100" y="92" textAnchor="middle" fontSize="12" fontWeight="600"
        fill={color} fontFamily="Pretendard, sans-serif">{level}</text>
      <text x="100" y="114" textAnchor="middle" fontSize="26" fontWeight="900"
        fill="#1E1E1E" fontFamily="Pretendard, sans-serif">{value}%</text>
    </svg>
  );
}

const labelStyle: Record<string, { color: string; bg: string }> = {
  "AI 생성":    { color: "#FF3C38", bg: "#FFE1E0" },
  "AI 의심":    { color: "#FF9900", bg: "#FFF0D6" },
  "일반 콘텐츠": { color: "#009EFF", bg: "#DCF0FF" },
};

export default function RecordDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const record = records.find((r) => r.id === id);

  if (!record) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-[14px] text-[#6F717C]">기록을 찾을 수 없어요</p>
      </div>
    );
  }

  const trustScore = 100 - record.aiProbability;
  const cfg = trustLevelConfig[record.trustLevel];
  const badge = labelStyle[record.label] ?? labelStyle["일반 콘텐츠"];

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 bg-white border-b border-[#F0F1F4] sticky top-0 z-10"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)", paddingBottom: "12px" }}
      >
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F9FAFB]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="m15 6-6 6 6 6" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-[17px] font-bold text-[#1E1E1E] flex-1">콘텐츠 신뢰도</h1>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Platform info row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <PlatformIcon platform={record.platform} size={30} />
            <div>
              <p className="text-[14px] font-semibold text-[#1E1E1E]">{record.platform}</p>
              <p className="text-[12px] text-[#999BA5]">{record.time}</p>
            </div>
          </div>
          <span
            className="text-[12px] font-semibold px-3 py-1 rounded-full"
            style={{ color: badge.color, background: badge.bg }}
          >
            {record.label}
          </span>
        </div>

        {/* Gauge card */}
        <div className="bg-white rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.04)] p-5">
          <p className="text-[15px] font-bold text-[#1E1E1E] mb-4">콘텐츠 신뢰 등급</p>
          <TrustGauge value={trustScore} level={cfg.label} color={cfg.color} />
          <div className="flex justify-center gap-5 mt-3">
            {([
              { label: "위험", color: "#FF3C38" },
              { label: "주의", color: "#FF9900" },
              { label: "안전", color: "#009EFF" },
            ] as const).map(({ label, color }) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                <span className="text-[11px] text-[#6F717C]">{label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Tip card */}
        <div className="bg-white border border-[#F0F1F4] rounded-2xl px-5 py-4 flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ border: "2px solid #FF3C38" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4M12 17h.01" stroke="#FF3C38" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-[13px] text-[#2B2D33] leading-relaxed">
            여러 매체에서 교차 검증을 하는 것이 가장 안전한 방법입니다.
          </p>
        </div>

        {/* Analysis reasons */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_0_20px_0_rgba(0,0,0,0.04)]">
          <p className="text-[14px] font-bold text-[#1E1E1E] mb-3">분석 근거</p>
          <div className="flex flex-col gap-2">
            {record.reasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#F9FAFB] rounded-xl px-4 py-3">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5"
                  style={{ background: cfg.color, color: "#fff" }}
                >
                  {i + 1}
                </span>
                <span className="text-[13px] text-[#2B2D33] leading-relaxed">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Danger warning */}
        {record.isDangerous && (
          <div className="bg-[#FFF5F5] border border-[#FFD8D7] rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FFE1E0] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v5M12 17h.01" stroke="#FF3C38" strokeWidth="2" strokeLinecap="round" />
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                  stroke="#FF3C38" strokeWidth="1.7" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#FF3C38] mb-1">위험 콘텐츠로 감지됨</p>
              <p className="text-[12px] text-[#6F717C] leading-relaxed">
                이 콘텐츠는 위험 가능성이 높습니다. 공유 전 반드시 확인하고, 잘못된 정보 확산을 막아주세요.
              </p>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 pb-4">
          <button className="flex-1 h-[48px] bg-white border border-[#E9EBEF] rounded-2xl text-[14px] font-semibold text-[#1E1E1E] active:scale-[.98] transition-transform">
            다시 분석하기
          </button>
          <button className="flex-1 h-[48px] bg-[#FF3C38] rounded-2xl text-[14px] font-semibold text-white active:scale-[.98] transition-transform">
            공유 전 확인
          </button>
        </div>
      </div>
    </div>
  );
}

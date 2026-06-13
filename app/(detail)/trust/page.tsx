"use client";

import { useRouter } from "next/navigation";

function TrustGauge({ value, level, color }: { value: number; level: string; color: string }) {
  const r = 68, cx = 100, cy = 100;
  const v = Math.max(0.5, Math.min(value, 99.5));
  const angleDeg = 180 + (v / 100) * 180;
  const angleRad = angleDeg * (Math.PI / 180);
  const ex = cx + r * Math.cos(angleRad);
  const ey = cy + r * Math.sin(angleRad);
  return (
    <svg viewBox="0 20 200 108" className="w-full max-w-[220px] mx-auto">
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        stroke="#F0F1F4" strokeWidth="16" fill="none" strokeLinecap="round"
      />
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`}
        stroke={color} strokeWidth="16" fill="none" strokeLinecap="round"
      />
      <circle cx={ex.toFixed(2)} cy={ey.toFixed(2)} r="8" fill="white" stroke={color} strokeWidth="3" />
      <text x="100" y="90" textAnchor="middle" fontSize="13" fontWeight="600"
        fill={color} fontFamily="Pretendard, sans-serif">{level}</text>
      <text x="100" y="116" textAnchor="middle" fontSize="30" fontWeight="900"
        fill="#1E1E1E" fontFamily="Pretendard, sans-serif">{value}%</text>
    </svg>
  );
}

const checkpoints = [
  {
    level: "안전",
    color: "#009EFF",
    bg: "#DCF0FF",
    items: [
      { title: "명확한 출처", desc: "공공기관이나 검증된 뉴스 매체의 정보" },
      { title: "논리적인 댓글 반응", desc: "실제 경험에 근거한 구체적인 피드백" },
      { title: "투명한 광고 표기", desc: "상업적 목적을 숨기지 않고 밝힘" },
    ],
  },
  {
    level: "주의",
    color: "#FF9900",
    bg: "#FFF0D6",
    items: [
      { title: "인위적인 AI 생성 흔적", desc: "지나치게 매끄럽거나 어색한 문장 구조" },
      { title: "모호한 광고/협찬", desc: "태그 뒤에 숨기거나 작게 적힌 협찬 문구" },
    ],
  },
  {
    level: "위험",
    color: "#FF3C38",
    bg: "#FFE1E0",
    items: [
      { title: "가짜 뉴스 및 딥페이크", desc: "조작된 이미지나 확인되지 않은 자극적 정보" },
      { title: "의도적인 정보 왜곡", desc: "특정 대상을 비방하거나 불법 광고 유도" },
    ],
  },
] as const;

export default function TrustDetailPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div
        className="flex items-center px-4 bg-white border-b border-[#F0F1F4] sticky top-0 z-10"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 12px)", paddingBottom: "12px" }}
      >
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="m15 6-6 6 6 6" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="flex-1 text-center text-[17px] font-semibold text-[#1E1E1E]" style={{ marginRight: "36px" }}>
          콘텐츠 신뢰도
        </h1>
      </div>

      <div className="px-4 py-5 flex flex-col gap-4">
        {/* 신뢰 등급 헤더 */}
        <div className="flex items-center justify-between">
          <p className="text-[18px] font-bold text-[#1E1E1E]">콘텐츠 신뢰 등급</p>
          <span
            className="text-[12px] font-semibold px-3 py-1.5 rounded-xl"
            style={{ color: "#FF3C38", background: "#FFE1E0" }}
          >
            AI 생성 의심
          </span>
        </div>

        {/* 게이지 카드 */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_0_20px_0_rgba(0,0,0,0.04)] border border-[#F0F1F4]">
          <TrustGauge value={42} level="주의" color="#FF9900" />
          <div className="flex items-center justify-center gap-0 mt-4">
            {(
              [
                { label: "위험", color: "#FF3C38" },
                { label: "주의", color: "#FF9900" },
                { label: "안전", color: "#009EFF" },
              ] as const
            ).map(({ label, color }, i) => (
              <div key={label} className="flex items-center">
                {i > 0 && <span className="w-px h-3 bg-[#E9EBEF] mx-4" />}
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-[12px] text-[#6F717C]">{label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 경고 안내 카드 */}
        <div className="bg-white border border-[#F0F1F4] rounded-2xl px-4 py-4 flex items-center gap-3 shadow-[0_0_20px_0_rgba(0,0,0,0.04)]">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ border: "2px solid #FF3C38" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4M12 17h.01" stroke="#FF3C38" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-[13px] text-[#2B2D33] leading-relaxed">
            여러 매체에서 교차 검증을 하는 것이<br />가장 안전한 방법입니다.
          </p>
        </div>

        {/* 단계별 체크포인트 */}
        <div>
          <p className="text-[16px] font-bold text-[#1E1E1E] mb-1">단계별 체크포인트</p>
          <p className="text-[13px] text-[#6F717C] mb-4 leading-relaxed">
            콘텐츠를 소비할 때 다음 기준을 하나씩 체크해보세요.
          </p>

          <div className="flex flex-col gap-3">
            {checkpoints.map((cp) => (
              <div
                key={cp.level}
                className="bg-white rounded-2xl px-5 py-4 shadow-[0_0_20px_0_rgba(0,0,0,0.04)]"
              >
                {/* Level badge */}
                <span
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-2.5 py-1 rounded-full mb-4"
                  style={{ color: cp.color, background: cp.bg }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cp.color }} />
                  {cp.level}
                </span>

                {/* Checkpoint items */}
                <div className="flex flex-col gap-3">
                  {cp.items.map((item) => (
                    <div key={item.title}>
                      <p className="text-[14px] font-bold text-[#1E1E1E] mb-0.5">{item.title}</p>
                      <p className="text-[13px] text-[#6F717C] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

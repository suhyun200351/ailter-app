"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { currentAnalysis } from "@/lib/mock/analysis";
import { records } from "@/lib/mock/records";
import { trustLevelConfig } from "@/lib/mock/trustLevels";
import { PlatformIcon } from "@/components/PlatformIcon";

// SVG 반원 게이지
// CW(sweep=1)로 왼쪽(180°)→상단(270°)→오른쪽(360°) 순서로 그림
function TrustGauge({
  value,
  level,
  color,
}: {
  value: number;
  level: string;
  color: string;
}) {
  const r = 68;
  const cx = 100;
  const cy = 100;

  // 0-99.9 범위로 클램프 (100% 및 0%의 SVG 퇴화 케이스 방지)
  const v = Math.max(0.5, Math.min(value, 99.5));

  // CW로 180°에서 v/100 * 180° 만큼 증가
  const angleDeg = 180 + (v / 100) * 180;
  const angleRad = angleDeg * (Math.PI / 180);
  const ex = cx + r * Math.cos(angleRad);
  const ey = cy + r * Math.sin(angleRad); // SVG y-down: sin 부호 그대로

  return (
    <svg viewBox="0 24 200 104" className="w-full max-w-[200px] mx-auto">
      {/* 배경 트랙 */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        stroke="#F0F1F4"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      {/* 채워진 값 호 */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`}
        stroke={color}
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      {/* 인디케이터 점 */}
      <circle
        cx={ex.toFixed(2)}
        cy={ey.toFixed(2)}
        r="7"
        fill="white"
        stroke={color}
        strokeWidth="3"
      />
      {/* 레벨 텍스트 */}
      <text
        x="100"
        y="92"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill={color}
        fontFamily="Pretendard, sans-serif"
      >
        {level}
      </text>
      {/* % 텍스트 */}
      <text
        x="100"
        y="114"
        textAnchor="middle"
        fontSize="26"
        fontWeight="900"
        fill="#1E1E1E"
        fontFamily="Pretendard, sans-serif"
      >
        {value}%
      </text>
    </svg>
  );
}

const recordLabelStyle: Record<string, { color: string; bg: string }> = {
  "AI 생성": { color: "#FF3C38", bg: "#FFE1E0" },
  "AI 의심": { color: "#FF9900", bg: "#FFF0D6" },
  "일반 콘텐츠": { color: "#009EFF", bg: "#DCF0FF" },
};

export default function HomePage() {
  const aiActive = useStore((s) => s.aiActive);
  const toggleAI = useStore((s) => s.toggleAI);

  const trustScore = 100 - currentAnalysis.aiProbability;
  const cfg = trustLevelConfig[currentAnalysis.trustLevel];
  const recentRecords = records.slice(0, 3);

  const badgeCfg = {
    1: { color: "#009EFF", bg: "#DCF0FF" },
    2: { color: "#FF9900", bg: "#FFF0D6" },
    3: { color: "#FF3C38", bg: "#FFE1E0" },
  }[currentAnalysis.trustLevel];

  return (
    <div className="flex flex-col">
      {/* AppBar */}
      <div
        className="flex items-center gap-2 px-5 bg-white border-b border-[#F0F1F4] sticky top-0 z-10"
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 12px)",
          paddingBottom: "12px",
        }}
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
            <path
              d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
              stroke="#1E1E1E"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke="#1E1E1E"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button className="w-9 h-9 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="#1E1E1E" strokeWidth="1.8" />
            <path
              d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
              stroke="#1E1E1E"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* 히어로 카드 — 연한 핑크 배경 */}
        <div
          className="rounded-3xl px-5 py-5 flex items-center gap-4"
          style={{ background: aiActive ? "#FFF5F4" : "#F9FAFB" }}
        >
          <div className="flex-1">
            {aiActive ? (
              <>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 bg-[#FF3C38] rounded-full animate-pulse" />
                  <span className="text-[12px] font-medium text-[#FF3C38]">
                    AI 감지 활성화
                  </span>
                </div>
                <h2 className="text-[22px] font-black text-[#1E1E1E] leading-tight">
                  실시간 분석중...
                </h2>
                <p className="text-[13px] text-[#6F717C] mt-1.5 leading-relaxed">
                  안녕하세요!
                  <br />
                  현재 콘텐츠를 분석중입니다
                </p>
              </>
            ) : (
              <>
                <h2 className="text-[20px] font-bold text-[#6F717C] leading-tight mb-1">
                  AI 감지 꺼짐
                </h2>
                <p className="text-[13px] text-[#999BA5] leading-relaxed">
                  상단 토글을 켜면 분석이 시작돼요
                </p>
              </>
            )}
          </div>
          <Image
            src="/assets/mascot-greet.png"
            alt="마스코트"
            width={88}
            height={88}
            className="object-contain flex-shrink-0"
          />
        </div>

        {/* 현재 콘텐츠 분석 결과 카드 */}
        {aiActive && (
          <div className="bg-white rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.04)] overflow-hidden">
            {/* 카드 헤더 */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <p className="text-[15px] font-bold text-[#1E1E1E]">
                현재 콘텐츠 분석 결과
              </p>
              <span
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{ color: badgeCfg.color, background: badgeCfg.bg }}
              >
                {currentAnalysis.label}
              </span>
            </div>

            {/* 감지 상세 행 */}
            <div className="flex items-start gap-3 px-5 pb-4 border-b border-[#F0F1F4]">
              <div className="w-9 h-9 rounded-xl bg-[#F0F1F4] flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="#6F717C" strokeWidth="1.8" />
                  <path
                    d="M3 7V5a2 2 0 0 1 2-2h2M3 17v2a2 2 0 0 0 2 2h2M21 7V5a2 2 0 0 0-2-2h-2M21 17v2a2 2 0 0 1-2 2h-2"
                    stroke="#6F717C"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-medium text-[#999BA5]">AI 감지 활성화</p>
                <p className="text-[13px] text-[#2B2D33] leading-relaxed mt-0.5">
                  {currentAnalysis.reasons[0]}
                </p>
              </div>
            </div>

            {/* 신뢰도 게이지 섹션 */}
            <Link href="/trust">
              <div className="px-5 pt-4 pb-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[14px] font-semibold text-[#1E1E1E]">콘텐츠 신뢰도</p>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="m9 6 6 6-6 6"
                      stroke="#C5C6CD"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <TrustGauge value={trustScore} level={cfg.label} color={cfg.color} />

                {/* 범례 */}
                <div className="flex justify-center gap-5 mt-2">
                  {(
                    [
                      { label: "위험", color: "#FF3C38" },
                      { label: "주의", color: "#FF9900" },
                      { label: "안전", color: "#009EFF" },
                    ] as const
                  ).map(({ label, color }) => (
                    <span key={label} className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: color }}
                      />
                      <span className="text-[11px] text-[#6F717C]">{label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* 최근 분석 기록 — 심플 행 */}
        <div className="bg-white rounded-2xl shadow-[0_0_20px_0_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <p className="text-[14px] font-semibold text-[#1E1E1E]">최근 분석 기록</p>
            <Link href="/records" className="flex items-center gap-0.5">
              <span className="text-[12px] text-[#999BA5]">전체보기</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="m9 6 6 6-6 6"
                  stroke="#C5C6CD"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </div>
          <div className="divide-y divide-[#F0F1F4]">
            {recentRecords.map((r) => {
              const ls =
                recordLabelStyle[r.label] ?? recordLabelStyle["일반 콘텐츠"];
              return (
                <Link key={r.id} href={`/records/${r.id}`}>
                  <div className="flex items-center gap-3 px-5 py-3.5">
                    <PlatformIcon platform={r.platform} size={36} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-[#1E1E1E] truncate">
                        {r.platform}
                      </p>
                      <p className="text-[12px] text-[#999BA5] mt-0.5">{r.time}</p>
                    </div>
                    <span
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ color: ls.color, background: ls.bg }}
                    >
                      {r.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 공유 전 확인 경고 */}
        <div className="bg-white border border-[#F0F1F4] rounded-2xl px-5 py-4 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ border: "2px solid #FF3C38" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 9v4M12 17h.01"
                stroke="#FF3C38"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#1E1E1E]">
              공유 전 다시 확인이 필요합니다
            </p>
            <p className="text-[12px] text-[#6F717C] mt-0.5 leading-relaxed">
              허위 정보가 포함된 이미지일 수 있습니다.
            </p>
          </div>
        </div>

        {/* AI 콘텐츠 구별 팁 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[14px] font-semibold text-[#1E1E1E]">AI 콘텐츠 구별 팁</p>
            <Link href="/guide" className="flex items-center gap-0.5">
              <span className="text-[12px] text-[#999BA5]">전체보기</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="m9 6 6 6-6 6"
                  stroke="#C5C6CD"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/guide">
              <div className="bg-white rounded-2xl p-4 shadow-[0_0_20px_0_rgba(0,0,0,0.04)]">
                <div className="w-10 h-10 rounded-xl bg-[#FFE1E0] flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="9" cy="7" r="3.5" stroke="#FF3C38" strokeWidth="1.8" />
                    <path
                      d="M3 21v-2a4 4 0 0 1 4-4h4"
                      stroke="#FF3C38"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="m16 11 2 2 4-4"
                      stroke="#FF3C38"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-[13px] font-semibold text-[#1E1E1E] leading-snug">
                  AI 피부 표현
                  <br />
                  특징 확인
                </p>
              </div>
            </Link>
            <Link href="/guide">
              <div className="bg-white rounded-2xl p-4 shadow-[0_0_20px_0_rgba(0,0,0,0.04)]">
                <div className="w-10 h-10 rounded-xl bg-[#EFE7FE] flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="#8A38F5"
                      strokeWidth="1.8"
                    />
                    <path
                      d="m9 9 2 2 4-4"
                      stroke="#8A38F5"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 15h6"
                      stroke="#8A38F5"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-[13px] font-semibold text-[#1E1E1E] leading-snug">
                  딥페이크
                  <br />
                  구별 방법
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

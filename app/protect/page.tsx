"use client";

import { useRouter } from "next/navigation";

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.2" stroke="#FF3C38" strokeWidth="1.7" />
        <path d="M12 7.5v5" stroke="#FF3C38" strokeWidth="1.9" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1" fill="#FF3C38" />
      </svg>
    ),
    title: "위험 콘텐츠 경고",
    desc: "위험 콘텐츠 감지 시 실시간 알림을 제공해요",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 4v11M12 4 8.5 7.5M12 4l3.5 3.5" stroke="#FF9900" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 12.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6.5" stroke="#FF9900" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    title: "공유 전 주의 안내",
    desc: "부적절한 내용 공유 전 경고 팝업이 표시돼요",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M20 11a8 8 0 1 0-2.3 5.6" stroke="#009EFF" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M20 5v4h-4" stroke="#009EFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "AI 콘텐츠 자동 표시",
    desc: "AI로 생성된 이미지에 자동으로 라벨이 붙어요",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 1 4 17.5v-12ZM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 0 1.5-1.5v-12Z" stroke="#8A38F5" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    title: "학습 가이드 제공",
    desc: "가짜 뉴스와 AI 콘텐츠 구별법을 배울 수 있어요",
  },
];

export default function ProtectPage() {
  const router = useRouter();

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
          <div className="h-full w-2/3 bg-[#FF3C38] rounded-full" />
        </div>
        <span className="text-[12px] text-[#999BA5] font-medium">2 / 3</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-4 pb-6 overflow-y-auto">
        <div className="flex justify-center mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${BP}/assets/mascot-detective.png`} alt="보호 안내" width={120} height={120} className="object-contain" />
        </div>

        <h2 className="text-[22px] font-bold text-[#1E1E1E] leading-snug mb-2 text-center">
          안전한 SNS 환경을 위해<br />보호 기능을 작동합니다
        </h2>
        <p className="text-[14px] text-[#6F717C] text-center mb-8 leading-relaxed">
          아래 기능들이 자동으로 활성화돼요
        </p>

        <div className="flex flex-col gap-3">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-4 bg-[#F9FAFB] rounded-2xl px-4 py-4">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-[0_0_12px_0_rgba(0,0,0,0.06)] flex-shrink-0">
                {f.icon}
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-[#1E1E1E]">{f.title}</p>
                <p className="text-[12px] text-[#6F717C] mt-0.5 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="px-6"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)" }}
      >
        <button
          onClick={() => router.push("/permission")}
          className="w-full h-[52px] bg-[#FF3C38] rounded-2xl text-[15px] font-semibold text-white active:scale-[.98] transition-transform"
        >
          확인했어요
        </button>
      </div>
    </div>
  );
}

export type TrustLevel = 1 | 2 | 3;
export type Platform = "Instagram" | "TikTok" | "YouTube";

export type AnalysisRecord = {
  id: string;
  platform: Platform;
  title: string;
  time: string;
  trustLevel: TrustLevel;
  aiProbability: number;
  label: "일반 콘텐츠" | "AI 의심" | "AI 생성";
  isDangerous: boolean;
  reasons: string[];
  hashtags: string[];
};

export const records: AnalysisRecord[] = [
  {
    id: "1",
    platform: "Instagram",
    title: "AI 생성 이미지 릴스",
    time: "방금 전",
    trustLevel: 3,
    aiProbability: 92,
    label: "AI 생성",
    isDangerous: true,
    reasons: [
      "얼굴 패턴이 비정상적으로 반복됩니다",
      "배경 흐림 처리가 비자연스럽습니다",
      "광고 관계 불명확 (74%)",
    ],
    hashtags: ["딥페이크", "AI생성"],
  },
  {
    id: "2",
    platform: "TikTok",
    title: "딥페이크 의심 영상",
    time: "32분 전",
    trustLevel: 2,
    aiProbability: 67,
    label: "AI 의심",
    isDangerous: false,
    reasons: [
      "목소리와 입모양 불일치",
      "과도하게 매끄러운 피부 처리",
      "모호한 광고 관계",
    ],
    hashtags: ["AI의심"],
  },
  {
    id: "3",
    platform: "YouTube",
    title: "케이스 스터디 영상",
    time: "1시간 전",
    trustLevel: 1,
    aiProbability: 12,
    label: "일반 콘텐츠",
    isDangerous: false,
    reasons: [
      "명확한 출처 (공공기관 확인)",
      "논리적인 댓글 반응 (구체적 피드백)",
    ],
    hashtags: [],
  },
  {
    id: "4",
    platform: "Instagram",
    title: "인플루언서 협찬 포스트",
    time: "2시간 전",
    trustLevel: 2,
    aiProbability: 45,
    label: "AI 의심",
    isDangerous: false,
    reasons: ["모호한 광고 관계", "과도한 필터 처리"],
    hashtags: [],
  },
  {
    id: "5",
    platform: "TikTok",
    title: "뉴스 클립 영상",
    time: "3시간 전",
    trustLevel: 1,
    aiProbability: 8,
    label: "일반 콘텐츠",
    isDangerous: false,
    reasons: [
      "공공기관 출처 확인",
      "투명한 광고 표기",
    ],
    hashtags: [],
  },
  {
    id: "6",
    platform: "YouTube",
    title: "딥페이크 탐지 실험 영상",
    time: "5시간 전",
    trustLevel: 3,
    aiProbability: 88,
    label: "AI 생성",
    isDangerous: true,
    reasons: [
      "얼굴 교체 흔적 감지",
      "조작된 음성 패턴",
      "미확인 자극 정보 포함",
    ],
    hashtags: ["딥페이크", "위험"],
  },
];

export const currentAnalysis = {
  platform: "Instagram" as const,
  aiProbability: 58,
  trustLevel: 2 as 1 | 2 | 3,
  label: "AI 생성 의심",
  reasons: [
    "얼굴 패턴이 비정상적으로 반복됩니다",
    "배경 흐림 처리가 비자연스럽습니다",
    "광고 관계 불명확 (74%)",
  ],
};

export const weeklyStats = {
  total: 24,
  avgTrust: 88,
  byDay: [
    { day: "월", count: 3 },
    { day: "화", count: 5 },
    { day: "수", count: 2 },
    { day: "목", count: 7 },
    { day: "금", count: 4 },
    { day: "토", count: 2 },
    { day: "일", count: 1 },
  ],
};

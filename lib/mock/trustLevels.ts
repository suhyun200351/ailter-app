export const trustLevelConfig = {
  1: {
    label: "안전",
    color: "#009EFF",
    bg: "#DCF0FF",
    text: "신뢰 가능",
    criteria: [
      "명확한 출처 (공공기관·검증된 뉴스)",
      "논리적인 댓글 반응 (구체적 피드백)",
      "투명한 광고·협찬 표기",
    ],
  },
  2: {
    label: "주의",
    color: "#FF9900",
    bg: "#FFF0D6",
    text: "팩트 확인 필요",
    criteria: [
      "인식되는 AI 생성 흔적 (지나치게 매끄럽거나 이상한 문장)",
      "모호한 광고·협찬 관계",
      "출처 불명확 또는 과장된 표현",
    ],
  },
  3: {
    label: "위험",
    color: "#FF3C38",
    bg: "#FFE1E0",
    text: "차단 및 신고",
    criteria: [
      "가짜 뉴스·딥페이크 (조작 이미지, 미확인 자극 정보)",
      "의도적인 정보 왜곡 (비방·불법 관계 선동)",
      "AI 생성 확률 80% 이상",
    ],
  },
} as const;

import { trustLevelConfig } from "@/lib/mock/trustLevels";
import type { TrustLevel } from "@/lib/mock/records";

export function TrustBadge({ level, size = "sm" }: { level: TrustLevel; size?: "sm" | "md" }) {
  const cfg = trustLevelConfig[level];
  const padding = size === "md" ? "px-3 py-1" : "px-2 py-0.5";
  const font = size === "md" ? "text-[13px] font-semibold" : "text-[11px] font-semibold";
  return (
    <span
      className={`inline-flex items-center rounded-full ${padding} ${font}`}
      style={{ color: cfg.color, background: cfg.bg }}
    >
      {cfg.label}
    </span>
  );
}

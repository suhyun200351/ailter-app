import Link from "next/link";
import { TrustBadge } from "./TrustBadge";
import { PlatformIcon } from "./PlatformIcon";
import type { AnalysisRecord } from "@/lib/mock/records";
import { trustLevelConfig } from "@/lib/mock/trustLevels";

export function RecordCard({ record }: { record: AnalysisRecord }) {
  const cfg = trustLevelConfig[record.trustLevel];
  return (
    <Link href={`/records/${record.id}`}>
      <div className="bg-white rounded-2xl p-4 shadow-[0_0_20px_0_rgba(0,0,0,0.04)] flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <PlatformIcon platform={record.platform} size={36} />
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-[#1E1E1E] leading-snug truncate">{record.title}</p>
            <p className="text-[12px] text-[#999BA5] mt-0.5">{record.platform} · {record.time}</p>
          </div>
          <TrustBadge level={record.trustLevel} />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-[#F0F1F4] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${record.aiProbability}%`, background: cfg.color }}
            />
          </div>
          <span className="text-[12px] font-semibold" style={{ color: cfg.color }}>
            AI {record.aiProbability}%
          </span>
        </div>
      </div>
    </Link>
  );
}

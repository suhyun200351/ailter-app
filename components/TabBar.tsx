"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/home",
    label: "홈",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V10.5Z"
          stroke={active ? "#FF3C38" : "#999BA5"}
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill={active ? "#FFE1E0" : "none"}
        />
        <path d="M9 22V12h6v10" stroke={active ? "#FF3C38" : "#999BA5"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/records",
    label: "기록",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.5" stroke={active ? "#FF3C38" : "#999BA5"} strokeWidth="1.8"
          fill={active ? "#FFE1E0" : "none"} />
        <path d="M12 8v4.5l3 1.8" stroke={active ? "#FF3C38" : "#999BA5"}
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/guide",
    label: "학습",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 6.5A1.5 1.5 0 0 1 5.5 5H11v14H5.5A1.5 1.5 0 0 1 4 17.5v-11ZM20 6.5A1.5 1.5 0 0 0 18.5 5H13v14h5.5A1.5 1.5 0 0 0 20 17.5v-11Z"
          stroke={active ? "#FF3C38" : "#999BA5"}
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill={active ? "#FFE1E0" : "none"}
        />
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "설정",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke={active ? "#FF3C38" : "#999BA5"} strokeWidth="1.8" fill={active ? "#FFE1E0" : "none"} />
        <path
          d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          stroke={active ? "#FF3C38" : "#999BA5"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-[#F0F1F4]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex">
        {tabs.map((tab) => {
          const active = pathname === tab.href || pathname.startsWith(tab.href + "/");
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1"
            >
              {tab.icon(active)}
              <span
                className="text-[10px] font-medium"
                style={{ color: active ? "#FF3C38" : "#999BA5" }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

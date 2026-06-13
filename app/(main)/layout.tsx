import { TabBar } from "@/components/TabBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mobile-shell flex flex-col min-h-svh bg-[#F9FAFB]">
      <main className="flex-1 pb-[72px]">{children}</main>
      <TabBar />
    </div>
  );
}

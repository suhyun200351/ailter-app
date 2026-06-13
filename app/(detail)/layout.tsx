export default function DetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mobile-shell flex flex-col min-h-svh bg-[#F9FAFB]">
      <main className="flex-1">{children}</main>
    </div>
  );
}

import { records } from "@/lib/mock/records";
import RecordDetailClient from "./RecordDetailClient";

export function generateStaticParams() {
  return records.map((r) => ({ id: r.id }));
}

type Props = { params: Promise<{ id: string }> };

export default async function RecordDetailPage({ params }: Props) {
  const { id } = await params;
  return <RecordDetailClient id={id} />;
}

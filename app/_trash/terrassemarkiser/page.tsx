import { generateStaticProductComparisonData } from "@/innhold/produkter";
import { ClientPage } from "./client.page";

export default function Page() {
  const comparisonData = generateStaticProductComparisonData();
  return <ClientPage comparisonData={comparisonData} />;
}

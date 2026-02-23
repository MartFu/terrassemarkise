import { ClientPage } from "./client.page";
import { generateStaticProductComparisonData } from "@/innhold/produkter";

export default function Page() {
  const comparisonData = generateStaticProductComparisonData();
  return <ClientPage comparisonData={comparisonData} />;
}

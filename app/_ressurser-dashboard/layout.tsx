import ResourcesLayoutShell from "@/components/pages/resources/layout-shell";
import { ResourcesProvider } from "@/context/resources-provider";
import { getAllContent } from "@/lib/content-loader.server";

export default async function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [artikler, videoer] = await Promise.all([
    getAllContent("ressurser/artikler", { sortBy: "date", sortOrder: "desc" }),
    getAllContent("videoer", { sortBy: "date", sortOrder: "desc" }),
  ]);

  return (
    <ResourcesProvider data={{ artikler, videoer }}>
      <ResourcesLayoutShell>{children}</ResourcesLayoutShell>
    </ResourcesProvider>
  );
}

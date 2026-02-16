import ProjectShowcase from "@/components/test/magnetic";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="min-h-screen w-screen border">
      <ProjectShowcase />
    </div>
  );
}

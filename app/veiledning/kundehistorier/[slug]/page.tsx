import { redirect } from "next/navigation";

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) return redirect("/veiledning/kundehistorier");

  return (
    <Layout>
      <article className="container max-w-2xl py-12 md:py-20">
        <Link
          to="/veiledning/case-studier"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={14} /> Tilbake til kundehistorier
        </Link>

        <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="rounded-sm bg-secondary px-2 py-0.5 font-medium uppercase tracking-wider text-secondary-foreground">
            {cs.product}
          </span>
          <span>{cs.location}</span>
        </div>

        <h1 className="mt-4 font-heading text-3xl font-semibold text-foreground md:text-4xl">
          {cs.title}
        </h1>

        <div className="mt-10">
          <MarkdownRenderer content={cs.body} />
        </div>
      </article>
    </Layout>
  );
}

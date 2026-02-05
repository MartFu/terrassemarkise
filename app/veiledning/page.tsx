import { getAllContent } from "@/lib/content-service";
import Link from "next/link";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

export default async function VeiledningIndexPage() {
  const veiledningItems = await getAllContent("veiledning");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Veiledning</h1>
          <p className="text-lg text-gray-600">
            Finn hjelp og veiledning for å komme i gang
          </p>
        </div>

        {/* Content Grid */}
        {veiledningItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Ingen veiledninger tilgjengelig enda.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {veiledningItems.map((item) => (
              <Link
                key={item.slug}
                href={`/veiledning/${item.slug}`}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all"
              >
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Veiledning
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.frontmatter.title || "Uten tittel"}
                </h2>
                
                {item.frontmatter.description && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.frontmatter.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between mt-4">
                  {item.frontmatter.date && (
                    <time className="text-sm text-gray-500">
                      {format(new Date(item.frontmatter.date), "d. MMMM yyyy", {
                        locale: nb,
                      })}
                    </time>
                  )}
                  <span className="text-blue-600 font-medium">
                    Les mer →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
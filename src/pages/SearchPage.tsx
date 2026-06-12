import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { articles } from "../data/articles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query || query === "all") return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-amber-400/25 text-amber-200 rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export function SearchPage() {
  const queryParams = useQuery();
  const raw = queryParams.get("q") || "";
  const normalized = raw.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (normalized === "" || normalized === "all") return articles;
    return articles.filter((article) => {
      const target =
        `${article.title} ${article.excerpt} ${article.author} ${article.category}`.toLowerCase();
      return target.includes(normalized);
    });
  }, [normalized]);

  return (
    <section className="space-y-8 animate-fade-in-up">
      {/* ── Header ── */}
      <header className="space-y-4">
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-amber-300 transition-colors group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          Back to articles
        </Link>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300 border border-cyan-400/25">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            Search Results
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-50">
          Results for your query
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span data-testid="search-query-display" className="text-slate-400">
            Query:{" "}
            <span className="font-bold text-amber-300">
              {normalized || "all"}
            </span>
          </span>
          <span
            data-testid="results-count"
            className="inline-flex items-center rounded-full bg-slate-800/70 px-3.5 py-1 text-xs font-bold text-slate-200 border border-slate-700/50"
          >
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </header>

      {/* ── Results Grid ── */}
      <div
        data-testid="search-results-list"
        className="grid gap-4 md:grid-cols-2"
      >
        {filtered.map((article, i) => (
          <article
            key={article.id}
            className={`group glass-card shimmer-hover rounded-2xl p-5 hover:border-amber-400/30 transition-all duration-300 animate-fade-in-up stagger-${Math.min(i % 8 + 1, 8)}`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: `${article.categoryColor}15`,
                  color: article.categoryColor,
                  border: `1px solid ${article.categoryColor}35`,
                }}
              >
                {article.category}
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                {article.readingTime} min
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-50 group-hover:text-amber-300 transition-colors line-clamp-2">
              {highlightMatch(article.title, normalized)}
            </h2>

            <p className="mt-2 text-sm text-slate-400 line-clamp-2 leading-relaxed">
              {highlightMatch(article.excerpt, normalized)}
            </p>

            <div className="mt-4 flex items-center justify-between text-xs">
              <div className="flex flex-col">
                <span className="font-semibold text-slate-300">
                  {highlightMatch(article.author, normalized)}
                </span>
                <span className="text-slate-500">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <Link
                to={`/article/${article.id}`}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all border"
                style={{
                  background: `${article.categoryColor}12`,
                  color: article.categoryColor,
                  borderColor: `${article.categoryColor}35`,
                }}
              >
                View article
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800/60 border border-slate-700/50">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-500" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-slate-300">No results found</p>
            <p className="text-sm text-slate-500 max-w-md">
              No articles matched "<span className="text-amber-300 font-medium">{normalized}</span>". Try a broader term like{" "}
              <span className="font-semibold text-amber-300">performance</span>,{" "}
              <span className="font-semibold text-amber-300">AI</span>, or{" "}
              <span className="font-semibold text-amber-300">design</span>.
            </p>
            <Link
              to="/articles"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-300 transition-colors"
            >
              Browse all articles
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
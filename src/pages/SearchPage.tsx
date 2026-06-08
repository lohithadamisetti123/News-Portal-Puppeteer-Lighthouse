import { Link, useLocation } from "react-router-dom";
import { articles } from "../data/articles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function SearchPage() {
  const query = useQuery();
  const raw = query.get("q") || "";
  const normalized = raw.trim().toLowerCase();

  const filtered =
    normalized === "" || normalized === "all"
      ? articles
      : articles.filter((article) => {
          const target = `${article.title} ${article.excerpt} ${article.author} ${article.category}`.toLowerCase();
          return target.includes(normalized);
        });

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="inline-flex items-center gap-2 rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-300 border border-sky-400/30">
          Search results
        </p>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-50">
          What we found for you
        </h1>
        <div className="flex flex-wrap items-baseline gap-3 text-sm text-slate-300">
          <span data-testid="search-query-display">
            Query:{" "}
            <span className="font-semibold text-amber-300">
              {normalized || "all"}
            </span>
          </span>
          <span
            data-testid="results-count"
            className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-slate-200 border border-slate-700"
          >
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </header>

      <div
        data-testid="search-results-list"
        className="grid gap-6 lg:grid-cols-2"
      >
        {filtered.map((article) => (
          <article
            key={article.id}
            className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 md:p-5 hover:border-amber-400/40 transition-colors"
          >
            <h2 className="text-lg font-semibold text-slate-50">
              {article.title}
            </h2>
            <p className="mt-2 text-sm text-slate-300 line-clamp-3">
              {article.excerpt}
            </p>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>{article.author}</span>
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
            <Link
              to={`/article/${article.id}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-4 py-2 text-xs font-semibold text-amber-300 border border-amber-400/30 hover:bg-amber-400 hover:text-slate-950 transition-colors"
            >
              View article
              <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-slate-400">
            No articles matched your search. Try a broader term like{" "}
            <span className="font-semibold text-amber-300">performance</span> or{" "}
            <span className="font-semibold text-amber-300">design</span>.
          </p>
        )}
      </div>

      <div className="pt-2">
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-slate-100 border border-slate-700 hover:border-amber-400 hover:text-amber-300 transition-colors"
        >
          ← Back to all articles
        </Link>
      </div>
    </section>
  );
}
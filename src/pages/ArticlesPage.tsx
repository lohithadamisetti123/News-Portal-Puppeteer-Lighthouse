import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { articles } from "../data/articles";
import { ArticleCard } from "../components/ArticleCard";

export function ArticlesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    navigate(
      trimmed
        ? `/search?q=${encodeURIComponent(trimmed)}`
        : `/search?q=all`
    );
  };

  return (
    <section aria-labelledby="articles-heading" className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30 mb-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Real-time performance ready
          </p>
          <h1
            id="articles-heading"
            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-50"
          >
            Featured insights from NovaNews
          </h1>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-slate-300">
            Explore opinionated deep dives on performance, design, and
            accessibility, crafted to demonstrate Core Web Vitals excellence.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="w-full md:w-[340px] space-y-2"
          aria-label="Search articles"
        >
          <label
            htmlFor="search-input"
            className="block text-xs font-semibold uppercase tracking-wide text-slate-400"
          >
            Search the newsroom
          </label>
          <div className="flex rounded-full border border-slate-700 bg-slate-900/80 shadow-inner shadow-slate-900 focus-within:ring-2 focus-within:ring-amber-400/60">
            <input
              id="search-input"
              data-testid="search-input"
              type="search"
              placeholder="Search by title, author, or category…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 rounded-l-full bg-transparent px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              data-testid="search-button"
              className="rounded-r-full bg-amber-400 px-4 text-sm font-semibold text-slate-950 hover:bg-amber-300 transition-colors"
            >
              Search
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Hit enter or click search to open a dedicated results page.
          </p>
        </form>
      </header>

      <div
        data-testid="articles-list"
        className="grid gap-6 lg:grid-cols-2"
      >
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
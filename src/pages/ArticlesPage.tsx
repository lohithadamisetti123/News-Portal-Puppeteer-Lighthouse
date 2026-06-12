import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { articles } from "../data/articles";
import { ArticleCard } from "../components/ArticleCard";

const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

export function ArticlesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

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
    <section aria-labelledby="articles-heading" className="space-y-10">
      {/* ── Hero Section ── */}
      <header className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-300 border border-amber-400/25">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            Live Newsroom
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-800/60 px-3 py-1 text-xs font-semibold text-slate-400 border border-slate-700/50">
            {articles.length} articles
          </span>
        </div>

        <h1
          id="articles-heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]"
        >
          <span className="text-slate-50">Stay ahead with </span>
          <span className="gradient-text">lightning-fast</span>
          <span className="text-slate-50"> insights</span>
        </h1>

        <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-400">
          Dive into curated long-form articles covering technology, AI, security,
          climate, space, and design — optimized for speed, accessibility, and
          readability.
        </p>
      </header>

      {/* ── Performance Budget Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "FCP", value: "≤ 2.0s", color: "#22c55e" },
          { label: "LCP", value: "≤ 2.5s", color: "#3b82f6" },
          { label: "CLS", value: "≤ 0.1", color: "#8b5cf6" },
          { label: "TBT", value: "≤ 300ms", color: "#f59e0b" },
        ].map((metric) => (
          <div
            key={metric.label}
            className="glass-card rounded-xl p-4 text-center"
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              {metric.label}
            </p>
            <p
              className="mt-2 text-xl font-bold"
              style={{ color: metric.color }}
            >
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Search Bar ── */}
      <form
        onSubmit={handleSearch}
        className="glass-card flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-end"
        aria-label="Search articles"
      >
        <div className="flex-1">
          <label
            htmlFor="search-input"
            className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2"
          >
            Search the newsroom
          </label>
          <input
            id="search-input"
            data-testid="search-input"
            type="search"
            placeholder="Search by title, author, or category…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-700/60 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/15 transition-all"
          />
        </div>
        <button
          type="submit"
          data-testid="search-button"
          className="rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-400/20 hover:shadow-amber-400/30 hover:from-amber-300 hover:to-amber-400 transition-all duration-200 active:scale-[0.97]"
        >
          Search
        </button>
      </form>

      {/* ── Category Filter Pills ── */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 border ${
              activeCategory === cat
                ? "bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-400/20"
                : "bg-slate-900/50 text-slate-400 border-slate-700/50 hover:text-slate-200 hover:border-slate-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Articles Grid ── */}
      <div
        data-testid="articles-list"
        className="grid gap-5 md:grid-cols-2"
      >
        {filteredArticles.map((article, i) => (
          <ArticleCard key={article.id} article={article} index={i} />
        ))}
      </div>
    </section>
  );
}
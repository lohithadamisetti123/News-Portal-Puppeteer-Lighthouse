import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { articles } from "../data/articles";

export function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const articleId = Number(id);
  const article = articles.find((a) => a.id === articleId);
  const [progress, setProgress] = useState(0);

  // Reading progress bar
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Related articles (same category, excluding current)
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return articles
      .filter((a) => a.category === article.category && a.id !== article.id)
      .slice(0, 3);
  }, [article]);

  if (!article) {
    return (
      <section className="space-y-4 animate-fade-in-up py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-50">Article not found</h1>
        <p className="text-slate-400">The article you're looking for doesn't exist.</p>
        <Link
          to="/articles"
          className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-amber-300 transition-colors mt-4"
        >
          ← Back to articles
        </Link>
      </section>
    );
  }

  const paragraphs = article.content
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="reading-progress"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      <div className="grid gap-10 xl:grid-cols-[1fr,340px] animate-fade-in-up">
        {/* ── Main Article ── */}
        <article className="space-y-8">
          {/* Header */}
          <header className="space-y-5">
            <Link
              data-testid="back-to-articles"
              to="/articles"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-amber-300 transition-colors group"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
              Back to all articles
            </Link>

            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider"
              style={{
                background: `${article.categoryColor}15`,
                color: article.categoryColor,
                border: `1px solid ${article.categoryColor}35`,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: article.categoryColor }}
              />
              {article.category}
            </span>

            <h1
              data-testid="article-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-50 leading-[1.15]"
            >
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span
                data-testid="article-author"
                className="font-semibold text-slate-200"
              >
                {article.author}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
              <time
                data-testid="article-date"
                dateTime={article.date}
                className="text-slate-400"
              >
                {new Date(article.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden="true" />
              <span className="text-slate-500">{article.readingTime} min read</span>
            </div>
          </header>

          {/* Featured Image */}
          <figure className="overflow-hidden rounded-2xl border border-slate-800/60 shadow-xl">
            <img
              data-testid="article-featured-image"
              src={article.image}
              alt={article.title}
              width="800"
              height="450"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-cover"
            />
          </figure>

          {/* Share Row */}
          <div className="flex items-center gap-3 py-2 border-b border-slate-800/40">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Share
            </span>
            {["Twitter", "LinkedIn", "Copy Link"].map((label) => (
              <button
                key={label}
                className="rounded-full border border-slate-700/50 bg-slate-900/50 px-3.5 py-1.5 text-xs font-medium text-slate-400 hover:text-amber-300 hover:border-amber-400/30 transition-all"
                onClick={() => {
                  if (label === "Copy Link") {
                    navigator.clipboard?.writeText(window.location.href);
                  }
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Article Content */}
          <section data-testid="article-content" className="article-prose">
            {paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </section>

          {/* Bottom CTA */}
          <div className="pt-6 border-t border-slate-800/40">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/60 px-6 py-3 text-sm font-bold text-slate-200 hover:border-amber-400/40 hover:text-amber-300 transition-all group"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
              Back to all articles
            </Link>
          </div>
        </article>

        {/* ── Sidebar ── */}
        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          {/* Article info card */}
          <div className="glass-card rounded-2xl p-5 space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Article Info
            </p>
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-900/60 p-3.5">
                <p className="text-xs text-slate-500 font-medium">Reading time</p>
                <p className="mt-1 text-lg font-bold text-slate-100">
                  ~{article.readingTime} minutes
                </p>
              </div>
              <div className="rounded-xl bg-slate-900/60 p-3.5">
                <p className="text-xs text-slate-500 font-medium">Category</p>
                <p className="mt-1 text-lg font-bold" style={{ color: article.categoryColor }}>
                  {article.category}
                </p>
              </div>
              <div className="rounded-xl bg-slate-900/60 p-3.5">
                <p className="text-xs text-slate-500 font-medium">Author</p>
                <p className="mt-1 text-lg font-bold text-slate-100">
                  {article.author}
                </p>
              </div>
            </div>
          </div>

          {/* Performance card */}
          <div className="glass-card rounded-2xl p-5 space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
              Core Web Vitals
            </p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Fast loading", value: "FCP < 2s", color: "#22c55e" },
                { label: "Quick render", value: "LCP < 2.5s", color: "#3b82f6" },
                { label: "Stable layout", value: "CLS ≤ 0.1", color: "#8b5cf6" },
                { label: "Responsive", value: "TBT ≤ 300ms", color: "#f59e0b" },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between rounded-xl bg-slate-900/50 px-3.5 py-2.5"
                >
                  <span className="text-slate-400">{item.label}</span>
                  <span className="font-bold" style={{ color: item.color }}>
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div className="glass-card rounded-2xl p-5 space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Related Articles
              </p>
              <ul className="space-y-3">
                {relatedArticles.map((rel) => (
                  <li key={rel.id}>
                    <Link
                      to={`/article/${rel.id}`}
                      className="block rounded-xl bg-slate-900/50 p-3.5 hover:bg-slate-800/60 transition-colors group"
                    >
                      <p className="text-sm font-semibold text-slate-200 group-hover:text-amber-300 transition-colors line-clamp-2">
                        {rel.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {rel.author} · {rel.readingTime} min
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
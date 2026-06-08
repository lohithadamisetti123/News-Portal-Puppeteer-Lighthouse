import { Link, useParams } from "react-router-dom";
import { articles } from "../data/articles";

export function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const articleId = Number(id);
  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">Article not found</h1>
        <Link
          to="/articles"
          className="inline-flex items-center rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300"
        >
          ← Back to articles
        </Link>
      </section>
    );
  }

  return (
    <article className="space-y-6">
      <header className="space-y-4">
        <p className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-400/30">
          {article.category}
        </p>
        <h1
          data-testid="article-title"
          className="text-3xl md:text-4xl font-bold tracking-tight text-slate-50"
        >
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          <span data-testid="article-author" className="font-medium">
            {article.author}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden />
          <time
            data-testid="article-date"
            dateTime={article.date}
            className="text-slate-400"
          >
            {new Date(article.date).toLocaleDateString()}
          </time>
        </div>
      </header>

      <figure className="overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/80 shadow-glass">
        <img
          data-testid="article-featured-image"
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="h-[260px] md:h-[360px] w-full object-cover"
        />
      </figure>

      <section
        data-testid="article-content"
        className="prose prose-invert prose-slate max-w-none prose-headings:text-slate-50 prose-p:text-slate-200 prose-a:text-amber-300"
      >
        {article.content.split("\n").map((paragraph, idx) => (
          <p key={idx}>{paragraph.trim()}</p>
        ))}
      </section>

      <div className="pt-4">
        <Link
          data-testid="back-to-articles"
          to="/articles"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-slate-100 border border-slate-700 hover:border-amber-400 hover:text-amber-300 transition-colors"
        >
          ← Back to all insights
        </Link>
      </div>
    </article>
  );
}
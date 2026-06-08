import { Link } from "react-router-dom";
import type { Article } from "../types";

interface Props {
  article: Article;
}

export function ArticleCard({ article }: Props) {
  const { id, title, excerpt, author, date, category, image } = article;

  return (
    <article
      data-testid={`article-card-${id}`}
      className="group relative overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-900/80 via-slate-900/90 to-slate-950/95 shadow-glass hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr,2fr] h-full">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/60 via-slate-900/0 to-slate-900/40" />
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-300 border border-amber-400/30">
            {category}
          </span>
        </div>

        <div className="flex flex-col gap-3 p-4 md:p-6">
          <header className="space-y-2">
            <h2
              data-testid={`article-title-${id}`}
              className="text-lg md:text-xl font-semibold tracking-tight text-slate-50 group-hover:text-amber-300 transition-colors"
            >
              {title}
            </h2>
            <p
              data-testid={`article-excerpt-${id}`}
              className="text-sm text-slate-300/90 line-clamp-3"
            >
              {excerpt}
            </p>
          </header>

          <div className="mt-auto flex items-center justify-between pt-2">
            <div className="flex flex-col text-xs text-slate-400">
              <span className="font-medium text-slate-200">{author}</span>
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
            <Link
              data-testid={`article-link-${id}`}
              to={`/article/${id}`}
              className="inline-flex items-center gap-1 text-xs md:text-sm rounded-full bg-amber-400/10 px-4 py-2 font-semibold text-amber-300 border border-amber-400/30 hover:bg-amber-400 hover:text-surface transition-colors"
            >
              Read article
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
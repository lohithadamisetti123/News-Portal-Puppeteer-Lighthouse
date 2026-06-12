import { memo } from "react";
import { Link } from "react-router-dom";
import type { Article } from "../types";

interface Props {
  article: Article;
  index?: number;
}

function ArticleCardBase({ article, index = 0 }: Props) {
  const { id, title, excerpt, author, date, category, categoryColor, image, readingTime } = article;

  return (
    <article
      data-testid={`article-card-${id}`}
      className={`group shimmer-hover rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-900/70 via-slate-900/80 to-slate-950/90 shadow-lg hover:shadow-xl hover:border-amber-400/30 transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="grid grid-cols-[1fr,1.6fr] h-full">
        {/* Image */}
        <div className="relative overflow-hidden rounded-l-2xl" style={{ aspectRatio: '16 / 9' }}>
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            width="400"
            height="225"
            className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          {/* Category badge */}
          <span
            className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm"
            style={{
              background: `${categoryColor}18`,
              color: categoryColor,
              border: `1px solid ${categoryColor}40`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: categoryColor }}
            />
            {category}
          </span>

          {/* Reading time badge */}
          <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-semibold text-slate-300 backdrop-blur-sm border border-slate-700/50">
            {readingTime} min read
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-5">
          <header className="space-y-2">
            <h2
              data-testid={`article-title-${id}`}
              className="text-base font-bold tracking-tight text-slate-50 group-hover:text-amber-300 transition-colors duration-200 line-clamp-2"
            >
              {title}
            </h2>
            <p
              data-testid={`article-excerpt-${id}`}
              className="text-sm text-slate-400 line-clamp-2 leading-relaxed"
            >
              {excerpt}
            </p>
          </header>

          <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-800/50">
            <div className="flex flex-col text-xs">
              <span className="font-semibold text-slate-300">{author}</span>
              <span className="text-slate-500">
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <Link
              data-testid={`article-link-${id}`}
              to={`/article/${id}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold rounded-full px-4 py-2 transition-all duration-200 border"
              style={{
                background: `${categoryColor}12`,
                color: categoryColor,
                borderColor: `${categoryColor}35`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = categoryColor;
                el.style.color = "#020617";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = `${categoryColor}12`;
                el.style.color = categoryColor;
              }}
            >
              Read more
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export const ArticleCard = memo(ArticleCardBase);
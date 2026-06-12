import { Link, NavLink } from "react-router-dom";

const navLinkClasses =
  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-slate-100">
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-30 border-b border-slate-800/60 bg-surface/80 backdrop-blur-xl"
        style={{ WebkitBackdropFilter: "blur(20px)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              to="/articles"
              className="flex items-center gap-3 group"
              aria-label="Go to articles home"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-cyan-500 shadow-lg group-hover:shadow-amber-500/25 transition-shadow duration-300">
                <span className="text-slate-950 font-black text-lg leading-none">
                  N
                </span>
              </div>
              <div className="leading-tight">
                <p className="font-bold text-slate-50 tracking-tight">
                  NovaNews
                </p>
                <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                  Performance-first
                </p>
              </div>
            </Link>

            {/* Navigation */}
            <nav
              aria-label="Main navigation"
              className="flex items-center gap-2"
            >
              <NavLink
                to="/articles"
                className={({ isActive }) =>
                  `${navLinkClasses} ${
                    isActive
                      ? "bg-amber-400 text-slate-950 font-semibold shadow-md shadow-amber-400/20"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  }`
                }
              >
                Articles
              </NavLink>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  `${navLinkClasses} ${
                    isActive
                      ? "bg-amber-400 text-slate-950 font-semibold shadow-md shadow-amber-400/20"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  }`
                }
              >
                Search
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Gradient border glow */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(251,191,36,0.3) 30%, rgba(56,189,248,0.2) 70%, transparent)",
          }}
        />
      </header>

      {/* ── Main ── */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="mt-16 border-t border-slate-800/50">
        {/* Gradient top border */}
        <div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(251,191,36,0.2) 40%, rgba(56,189,248,0.15) 60%, transparent)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-cyan-500">
                  <span className="text-slate-950 font-black text-sm">N</span>
                </div>
                <span className="font-bold text-slate-200">NovaNews</span>
              </div>
              <p className="text-sm text-slate-500 max-w-xs">
                Built for speed, clarity, and accessibility. Core Web Vitals
                audited. Performance budgets enforced.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-12 text-sm">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Navigate
                </p>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/articles"
                      className="text-slate-400 hover:text-amber-300 transition-colors"
                    >
                      Articles
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/search"
                      className="text-slate-400 hover:text-amber-300 transition-colors"
                    >
                      Search
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Performance
                </p>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    FCP ≤ 2.0s
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    LCP ≤ 2.5s
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    CLS ≤ 0.1
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/40 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-600">
            <p>© 2026 NovaNews. All rights reserved.</p>
            <p>Puppeteer + Lighthouse Performance Audited</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
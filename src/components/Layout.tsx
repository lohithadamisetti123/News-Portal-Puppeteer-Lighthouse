import { Link, NavLink } from "react-router-dom";

const navLinkClasses =
  "px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-accent hover:text-surface";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-surface to-primary text-slate-100">
      <header className="border-b border-slate-800/70 bg-surface/90 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link
            to="/articles"
            className="flex items-center gap-2 group"
            aria-label="Go to articles home"
          >
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-accent to-amber-400 shadow-glass flex items-center justify-center">
              <span className="text-surface font-black text-lg">N</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold tracking-tight">NovaNews</span>
              <span className="text-xs text-slate-400">
                Lightning-fast news portal
              </span>
            </div>
          </Link>

          <nav aria-label="Main navigation" className="flex gap-2">
            <NavLink
              to="/articles"
              className={({ isActive }) =>
                `${navLinkClasses} ${
                  isActive ? "bg-accent text-surface" : "text-slate-300"
                }`
              }
            >
              Articles
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `${navLinkClasses} ${
                  isActive ? "bg-accent text-surface" : "text-slate-300"
                }`
              }
            >
              Search
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

      <footer className="border-t border-slate-800/70 bg-surface/90 mt-10">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © 2026 NovaNews. Crafted for performance, accessibility, and
            delightful reading.
          </p>
          <p className="flex gap-2">
            <span>Core Web Vitals focused.</span>
            <span className="hidden sm:inline">Audited with Lighthouse.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
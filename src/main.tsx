import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import { Layout } from "./components/Layout";
import { ArticlesPage } from "./pages/ArticlesPage";

const ArticleDetailPage = lazy(() =>
  import("./pages/ArticleDetailPage").then((m) => ({
    default: m.ArticleDetailPage,
  }))
);
const SearchPage = lazy(() =>
  import("./pages/SearchPage").then((m) => ({ default: m.SearchPage }))
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Navigate to="/articles" replace />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/article/:id" element={<ArticleDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
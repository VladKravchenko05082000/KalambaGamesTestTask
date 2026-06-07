import type { FC } from "react";

import { useArticles } from "hooks/useArticles";

import { ArticlePreview } from "pages/home/components/ArticlePreview";

interface AuthorArticlesProps {
  username: string;
}

export const AuthorArticles: FC<AuthorArticlesProps> = ({ username }) => {
  const { data: articlesData, isLoading, isError } = useArticles({ author: username });

  return (
    <div className="col-xs-12 col-md-10 offset-md-1">
      <div className="articles-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <span className="nav-link active">My Articles</span>
          </li>
        </ul>
      </div>

      {isLoading ? (
        <div className="article-preview">Loading articles...</div>
      ) : isError ? (
        <div className="article-preview">Failed to load articles.</div>
      ) : articlesData && articlesData.articles.length === 0 ? (
        <div className="article-preview">No articles are here... yet.</div>
      ) : (
        articlesData?.articles.map(article => <ArticlePreview key={article.slug} article={article} />)
      )}
    </div>
  );
};

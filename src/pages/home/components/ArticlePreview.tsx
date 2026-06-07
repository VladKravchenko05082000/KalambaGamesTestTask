import type { FC } from "react";
import { Link } from "react-router-dom";

import { Article } from "lib/interfaces";
import { ArticleMeta } from "components/article-meta";

interface ArticlePreviewProps {
  article: Article;
}

export const ArticlePreview: FC<ArticlePreviewProps> = ({ article }) => {
  return (
    <div className="article-preview">
      <ArticleMeta article={article} showFollow={false} compactFavorite />
      <Link to={`/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};

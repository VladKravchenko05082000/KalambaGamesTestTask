import type { FC } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { Article } from "lib/interfaces";
import { FavoriteButton } from "components/buttons";

const DEFAULT_AVATAR = "https://static.productionready.io/images/smiley-cyrus.jpg";

interface ArticlePreviewProps {
  article: Article;
}

export const ArticlePreview: FC<ArticlePreviewProps> = ({ article }) => {
  const { author } = article;

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${author.username}`}>
          <img src={author.image || DEFAULT_AVATAR} alt={author.username} />
        </Link>
        <div className="info">
          <Link to={`/profile/${author.username}`} className="author">
            {author.username}
          </Link>
          <span className="date">{format(new Date(article.createdAt), "MMMM d, yyyy")}</span>
        </div>

        <FavoriteButton article={article} compact />
      </div>
      <Link to={`/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};

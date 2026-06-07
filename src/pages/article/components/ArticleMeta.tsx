import type { FC } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { FavoriteButton, FollowButton } from "components/buttons";

import { Article } from "lib/interfaces";

const DEFAULT_AVATAR = "https://static.productionready.io/images/smiley-cyrus.jpg";

interface ArticleMetaProps {
  article: Article;
}

export const ArticleMeta: FC<ArticleMetaProps> = ({ article }) => {
  const { author } = article;

  return (
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
      <FollowButton profile={author} />
      &nbsp;&nbsp;
      <FavoriteButton article={article} />
    </div>
  );
};

import type { FC } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { FavoriteButton, FollowButton } from "components/buttons";
import { Avatar } from "components/avatar";

import { Article } from "lib/interfaces";

interface ArticleMetaProps {
  article: Article;
  showFollow?: boolean;
  compactFavorite?: boolean;
}

export const ArticleMeta: FC<ArticleMetaProps> = ({
  article,
  showFollow = true,
  compactFavorite = false,
}) => {
  const { author } = article;

  return (
    <div className="article-meta">
      <Link to={`/profile/${author.username}`}>
        <Avatar src={author.image} alt={author.username} />
      </Link>
      <div className="info">
        <Link to={`/profile/${author.username}`} className="author">
          {author.username}
        </Link>
        <span className="date">{format(new Date(article.createdAt), "MMMM d, yyyy")}</span>
      </div>
      {showFollow && (
        <>
          <FollowButton profile={author} />
          &nbsp;&nbsp;
        </>
      )}
      <FavoriteButton article={article} compact={compactFavorite} />
    </div>
  );
};

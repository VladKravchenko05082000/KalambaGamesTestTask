import type { FC } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "context/AuthContext";
import { useToggleFavorite } from "hooks/social-action/useToggleFavorite";

import { Article } from "lib/interfaces";

interface FavoriteButtonProps {
  article: Article;
  compact?: boolean;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({ article, compact = false }) => {
  const { status } = useAuth();
  const history = useHistory();
  const { mutate, isPending } = useToggleFavorite(article.slug);

  const handleClick = () => {
    if (status !== "authenticated") {
      history.push("/login");
      return;
    }
    mutate(article.favorited);
  };

  return (
    <button
      type="button"
      className={`btn btn-sm ${article.favorited ? "btn-primary" : "btn-outline-primary"}${
        compact ? " pull-xs-right" : ""
      }`}
      onClick={handleClick}
      disabled={isPending}
    >
      <i className="ion-heart" />
      {compact ? (
        <> {article.favoritesCount}</>
      ) : (
        <>
          &nbsp; {article.favorited ? "Unfavorite" : "Favorite"} Post{" "}
          <span className="counter">({article.favoritesCount})</span>
        </>
      )}
    </button>
  );
};

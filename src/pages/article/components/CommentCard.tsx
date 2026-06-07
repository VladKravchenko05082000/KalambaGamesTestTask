import type { FC } from "react";
import { Link } from "react-router-dom";

const DEFAULT_AVATAR = "https://static.productionready.io/images/smiley-cyrus.jpg";

interface CommentCardProps {
  body: string;
  authorUsername: string;
  authorImage?: string;
  date: string;
  canModify?: boolean;
}

export const CommentCard: FC<CommentCardProps> = ({
  body,
  authorUsername,
  authorImage = DEFAULT_AVATAR,
  date,
  canModify = false,
}) => (
  <div className="card">
    <div className="card-block">
      <p className="card-text">{body}</p>
    </div>
    <div className="card-footer">
      <Link to={`/profile/${authorUsername}`} className="comment-author">
        <img src={authorImage} className="comment-author-img" alt={authorUsername} />
      </Link>
      &nbsp;
      <Link to={`/profile/${authorUsername}`} className="comment-author">
        {authorUsername}
      </Link>
      <span className="date-posted">{date}</span>
      {canModify && (
        <span className="mod-options">
          <i className="ion-edit" />
          <i className="ion-trash-a" />
        </span>
      )}
    </div>
  </div>
);

import { Avatar } from "components/avatar";
import type { FC } from "react";
import { Link } from "react-router-dom";

interface CommentCardProps {
  body: string;
  authorUsername: string;
  authorImage?: string;
  date: string;
  canModify?: boolean;
}

export const CommentCard: FC<CommentCardProps> = ({ body, authorUsername, authorImage, date, canModify = false }) => (
  <div className="card">
    <div className="card-block">
      <p className="card-text">{body}</p>
    </div>
    <div className="card-footer">
      <Link to={`/profile/${authorUsername}`} className="comment-author">
        <Avatar src={authorImage} className="comment-author-img" alt={authorUsername} />
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

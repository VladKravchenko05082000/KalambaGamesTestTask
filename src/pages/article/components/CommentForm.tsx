import type { FC, FormEvent } from "react";
import { useState } from "react";

import { useAuth } from "context/AuthContext";

import { Avatar } from "components/avatar";

export const CommentForm: FC = () => {
  const [comment, setComment] = useState("");

  const { user } = useAuth();

  const onTextAreaChange = (value: string) => {
    setComment(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = comment.trim();
    if (!value) return;

    // Simulate post creation

    setComment("");
  };

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows={3}
          value={comment}
          onChange={event => onTextAreaChange(event.target.value)}
        />
      </div>

      <div className="card-footer">
        <Avatar src={user?.image} className="comment-author-img" alt={user?.username} />
        <button type="submit" className="btn btn-sm btn-primary" disabled={!comment.trim()}>
          Post Comment
        </button>
      </div>
    </form>
  );
};

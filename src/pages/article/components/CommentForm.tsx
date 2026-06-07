import { useState } from "react";
import type { FC, FormEvent } from "react";

const DEFAULT_AVATAR = "https://static.productionready.io/images/smiley-cyrus.jpg";

interface CommentFormProps {
  authorImage?: string;
}

export const CommentForm: FC<CommentFormProps> = ({ authorImage = DEFAULT_AVATAR }) => {
  const [comment, setComment] = useState("");

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
        <img src={authorImage} className="comment-author-img" alt="" />
        <button type="submit" className="btn btn-sm btn-primary" disabled={!comment.trim()}>
          Post Comment
        </button>
      </div>
    </form>
  );
};

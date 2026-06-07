import type { FC } from "react";
import { useState } from "react";

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e0e0e0'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%23bdbdbd'/%3E%3Cpath d='M20 86c0-17 13-28 30-28s30 11 30 28' fill='%23bdbdbd'/%3E%3C/svg%3E";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

export const Avatar: FC<AvatarProps> = ({ src, alt = "", className }) => {
  const [failed, setFailed] = useState(false);
  const url = !src || failed ? PLACEHOLDER : src;

  return <img src={url} alt={alt} className={className} onError={() => setFailed(true)} />;
};

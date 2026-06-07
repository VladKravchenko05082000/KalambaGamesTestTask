import { ArticlesQuery } from "lib/types";

export const articleKeys = {
  root: ["articles"] as const,
  allLists: () => [...articleKeys.root, "list"] as const,
  list: (params: ArticlesQuery) => [...articleKeys.allLists(), params] as const,
  allDetails: () => [...articleKeys.root, "detail"] as const,
  bySlug: (slug: string) => [...articleKeys.allDetails(), slug] as const,
};

export const profileKeys = {
  root: ["profiles"] as const,
  byUsername: (username: string) => [...profileKeys.root, "detail", username] as const,
};

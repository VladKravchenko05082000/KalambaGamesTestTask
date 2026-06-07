import { ArticlesQuery } from "lib/types";

export const articleKeys = {
  root: ["articles"],

  allLists: (): string[] => [...articleKeys.root, "list"],

  list: (params: ArticlesQuery): (string | ArticlesQuery)[] => [...articleKeys.allLists(), params],

  allDetails: (): string[] => [...articleKeys.root, "detail"],

  bySlug: (slug: string): string[] => [...articleKeys.allDetails(), slug],
};

export const profileKeys = {
  root: ["profiles"],

  byUsername: (username: string): string[] => [...profileKeys.root, "detail", username],
};

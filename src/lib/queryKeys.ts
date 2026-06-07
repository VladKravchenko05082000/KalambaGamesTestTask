import { ArticlesQuery } from "lib/types";

export const articleKeys = {
  all: ["articles"] as const,
  list: (params: ArticlesQuery) => ["articles", "list", params] as const,
  detail: (slug: string) => ["articles", "detail", slug] as const,
};

export const profileKeys = {
  detail: (username: string) => ["profiles", "detail", username] as const,
};

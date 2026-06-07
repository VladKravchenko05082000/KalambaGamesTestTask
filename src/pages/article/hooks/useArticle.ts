import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { getArticle } from "api/endpoints";

import { articleKeys } from "lib/queryKeys";

import { Article } from "lib/interfaces";

export const useArticle = (slug: string): UseQueryResult<Article> =>
  useQuery<Article>({
    queryKey: articleKeys.bySlug(slug),
    queryFn: () => getArticle(slug),
    enabled: Boolean(slug),
  });

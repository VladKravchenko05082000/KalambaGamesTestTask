import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { listArticles } from "api/enpoints";

import { articleKeys } from "lib/queryKeys";

import { ArticlesQuery, ArticlesResponse } from "lib/types";

export const useArticles = (params: ArticlesQuery = {}): UseQueryResult<ArticlesResponse> =>
  useQuery<ArticlesResponse>({
    queryKey: articleKeys.list(params),
    queryFn: () => listArticles(params),
    keepPreviousData: true,
  });

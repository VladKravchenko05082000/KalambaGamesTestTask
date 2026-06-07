import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { listArticles } from "api/enpoints";
import { ArticlesQuery, ArticlesResponse } from "lib/types";
import { articleKeys } from "lib/queryKeys";

export const useArticles = (params: ArticlesQuery = {}): UseQueryResult<ArticlesResponse> =>
  useQuery<ArticlesResponse>({
    queryKey: articleKeys.list(params),
    queryFn: () => listArticles(params),
    keepPreviousData: true,
  });

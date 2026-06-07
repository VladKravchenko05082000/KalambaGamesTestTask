import { useMutation, useQueryClient, QueryKey, UseMutationResult } from "@tanstack/react-query";

import { favoriteArticle, unfavoriteArticle } from "api/enpoints";

import { articleKeys } from "lib/queryKeys";

import { Article } from "lib/interfaces";
import { ArticlesResponse } from "lib/types";

type ToggleFavoriteContext = {
  prevLists: [QueryKey, ArticlesResponse | undefined][];
  prevDetail: Article | undefined;
};

const applyFavorite = (article: Article, favorited: boolean): Article => ({
  ...article,
  favorited,
  favoritesCount: article.favoritesCount + (favorited ? 1 : -1),
});

export const useToggleFavorite = (
  slug: string
): UseMutationResult<Article, unknown, boolean, ToggleFavoriteContext> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (favorited: boolean) => (favorited ? unfavoriteArticle(slug) : favoriteArticle(slug)),

    onMutate: async (favorited: boolean) => {
      const next = !favorited;
      await queryClient.cancelQueries({ queryKey: articleKeys.root });

      const prevLists = queryClient.getQueriesData<ArticlesResponse>({ queryKey: articleKeys.allLists() });
      const prevDetail = queryClient.getQueryData<Article>(articleKeys.bySlug(slug));

      queryClient.setQueriesData<ArticlesResponse>({ queryKey: articleKeys.allLists() }, data =>
        data
          ? {
              ...data,
              articles: data.articles.map(a => (a.slug === slug ? applyFavorite(a, next) : a)),
            }
          : data
      );

      if (prevDetail) {
        queryClient.setQueryData<Article>(articleKeys.bySlug(slug), applyFavorite(prevDetail, next));
      }

      return { prevLists, prevDetail };
    },

    onError: (_err, _favorited, context) => {
      context?.prevLists.forEach(([key, data]) => queryClient.setQueryData(key, data));
      if (context?.prevDetail) {
        queryClient.setQueryData(articleKeys.bySlug(slug), context.prevDetail);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.root });
    },
  });
};

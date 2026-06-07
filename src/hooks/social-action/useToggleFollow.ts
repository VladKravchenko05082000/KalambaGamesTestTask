import { useMutation, useQueryClient, QueryKey, UseMutationResult } from "@tanstack/react-query";

import { followProfile, unfollowProfile } from "api/enpoints";

import { profileKeys, articleKeys } from "lib/queryKeys";

import { Article, Profile } from "lib/interfaces";

type ToggleFollowContext = {
  prevProfile: Profile | undefined;
  prevArticles: [QueryKey, Article | undefined][];
};

export const useToggleFollow = (
  username: string
): UseMutationResult<Profile, unknown, boolean, ToggleFollowContext> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (following: boolean) => (following ? unfollowProfile(username) : followProfile(username)),

    onMutate: async (following: boolean) => {
      const next = !following;
      await queryClient.cancelQueries({ queryKey: profileKeys.byUsername(username) });
      await queryClient.cancelQueries({ queryKey: articleKeys.allDetails() });

      const prevProfile = queryClient.getQueryData<Profile>(profileKeys.byUsername(username));
      const prevArticles = queryClient.getQueriesData<Article>({ queryKey: articleKeys.allDetails() });

      if (prevProfile) {
        queryClient.setQueryData<Profile>(profileKeys.byUsername(username), {
          ...prevProfile,
          following: next,
        });
      }

      queryClient.setQueriesData<Article>({ queryKey: articleKeys.allDetails() }, article =>
        article && article.author.username === username
          ? { ...article, author: { ...article.author, following: next } }
          : article
      );

      return { prevProfile, prevArticles };
    },

    onError: (_err, _following, context) => {
      if (context?.prevProfile) {
        queryClient.setQueryData(profileKeys.byUsername(username), context.prevProfile);
      }
      context?.prevArticles.forEach(([key, data]) => queryClient.setQueryData(key, data));
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.byUsername(username) });
      queryClient.invalidateQueries({ queryKey: articleKeys.root });
    },
  });
};

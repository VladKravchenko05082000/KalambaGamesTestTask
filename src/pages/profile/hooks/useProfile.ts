import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { getProfile } from "api/endpoints";
import { Profile } from "lib/interfaces";
import { profileKeys } from "lib/queryKeys";

export const useProfile = (username: string): UseQueryResult<Profile> =>
  useQuery<Profile>({
    queryKey: profileKeys.byUsername(username),
    queryFn: () => getProfile(username),
    enabled: Boolean(username),
  });

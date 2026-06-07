import { api } from "api/http-client";

import { ProfileResponse } from "./types";
import { Profile } from "lib/interfaces";

export async function getProfile(username: string): Promise<Profile> {
  const { data } = await api.get<ProfileResponse>(`/profiles/${encodeURIComponent(username)}`);
  return data.profile;
}

export async function followProfile(username: string): Promise<Profile> {
  const { data } = await api.post<ProfileResponse>(`/profiles/${encodeURIComponent(username)}/follow`);
  return data.profile;
}

export async function unfollowProfile(username: string): Promise<Profile> {
  const { data } = await api.delete<ProfileResponse>(`/profiles/${encodeURIComponent(username)}/follow`);
  return data.profile;
}

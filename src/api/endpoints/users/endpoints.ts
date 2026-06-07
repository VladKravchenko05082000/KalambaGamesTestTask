import { api } from "api/http-client";

import { UserResponse } from "./types";
import { LoginCredentials } from "lib/types";
import { User } from "lib/interfaces";

export async function login(credentials: LoginCredentials): Promise<User> {
  const { data } = await api.post<UserResponse>("/users/login", {
    user: credentials,
  });
  return data.user;
}

export async function getCurrentUser(): Promise<User> {
  const { data } = await api.get<UserResponse>("/user");
  return data.user;
}

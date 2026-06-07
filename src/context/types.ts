import { User } from "lib/interfaces";

export type AuthState = {
  status: AuthStatus;
  user: User | null;
};

export type AuthStatus = "loading" | "authenticated" | "anonymous";

export type AuthAction =
  | { type: "RESTORED"; user: User }
  | { type: "ANONYMOUS" }
  | { type: "LOGGED_IN"; user: User }
  | { type: "LOGGED_OUT" };

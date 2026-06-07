import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { FC, ReactNode } from "react";

import { getCurrentUser, login as loginRequest } from "api/enpoints";

import { authStore } from "store/authStore";

import { AuthAction, AuthState } from "./types";
import { LoginCredentials } from "lib/types";

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "RESTORED":
    case "LOGGED_IN":
      return { status: "authenticated", user: action.user };
    case "ANONYMOUS":
    case "LOGGED_OUT":
      return { status: "anonymous", user: null };
    default:
      return state;
  }
}

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    status: "loading",
    user: null,
  });

  useEffect(() => {
    if (!authStore.readToken()) {
      dispatch({ type: "ANONYMOUS" });
      return;
    }
    getCurrentUser()
      .then(user => dispatch({ type: "RESTORED", user }))
      .catch(() => {
        authStore.removeToken();
        dispatch({ type: "ANONYMOUS" });
      });
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    const user = await loginRequest(credentials);
    authStore.saveToken(user.token);
    dispatch({ type: "LOGGED_IN", user });
  };

  const logout = (): void => {
    authStore.removeToken();
    dispatch({ type: "LOGGED_OUT" });
  };

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

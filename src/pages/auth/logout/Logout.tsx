import type { FC } from "react";
import { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useAuth } from "context/AuthContext";

export const Logout: FC = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Redirect to="/" />;
};

import type { FC } from "react";
import { Link } from "react-router-dom";

interface LoginFormHeaderProps {
  errors: string[];
}

export const LoginFormHeader: FC<LoginFormHeaderProps> = ({ errors }) => (
  <>
    <h1 className="text-xs-center">Sign in</h1>
    <p className="text-xs-center">
      <Link to="/register">Need an account?</Link>
    </p>

    {errors.length > 0 && (
      <ul className="error-messages">
        {errors.map(message => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    )}
  </>
);

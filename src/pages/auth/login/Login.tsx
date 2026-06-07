import type { FC, FormEvent } from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "context/AuthContext";
import { ApiError } from "lib/api-errors";

import { LoginForm } from "./components/LoginForm";
import { LoginFormHeader } from "./components/LoginFormHeader";
import { Container } from "components/containers";

export const Login: FC = () => {
  const { login } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const extractErrors = (body: unknown): string[] => {
    const errors = (body as { errors?: Record<string, string[]> } | null)?.errors;
    if (!errors) return ["Login failed. Please try again."];
    return Object.entries(errors).flatMap(([field, messages]) => messages.map(message => `${field} ${message}`));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    setSubmitting(true);
    try {
      await login({ email, password });
      history.push("/");
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors(extractErrors(error.body));
      } else {
        setErrors(["Unexpected error. Please try again."]);
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      setSubmitting(false);
    };
  }, []);

  return (
    <div className="auth-page">
      <Container>
        <div className="col-md-6 offset-md-3 col-xs-12">
          <LoginFormHeader errors={errors} />
          <LoginForm
            email={email}
            password={password}
            submitting={submitting}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
          />
        </div>
      </Container>
    </div>
  );
};

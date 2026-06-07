import type { FC, FormEvent } from "react";

interface LoginFormProps {
  email: string;
  password: string;
  submitting: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: FC<LoginFormProps> = ({
  email,
  password,
  submitting,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <fieldset className="form-group">
      <input
        className="form-control form-control-lg"
        type="email"
        placeholder="Email"
        value={email}
        onChange={event => onEmailChange(event.target.value)}
        required
      />
    </fieldset>
    <fieldset className="form-group">
      <input
        className="form-control form-control-lg"
        type="password"
        placeholder="Password"
        value={password}
        onChange={event => onPasswordChange(event.target.value)}
        required
      />
    </fieldset>
    <button className="btn btn-lg btn-primary pull-xs-right" type="submit" disabled={submitting}>
      Sign in
    </button>
  </form>
);

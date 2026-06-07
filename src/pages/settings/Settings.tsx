import { Container } from "components/containers";
import { SettingsForm } from "./components/SettingsForm";

import type { FC } from "react";

export const Settings: FC = () => {
  return (
    <div className="settings-page">
      <Container>
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Your Settings</h1>

          <SettingsForm />

          <hr />

          <a className="btn btn-outline-danger" href="/#/logout">
            Or click here to logout.
          </a>
        </div>
      </Container>
    </div>
  );
};

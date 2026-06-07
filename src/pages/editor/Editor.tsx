import { Container } from "components/containers";
import { EditForm } from "./components/EditForm";

import type { FC } from "react";

export const Editor: FC = () => {
  return (
    <div className="editor-page">
      <Container>
        <div className="col-md-10 offset-md-1 col-xs-12">
          <EditForm />
        </div>
      </Container>
    </div>
  );
};

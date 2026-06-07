import type { FC } from "react";
import { useParams } from "react-router-dom";

import { Container, Row } from "components/containers";
import { ProfileInfo } from "./components/ProfileInfo";
import { AuthorArticles } from "./components/AuthorArticles";

export const Profile: FC = () => {
  const { username } = useParams<{ username: string }>();

  return (
    <div className="profile-page">
      <div className="user-info">
        <Container isNeedRow={false}>
          <Row>
            <ProfileInfo username={username} />
          </Row>
        </Container>
      </div>

      <Container isNeedRow={false}>
        <Row>
          <AuthorArticles username={username} />
        </Row>
      </Container>
    </div>
  );
};

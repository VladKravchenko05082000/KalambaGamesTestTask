import type { FC } from "react";
import { useParams } from "react-router-dom";

import { Container, Row } from "components/containers";
import { ProfileInfo } from "./components/ProfileInfo";
import { MyArticles } from "./components/MyArticles";

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
          <MyArticles username={username} />
        </Row>
      </Container>
    </div>
  );
};

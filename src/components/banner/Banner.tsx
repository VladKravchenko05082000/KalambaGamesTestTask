import type { FC, ReactNode } from "react";

import { Container } from "components/containers";

interface BannerProps {
  children: ReactNode;
}

export const Banner: FC<BannerProps> = ({ children }) => {
  return (
    <div className="banner">
      <Container isPage={false}>{children}</Container>
    </div>
  );
};

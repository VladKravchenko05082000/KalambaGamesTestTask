import type { FC, ReactNode } from "react";
import { Row } from "./Row";

interface ContainerProps {
  children: ReactNode;
  isPage?: boolean;
  isNeedRow?: boolean;
}

export const Container: FC<ContainerProps> = ({ children, isNeedRow = true, isPage = true }) => {
  return <div className={`container ${isPage ?? ""}`}>{isNeedRow ? <Row>{children}</Row> : <>{children}</>}</div>;
};

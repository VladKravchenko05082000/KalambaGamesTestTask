import type { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  isPage?: boolean;
}

export const Container: FC<ContainerProps> = ({ children, isPage = true }) => {
  return (
    <div className={`container ${isPage ? "page" : ""}`}>
      <div className="row">{children}</div>
    </div>
  );
};

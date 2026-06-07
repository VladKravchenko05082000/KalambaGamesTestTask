import type { FC, ReactNode } from "react";

interface RowProps {
  children: ReactNode;
  additionalClass?: string;
}

export const Row: FC<RowProps> = ({ children, additionalClass }) => {
  return <div className={`row ${additionalClass ?? ""}`}>{children}</div>;
};

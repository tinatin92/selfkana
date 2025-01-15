import { PropsWithChildren } from "react";

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="container mx-auto px-4">{children}</div>;
};

export default Container;

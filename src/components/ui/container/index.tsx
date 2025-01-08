import { PropsWithChildren } from "react";

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="w-[90%] max-w-[1440px] m-auto">{children}</div>;
};

export default Container;

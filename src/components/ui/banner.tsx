import React, { PropsWithChildren } from "react";
import Container from "./container";

interface BannerProps extends PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
}

const Banner: React.FC<BannerProps> = ({ children, className = "", style }) => {
  return (
    <Container>
      <div
        className={` text-2xl lg:text-4xl font-semibold mb-12 border-[12px] p-6 lg:p-12 border-white rounded-3xl bg-customGray bg-math-grid bg-60px text-white leading-normal lg:leading-normal ${className}`}
        style={style}
      >
        {children}
      </div>
    </Container>
  );
};

export default Banner;

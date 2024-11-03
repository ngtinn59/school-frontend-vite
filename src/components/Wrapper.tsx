import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: "normal" | "narrow";
};

export default function Wrapper({ children, className, type }: Props) {
  switch (type) {
    case "narrow":
      return (
        <div
          className={`max-w-[1080px]  md:p-8 p-6 mx-auto w-full ${className}`}
        >
          {children}
        </div>
      );
    default:
      return (
        <div
          className={`max-w-[1280px]  pt-6 px-4 mx-auto w-full ${className}`}
        >
          {children}
        </div>
      );
  }
}

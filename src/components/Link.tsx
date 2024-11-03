import { ReactChild } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children: ReactChild;
  to: string;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
};

export default function Link({ children, to, className, target }: Props) {
  return (
    <NavLink
      to={to}
      className={`text-blue-700 font-medium ${className}`}
      target={target ? target : ""}
    >
      {children}
    </NavLink>
  );
}

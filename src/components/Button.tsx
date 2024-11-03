import { ReactNode } from "react";
import styled from "styled-components";
import {
  COLOR_DISABLED,
  COLOR_PRIMARY,
  TEXT_COLOR_NORMAL,
} from "../utils/constants";

type Props = {
  onClick?: () => void;
  children: ReactNode;
  buttonType?: "outline" | "disabled" | "primary" | "colored";
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
};
const StyledButton = styled.button`
  display: block;
  text-align: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease-in-out;
  /* transition: color 0.2s ease-in-out; */
`;

const PrimaryButton = styled(StyledButton)`
  background-color: ${COLOR_PRIMARY};
  color: #fff;
  &:hover {
    opacity: 0.8;
  }
  &:focus-visible {
    outline: 2px solid ${COLOR_PRIMARY};
    outline-offset: 2px;
  }
`;

const ColoredButton = styled(PrimaryButton)<{
  $backgroundColor?: string;
  $color?: string;
}>`
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.color};
`;

const OutlineButton = styled(StyledButton)`
  background-color: #fff;
  color: ${COLOR_PRIMARY};
  border: solid 1px ${COLOR_PRIMARY};
  &:hover {
    opacity: 0.8;
    background-color: ${COLOR_PRIMARY};
    color: #fff;
  }
  &:focus-visible {
    outline: 2px solid ${COLOR_PRIMARY};
    outline-offset: 2px;
    color: #fff;
  }
`;

const DisabledButton = styled(StyledButton)`
  background-color: ${COLOR_DISABLED};
  color: ${TEXT_COLOR_NORMAL};
`;

export default function Button({
  onClick,
  children,
  buttonType,
  type,
  className,
  backgroundColor,
  textColor,
}: Props) {
  switch (buttonType) {
    case "outline":
      return (
        <OutlineButton
          onClick={onClick}
          type={type ? type : "submit"}
          className={className}
        >
          {children}
        </OutlineButton>
      );
    case "disabled":
      return (
        <DisabledButton
          onClick={onClick}
          type={type ? type : "submit"}
          disabled={true}
          className={className}
        >
          {children}
        </DisabledButton>
      );
    case "colored":
      return (
        <ColoredButton
          onClick={onClick}
          type={type ? type : "submit"}
          className={className}
          $color={textColor}
          $backgroundColor={backgroundColor}
        >
          {children}
        </ColoredButton>
      );
    default:
      return (
        <PrimaryButton
          onClick={onClick}
          type={type ? type : "submit"}
          className={className}
        >
          {children}
        </PrimaryButton>
      );
  }
}

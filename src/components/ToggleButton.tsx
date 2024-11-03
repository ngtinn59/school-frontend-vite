import React from "react";

type Props = {
  id?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  checked?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function ToggleButton({
  id,
  icon,
  checked = false,
  children,
  className,
  onClick,
}: Props) {
  return (
    <div
      id={id ? id : ""}
      className={`border border-solid text-base cursor-pointer flex flex-row flex-nowrap  gap-2 items-center justify-center px-5 py-2 rounded-md font-semibold ${
        checked
          ? "border-primary bg-blue-50 text-primary"
          : " border-normal bg-white text-normal"
      } ${className} hover:border-primary hover:bg-blue-100 hover:text-primary`}
      onClick={onClick}
    >
      <div>{children}</div>
      <div>{icon}</div>
    </div>
  );
}

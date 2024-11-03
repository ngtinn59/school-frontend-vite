import React from "react";
import styled from "styled-components";
import { COLOR_PRIMARY } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type Props = {
  placeholder?: string;
  type?: "text" | "checkbox" | "email" | "password" | "number" | "date";

  inputGroupType?:
    | "checkbox"
    | "no-style"
    | "styled-dropdown"
    | "no-style-dropdown"
    | string;
  name: string;
  required?: boolean | undefined;
  label?: string;
  id?: string;
  value?: string | number | readonly string[] | undefined;
  options?: { value: string; label: string }[]; // For select input
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  icon?: React.ReactNode;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const inputStyle = `
padding: 0.75rem;
border-radius: 0.375rem;
outline: none;
color: #000;
background-color: #fff;
`;

const primaryInputStyle = `--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
var(--tw-ring-offset-width) var(--tw-ring-offset-color);
--tw-ring-shadow: var(--tw-ring-inset) 0 0 0
calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
var(--tw-shadow, 0 0 #0000);
--tw-ring-inset: inset;
--tw-placeholder-color: rgb(255, 255, 255);
--tw-ring-color: #ccc;
&:focus {
box-shadow: var(--tw-ring-inset) 0 0 0
  calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
--tw-ring-inset: inset;
--tw-ring-color: ${COLOR_PRIMARY};
}
`;

const NoStyleInput = styled.input``;

const PrimaryStyleInput = styled.input`
  ${inputStyle}
  ${primaryInputStyle}
`;

const StyledSelect = styled.select<{ $isIcon?: boolean }>`
  ${inputStyle}
  ${primaryInputStyle}
  appearance: none;
  padding-right: 3rem;
  ${(props) => props.$isIcon && `padding-left: 2.5rem;`}
`;

const NoStyleSelect = styled.select<{ $isIcon?: boolean }>`
  ${inputStyle}
  appearance: none;
  padding-right: 3rem;
  ${(props) => props.$isIcon && `padding-left: 2.5rem;`}
`;

const Input: React.FC<Props> = ({
  placeholder,
  type,
  inputGroupType,
  required,
  name,
  onChange,
  label,
  id,
  value,
  options,
  containerClassName,
  inputClassName,
  labelClassName,
  icon,
}) => {
  switch (inputGroupType) {
    case "no-style":
      return (
        <NoStyleInput
          id={id}
          type={type ? type : "text"}
          required={required ? required : false}
          name={name}
          value={value}
          className={`${inputClassName} ${containerClassName}`}
          onChange={onChange}
          placeholder={placeholder}
        />
      );
    case "styled-dropdown":
      return (
        <div className={`${containerClassName}`}>
          {label && (
            <label htmlFor={id ? id : name} className={`${labelClassName}`}>
              {label} {required && <span className="text-red-600">*</span>}
            </label>
          )}
          <div
            className={`${containerClassName} relative w-full overflow-hidden`}
          >
            {icon && (
              <span className="pointer-events-none absolute left-4 top-2 pt-0.5 text-lg font-bold text-gray-400 z-10">
                {icon}
              </span>
            )}
            <StyledSelect
              id={name}
              name={name}
              className="w-full"
              $isIcon={!!icon}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              if (onChange) onChange(e);
              }}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </StyledSelect>
            <span className="pointer-events-none absolute right-5 top-3 text-sm font-bold text-gray-400">
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </div>
        </div>
      );
    case "no-style-dropdown":
      return (
        <div className={`${containerClassName}`}>
          {label && (
            <label htmlFor={id ? id : name} className={`${labelClassName}`}>
              {label} {required && <span className="text-red-600">*</span>}
            </label>
          )}
          <div
            className={`${containerClassName} relative w-full overflow-hidden`}
          >
            {icon && (
              <span className="pointer-events-none absolute left-4 top-2 pt-0.5 text-lg font-bold text-gray-400 z-10">
                {icon}
              </span>
            )}
            <NoStyleSelect
              id={name}
              name={name}
              className="w-full"
              $isIcon={!!icon}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </NoStyleSelect>
            <span className="pointer-events-none absolute right-5 top-3 text-sm font-bold text-gray-400">
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </div>
        </div>
      );
    default:
      return (
        <div className={`${containerClassName}`}>
          {label && (
            <label htmlFor={id ? id : name} className={`${labelClassName}`}>
              {label} {required && <span className="text-red-600">*</span>}
            </label>
          )}
          <PrimaryStyleInput
            id={id ? id : name}
            type={type ? type : "text"}
            required={required ? required : false}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={` ${inputClassName}`}
          />
        </div>
      );
  }
};

export default Input;

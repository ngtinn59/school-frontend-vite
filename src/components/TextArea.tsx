import styled from "styled-components";
import { COLOR_PRIMARY } from "../utils/constants";

type Props = {
  placeholder?: string;
  name: string;
  required?: boolean | undefined;
  label?: string;
  id?: string;
  value?: string | undefined;
  rows?: number;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const textareaStyle = `
padding: 0.75rem;
border-radius: 0.375rem;
outline: none;
color: #000;
background-color: #fff;
`;

const primaryTextareaStyle = `--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
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

const PrimaryTextAreaStyle = styled.textarea`
  ${textareaStyle}
  ${primaryTextareaStyle}
`;
export default function TextArea({
  placeholder,
  required,
  name,
  onChange,
  label,
  id,
  value,
  rows,
  containerClassName,
  inputClassName,
  labelClassName,
}: Props) {
  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label htmlFor={id ? id : name} className={`${labelClassName}`}>
          {label} {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <PrimaryTextAreaStyle
        id={id ? id : name}
        required={required ? required : false}
        name={name}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={` ${inputClassName}`}
      />
    </div>
  );
}

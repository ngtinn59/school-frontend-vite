import React from "react";

interface RadioOption {
  label: React.ReactNode;
  value: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
  itemClassName?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  className,
  itemClassName,
}) => {
  return (
    <div className={`radio-group ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`radio-option flex items-center space-x-2 ${itemClassName}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="self-center">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;

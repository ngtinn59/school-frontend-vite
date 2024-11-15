import { Select } from "antd";

export interface IOption {
  value: number;
  label: string;
}

interface IFilterCustomProps {
  options: IOption[];
  placeholder: string;
  title: string;
  icon?: React.ReactNode;
  select: number;
  setSelect: (value: number) => void;
}

const FilterCustom: React.FC<IFilterCustomProps> = ({
  options,
  placeholder,
  title,
  icon,
  select,
  setSelect,
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-1/6">
      <div className="flex gap-1 items-center mb-1">
        <span className="text-lg">{icon ? icon : ""}</span>
        <span>
          <strong>{title}</strong>
        </span>
      </div>
      <Select
        onSelect={(value: number) => setSelect(value)}
        defaultValue={select ? select : undefined}
        value={select ? select : undefined}
        size="large"
        options={options}
        placeholder={placeholder}
        className="h-full"
      />
    </div>
  );
};

export default FilterCustom;

interface Props {
  isOn?: boolean;
  name: string;
  onToggle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Switch: React.FC<Props> = ({ isOn, onToggle, className, name }) => {
  return (
    <label className={`switch ${className}`}>
      <input type="checkbox" checked={isOn} name={name} onChange={onToggle} />
      <span className="slider"></span>
    </label>
  );
};

export default Switch;

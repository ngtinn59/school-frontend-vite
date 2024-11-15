import { LeftOutlined } from "@ant-design/icons";
import { RightOutlined } from "@ant-design/icons";

interface CustomArrowProps {
  direction: "left" | "right";
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const CustomArrow: React.FC<CustomArrowProps> = ({ direction, ...props }) => {
  const { className, style, onClick } = props;

  return (
    <div
      style={direction === "left" ? { ...style, color: "transparent", left: "-15px", zIndex: 1 } : { ...style, color: "transparent", right: "0px", zIndex: 1 }}
      className={className}
      onClick={onClick}
    >
      {direction === "left" ? (
        <LeftOutlined className="z-10 rounded-full bg-slate-300 bg-opacity-100 p-2 text-base text-black transition-all duration-200 hover:bg-white hover:shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]" />
      ) : (
        <RightOutlined className="z-10 rounded-full bg-slate-300 bg-opacity-100 p-2 text-base text-black transition-all duration-200 hover:bg-white hover:shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]" />
      )}
    </div>
  );
};

export default CustomArrow;

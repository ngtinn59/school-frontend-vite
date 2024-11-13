import { Spin } from "antd";

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Spin size="large" />
      {message && <span className="mt-4 text-lg">{message}</span>}
    </div>
  );
};

export default Loading;

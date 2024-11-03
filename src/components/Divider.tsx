type Props = {
  className?: string;
};

export default function Divider({ className }: Props) {
  return (
    <div
      className={`border-b-2 border-solid border-b-gray-200 w-full my-4 px-4 ${className}`}
    ></div>
  );
}

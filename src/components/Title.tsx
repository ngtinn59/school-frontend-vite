type Props = { type: string; children: string; className?: string };

export default function Title({ type, children, className }: Props) {
  switch (type) {
    case "h1":
      return <h1 className={`text-4xl font-bold  ${className}`}>{children}</h1>;
    case "h2":
      return (
        <h2 className={`text-3xl font-bold   ${className}`}>{children}</h2>
      );
    case "h3":
      return (
        <h3 className={`text-2xl font-bold   ${className}`}>{children}</h3>
      );
    case "h4":
      return <h4 className={`text-xl font-bold   ${className}`}>{children}</h4>;
    default:
      return <h5 className={`text-lg font-bold   ${className}`}>{children}</h5>;
  }
}

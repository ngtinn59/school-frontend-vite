import React from "react";
import Card from "../../components/Card";
import Divider from "../../components/Divider";
import Title from "../../components/Title";

type Props = {
  children?: React.ReactNode;
  title: string;
  titleType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  description: string;
  icon: string;
};

export default function CardWithTitle({
  children,
  title,
  titleType = "h3",
  className,
  description,
  icon,
}: Props) {
  return (
    <Card
      className={`${
        className ? className : ""
      } flex flex-row gap-2 justify-center !py-6 relative bg-white h-fit`}
    >
      <div className="flex-1 flex flex-col gap-2">
        <Title type={titleType} className="capitalize">
          {title}
        </Title>

        {children ? (
          <>
            <Divider />
            {children}
          </>
        ) : (
          <span className="font-semibold text-gray-400 text-base sm:line-clamp-3 line-clamp-2">
            {description}
          </span>
        )}
      </div>
      {!children && (
        <div className="max-h-[114px] sm:block hidden">
          <img src={icon} alt="Add more content" className="h-full" />
        </div>
      )}

      {/* <EditIcon className="absolute top-4 right-8 text-lg " /> */}
    </Card>
  );
}

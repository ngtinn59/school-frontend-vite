import Title from "../../../../components/Title";

type Props = {
  aboutMe: string;
  templateColor: string;
};

export default function AboutMeSection({ aboutMe, templateColor }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <Title type="h6" className={`font-medium text-[${templateColor}]`}>
        ABOUT ME
      </Title>
      <div>
        <p className="text-base">{aboutMe}</p>
      </div>
    </div>
  );
}

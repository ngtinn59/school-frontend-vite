import Button from "../../../../components/Button";
import Title from "../../../../components/Title";
import { SkillType } from "../../../../utils/type";

type Props = {
  skills: SkillType;
  templateColor: string;
};

export default function SkillSection({ skills, templateColor }: Props) {
  return (
    <div className=" col-span-10 text-sm gap-1.5">
      <Title type="h6" className={`font-medium text-[${templateColor}]`}>
        SKILLS
      </Title>
      <div className="flex flex-col gap-2 col-span-10 ">
        {skills.excellent && (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-bold">Excellent</span>
            <div className="flex flex-row gap-2 flex-wrap w-fit">
              {skills.excellent.map((skill, index) => (
                <Button
                  buttonType="disabled"
                  className="rounded-sm  px-2 w-fit block text-sm py-1 font-normal !bg-gray-300"
                  textColor="rgb(107,114,128)"
                  key={index}
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        )}
        {skills.intermediate && (
          <div className="flex flex-col  gap-1 ">
            <span className="text-sm font-bold text-bold">Intermediate</span>

            <div className="flex flex-row gap-3 w-full flex-wrap">
              {skills.intermediate.map((skill, index) => (
                <Button
                  buttonType="disabled"
                  className="rounded-sm  px-2 w-fit block text-sm py-1 font-normal"
                  textColor="rgb(107,114,128)"
                  key={index}
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        )}
        {skills.beginner && (
          <div className="flex flex-col  gap-1 ">
            <span className="text-sm font-bold text-bold">Beginner</span>

            <div className="flex flex-row gap-3 w-full flex-wrap">
              {skills.beginner.map((skill, index) => (
                <Button
                  buttonType="disabled"
                  className="rounded-sm  px-2 w-fit block text-sm py-1 font-normal !bg-gray-100"
                  textColor="rgb(107,114,128)"
                  key={index}
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import Button from "../../../../components/Button";
import { SkillType } from "../../../../utils/type";

type Props = {
  skills: SkillType;
};
export default function SkillSection({ skills }: Props) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <p className="text-bold text-center md:text-start font-bold col-span-2 !text-base">
        Skills
      </p>
      <div className="flex flex-col gap-4 col-span-10">
        {skills.excellent && (
          <div className="flex flex-row items-center gap-3">
            <span className="text-base font-bold text-bold">Excellent</span>
            <div className="flex flex-row gap-2 flex-wrap w-fit">
              {skills.excellent.map((skill: string, index: number) => (
                <Button
                  buttonType="disabled"
                  className="rounded-lg  px-2 w-fit block text-base "
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
          <div className="flex flex-row items-center gap-3 ">
            <span className="text-base font-bold text-bold">Intermediate</span>

            <div className="flex flex-row gap-3 w-full flex-wrap">
              {skills.intermediate.map((skill: string, index: number) => (
                <Button
                  buttonType="disabled"
                  className="rounded-lg px-2 block text-base bg-gray-100 flex-wrap "
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
          <div className="flex flex-row items-center gap-3 ">
            <span className="text-base font-bold text-bold">Beginner</span>

            <div className="flex flex-row gap-3 w-full flex-wrap">
              {skills.beginner.map((skill: string, index: number) => (
                <Button
                  buttonType="disabled"
                  className="rounded-lg px-2 block text-base bg-gray-100 flex-wrap "
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

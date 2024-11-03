import Button from "../../../components/Button";
import Title from "../../../components/Title";
import Tooltip from "../../../components/Tooltip";
import { SkillType } from "../../../utils/type";

type Props = {
  skills: SkillType;
  type?: string;
};

export default function SkillsWrapper({ skills, type }: Props) {
  const { excellent, intermediate, beginner } = skills;
  switch (type) {
    default:
      return (
        <div className="flex flex-col gap-4">
          {excellent && (
            <div className="flex flex-col ">
              <div className="flex flex-row flex-nowrap gap-2 pb-2">
                <Title type="h5" className=" text-bold">
                  Excellent
                </Title>
                <Tooltip text="More than 3 years of experience" />
              </div>
              <div className="flex flex-row gap-3 ">
                {excellent.map((skill, index) => (
                  <Button
                    buttonType="disabled"
                    className="rounded-2xl  py-1 px-3 text-base bg-gray-100 hover:bg-primary hover:text-white "
                    textColor="rgb(107,114,128)"
                    key={index}
                  >
                    <span className="pr-2">{skill}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
          {intermediate && (
            <div className="flex flex-col">
              <div className="flex flex-row flex-nowrap gap-2 pb-2">
                <Title type="h5" className=" text-bold">
                  Intermediate
                </Title>
                <Tooltip text="1-3 years of experience" />
              </div>
              <div className="flex flex-row gap-3 ">
                {intermediate.map((skill, index) => (
                  <Button
                    buttonType="disabled"
                    className="rounded-2xl  py-1 px-3 text-base bg-gray-100 hover:bg-primary hover:text-white "
                    textColor="rgb(107,114,128)"
                    key={index}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {beginner && (
            <div className="flex flex-col">
              <div className="flex flex-row flex-nowrap gap-2 pb-2">
                <Title type="h5" className=" text-bold">
                  Beginner
                </Title>
                <Tooltip text="Less than 1 year of experience" />
              </div>
              <div className="flex flex-row gap-3 ">
                {beginner.map((skill, index) => (
                  <Button
                    buttonType="disabled"
                    className="rounded-2xl  py-1 px-3 text-base bg-gray-100 hover:bg-primary hover:text-white "
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
      );
  }
}

import Divider from "../../../../components/Divider";
import Title from "../../../../components/Title";
import { WorkExperienceType } from "../../../../utils/type";

type Props = {
  workExperience: WorkExperienceType[];
  templateColor: string;
};

export default function WorkExperienceSection({
  workExperience,
  templateColor,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <Title type="h6" className={`font-medium text-[${templateColor}]`}>
        WORK EXPERIENCE
      </Title>
      <div className="text-bold flex flex-col gap-2 text-sm">
        {workExperience.map((experience, index) => (
          <div
            className="flex flex-col gap-2 flex-nowrap"
            key={`work-exp-${index}`}
          >
            <div className="flex flex-col  flex-nowrap">
              <div className="text-sm  text-bold ">
                {experience.start_date} - {experience.end_date}
              </div>
              <Divider className="!my-1" />
              <div className="flex flex-row">
                <div className="text-sm  text-bold font-bold">
                  {experience.position} |{" "}
                  <span className="font-normal">{experience.company}</span>
                </div>
              </div>
            </div>

            <div
              className=" text-sm text-bold ml-2 "
              dangerouslySetInnerHTML={{
                __html: experience.responsibilities,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

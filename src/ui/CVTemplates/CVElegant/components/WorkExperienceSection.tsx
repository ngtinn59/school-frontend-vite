import { WorkExperienceType } from "../../../../utils/type";

type Props = {
  workExperience: WorkExperienceType[];
  //   templateColor: string;
};
export default function WorkExperienceSection({ workExperience }: Props) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <p className="text-bold text-center md:text-start font-bold col-span-2 !text-base">
        Work Experience
      </p>
      <div className="text-bold col-span-10 text-base">
        {workExperience.map((experience, index) => (
          <div
            className="flex flex-col gap-2 flex-nowrap"
            key={"work-experience-" + index}
          >
            <div className="flex flex-col  flex-nowrap">
              <div className="text-base  text-bold ">
                {experience.start_date} - {experience.end_date}
              </div>
              <div className="flex flex-row gap-2  flex-nowrap font-bold">
                <div className="text-base  text-bold">
                  {experience.position}
                </div>

                <span>|</span>
                <p className="text-bold text-base ">{experience.company}</p>
              </div>
            </div>

            <div
              className=" text-base text-bold "
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

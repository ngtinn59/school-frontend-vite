import Divider from "../../../../components/Divider";
import { EducationType } from "../../../../utils/type";

type Props = {
  education: EducationType[];
  templateColor: string;
};

export default function EducationSection({ education, templateColor }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-3">
        <span
          className={`bg-red w-3 h-3 block bg-cv_color_red rotate-45 bg-[${templateColor}]`}
        ></span>
        <p
          className={`text-cv_color_red text-[${templateColor}] text-center md:text-start font-bold  !text-lg uppercase tracking-wide  `}
        >
          EDUCATION
        </p>
      </div>
      <Divider className="ml-6 !my-2" />

      <div className="flex flex-col  text-base">
        {education.map((deg, index) => (
          <div className="grid grid-cols-12 gap-3" key={"education-" + index}>
            {/* time */}
            <div className="col-span-3 flex flex-row items-center gap-3 h-fit">
              <span
                className={`bg-red w-2 h-2 block bg-normal rotate-45 bg-[${templateColor}]`}
              ></span>
              <div className="text-base  text-bold">
                <span>{deg.start_date}</span> <span> - </span>
                <span>{deg.end_date}</span>
              </div>
            </div>

            <div className="col-span-9 flex flex-col gap-2">
              <div className=" flex flex-col  flex-nowrap">
                <div className="text-base  text-bold font-bold">
                  {deg.institution}
                </div>
                <p className="text-bold text-base ">{deg.degree}</p>
              </div>
              <div className=" text-base text-bold ">
                {deg.additionalDetail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

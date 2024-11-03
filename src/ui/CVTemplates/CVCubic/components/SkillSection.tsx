import Button from "../../../../components/Button";
import Divider from "../../../../components/Divider";
import { SkillType } from "../../../../utils/type";

type Props = {
  skills: SkillType;
  templateColor: string;
};

export default function SkillSection({ skills, templateColor }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-3">
        <span
          className={`bg-red w-3 h-3 block bg-cv_color_red rotate-45 bg-[${templateColor}]`}
        ></span>
        <p
          className={`text-cv_color_red text-[${templateColor}] text-center md:text-start font-bold  !text-lg uppercase tracking-wide  `}
        >
          SKILLS
        </p>
      </div>
      <Divider className="ml-6 !my-2" />

      <div className="flex flex-col text-base gap-3">
        {skills.excellent && (
          <div className="grid grid-cols-12 gap-3">
            {/* excellent */}
            <div className="col-span-3 flex flex-row items-center gap-3 h-fit">
              <span
                className={`bg-red w-2 h-2 block bg-normal rotate-45 bg-[${templateColor}]`}
              ></span>
              <div className="text-base  text-bold">Excellent</div>
            </div>

            <div className="col-span-9 flex flex-col gap-2">
              <div className="flex flex-row gap-2 flex-wrap w-fit">
                {skills.excellent.map((skill, index) => (
                  <Button
                    buttonType="disabled"
                    className="border border-solid border-gray-300 !bg-white  px-2 w-fit block text-base "
                    textColor="rgb(107,114,128)"
                    key={index}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        {skills.intermediate && (
          <div className="grid grid-cols-12 gap-3">
            {/* intermediate */}
            <div className="col-span-3 flex flex-row items-center gap-3 h-fit">
              <span
                className={`bg-red w-2 h-2 block bg-normal rotate-45 bg-[${templateColor}]`}
              ></span>
              <div className="text-base  text-bold">Intermediate</div>
            </div>

            <div className="col-span-9 flex flex-col gap-2">
              <div className="flex flex-row gap-2 flex-wrap w-fit">
                {skills.intermediate.map((skill, index) => (
                  <Button
                    buttonType="disabled"
                    className="border border-solid border-gray-300 !bg-white  px-2 w-fit block text-base "
                    textColor="rgb(107,114,128)"
                    key={index}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}{" "}
        {skills.beginner && (
          <div className="grid grid-cols-12 gap-3">
            {/* intermediate */}
            <div className="col-span-3 flex flex-row items-center gap-3 h-fit">
              <span
                className={`bg-red w-2 h-2 block bg-normal rotate-45 bg-[${templateColor}]`}
              ></span>
              <div className="text-base  text-bold">Beginner</div>
            </div>

            <div className="col-span-9 flex flex-col gap-2">
              <div className="flex flex-row gap-2 flex-wrap w-fit">
                {skills.beginner.map((skill, index) => (
                  <Button
                    buttonType="disabled"
                    className="border border-solid border-gray-300 !bg-white  px-2 w-fit block text-base "
                    textColor="rgb(107,114,128)"
                    key={index}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

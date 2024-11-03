import { AwardType } from "../../../../utils/type";

type Props = { awards: AwardType[] };
export default function AwardsSection({ awards }: Props) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <p className="text-bold text-center md:text-start font-bold col-span-2 ">
        Awards
      </p>

      <div className="text-bold col-span-10 text-base">
        {awards.map((award, index) => (
          <div
            className="flex flex-col gap-2 flex-nowrap"
            key={"award-" + index}
          >
            <div className="flex flex-col  flex-nowrap">
              <div className="text-base  text-bold font-bold">
                {award.title}
              </div>
              <div className="flex flex-row gap-2  flex-nowrap">
                <div className="text-base  text-bold">
                  <span>{award.issueDate}</span>
                </div>

                <span>|</span>
                <p className="text-bold text-base ">{award.provider}</p>
              </div>
            </div>
            <div
              className=" text-base text-bold "
              dangerouslySetInnerHTML={{
                __html: award.description,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

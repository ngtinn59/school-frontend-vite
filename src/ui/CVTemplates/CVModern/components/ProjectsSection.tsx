import Divider from "../../../../components/Divider";
import Title from "../../../../components/Title";
import { PersonalProjectType } from "../../../../utils/type";

type Props = {
  personalProjects: PersonalProjectType[];
  templateColor: string;
};

export default function ProjectsSection({
  personalProjects,
  templateColor,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <Title type="h6" className={`font-medium text-[${templateColor}]`}>
        PERSONAL PROJECT
      </Title>
      <div className="text-bold flex flex-col gap-2 text-sm ">
        {personalProjects.map((project, index) => (
          <div className="flex flex-col  flex-nowrap" key={`project-${index}`}>
            <p className="text-bold text-sm ">
              {project.start_date} - {project.end_date}
            </p>
            <Divider className="!my-1" />
            <div className="text-sm  text-bold font-bold">{project.title}</div>

            <div
              className=" text-sm text-bold ml-2"
              dangerouslySetInnerHTML={{
                __html: project.description,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

import Title from "../../../../components/Title";
import { JobType } from "../../../../utils/type";
import Buttons from "../job-info/common/Buttons";

interface JobDescriptionProps {
  jobData: JobType;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ jobData }) => {
  return (
    <div>
      <Title type="h4">Job description</Title>
      <p className="text-justify text-[var(--text-color-normal)]">
        {jobData.description}
      </p>

      <Title type="h4" className="mt-4">
        Job requirements
      </Title>
      <p className="text-justify text-[var(--text-color-normal)]">
        {jobData.skill_experience}
      </p>

      <Title type="h4" className="mt-4">
        Benefits
      </Title>
      <p className="text-justify text-[var(--text-color-normal)]">
        {jobData.benefits}
      </p>

      <div className="mt-4 flex gap-4">
        <Buttons />
      </div>
    </div>
  );
};

export default JobDescription;

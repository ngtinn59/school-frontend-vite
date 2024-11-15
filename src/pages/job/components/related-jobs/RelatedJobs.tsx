import Title from "../../../../components/Title";
import { JobType } from "../../../../utils/type";
import JobsList from "../../common/JobsList";

interface RelatedJobsProps {
  jobs: JobType[];
}

const RelatedJobs: React.FC<RelatedJobsProps> = ({ jobs }) => {
  return (
    <>
      <Title type="h4" className="mt-2">
        {`${jobs.length.toString()} related job(s)`}
      </Title>

      <JobsList
        jobs={jobs}
        classNameResponsive="grid-cols-1 p-0 md:grid-cols-1 lg:grid-cols-1"
      />
    </>
  );
};

export default RelatedJobs;

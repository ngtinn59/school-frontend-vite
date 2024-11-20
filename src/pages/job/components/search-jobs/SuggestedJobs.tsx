import Title from "../../../../components/Title";
import { JobType } from "../../../../utils/type";
import JobsList from "../../common/JobsList";

interface SuggestedJobsProps {
  jobs: JobType[];
}

const SuggestedJobs: React.FC<SuggestedJobsProps> = ({ jobs }) => {
  return (
    <>
      <Title type="h4">{`${jobs.length.toString()} suggested job(s)`}</Title>

      <JobsList
        jobs={jobs}
        classNameResponsive="grid-cols-1 p-0 md:grid-cols-1 lg:grid-cols-1"
      />
    </>
  );
};

export default SuggestedJobs;

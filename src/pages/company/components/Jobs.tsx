import Title from "../../../components/Title";
import { CompanyDetailType } from "../../../utils/type";
import Job from "./Job";

interface JobsProps {
  data: CompanyDetailType;
}

const Jobs: React.FC<JobsProps> = ({ data }) => {
  return (
    <>
      {data.jobs.length > 0 && (
        <>
          <Title type="h4" className="mt-4 text-blue-900">
            Việc làm đang tuyển
          </Title>

          <div className="mt-2 space-y-4">
            {data.jobs.map((job) => (
              <Job company={data} job={job} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Jobs;

import { CompanyType, JobType } from "../../../../utils/type";
import Company from "./components/Company";
import JobRequirements from "./components/JobRequirements";

interface JobInfoProps {
  jobData: JobType;
  companyData: CompanyType;
}

const JobInfo: React.FC<JobInfoProps> = ({ jobData, companyData }) => {
  return (
    <div>
      <Company companyData={companyData} />
      <JobRequirements jobData={jobData} />
    </div>
  );
};

export default JobInfo;

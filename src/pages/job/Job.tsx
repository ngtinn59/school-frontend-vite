import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { getJobDetail } from "../../services/job/jobs-service";
import { CompanyType, JobType } from "../../utils/type";
import ContactInfo from "./components/contact-info/ContactInfo";
import JobDescription from "./components/job-description/JobDescription";
import JobInfo from "./components/job-info/JobInfo";
import RelatedJobs from "./components/related-jobs/RelatedJobs";

const Job: React.FC = () => {
  const jobTitleAndId = useParams<{
    jobTitleAndId: string;
  }>().jobTitleAndId?.split("-");
  const jobId = jobTitleAndId?.[jobTitleAndId.length - 1];

  const { data: jobInfo } = useQuery({
    queryKey: ["jobInfomation", jobId],
    queryFn: () => getJobDetail(jobId),
    select: (jobDetailData) => jobDetailData.data,
  });

  if (!jobInfo) {
    return <Loading />;
  }

  const companyData: CompanyType = jobInfo.company;
  const jobData: JobType = jobInfo.job;
  const relatedJobs: JobType[] = jobInfo.related_jobs;

  return (
    <div className="mx-auto mt-2 flex max-w-screen-md flex-col gap-4 px-2 transition-all duration-1000 md:flex-row xl:max-w-screen-lg">
      <div className="w-full space-y-4 md:w-[60%]">
        <div className="rounded-md bg-white p-4 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]">
          <JobInfo jobData={jobData} companyData={companyData} />
        </div>

        <div className="rounded-md bg-white p-4 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]">
          <JobDescription jobData={jobData} />
        </div>

        <div className="rounded-md bg-white p-4 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]">
          <ContactInfo jobData={jobData} />
        </div>
      </div>

      <div className="w-full md:w-[40%]">
        <RelatedJobs jobs={relatedJobs} />
      </div>
    </div>
  );
};

export default Job;

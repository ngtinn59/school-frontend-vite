import { IoIosTime } from "react-icons/io";

import { useQuery } from "@tanstack/react-query";
import Title from "../../../components/Title";
import Wrapper from "../../../components/Wrapper";
import { getUrgentJobs } from "../../../services/job/jobs-service";
import JobsList from "../../job/common/JobsList";

const UrgentJobs: React.FC = () => {
  const { data: urgentJobs } = useQuery({
    queryKey: ["urgentJobs"],
    queryFn: () => getUrgentJobs(),
    select: (urgentJobsData) => urgentJobsData.data.urgent_jobs,
  });

  return (
    <>
      {urgentJobs && (
        <section>
          <section>
            <Wrapper>
              <div className="mx-auto overflow-hidden rounded-md bg-white shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)] md:w-[90%]">
                <div className="flex items-center space-x-2 bg-[var(--color-primary)] p-2">
                  <IoIosTime className="text-4xl text-white" />
                  <Title type="h3" className="text-center text-white">
                    Urgent Jobs
                  </Title>
                </div>

                <JobsList
                  jobs={urgentJobs}
                  classNameResponsive="grid-cols-1
md:grid-cols-2 lg:grid-cols-3"
                />
              </div>
            </Wrapper>
          </section>
        </section>
      )}
    </>
  );
};

export default UrgentJobs;

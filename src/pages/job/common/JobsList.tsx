import { useState } from "react";
import { JobType } from "../../../utils/type";
import Job from "../../home/components/Job";
import { Pagination } from "antd";

interface JobsListProps {
  jobs: JobType[];
  classNameResponsive: string;
}

const JobsList: React.FC<JobsListProps> = ({ jobs, classNameResponsive }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  return (
    <>
      <div className={`${classNameResponsive} grid gap-4 p-2`}>
        {jobs.map((job: JobType, index: number) => (
          <>
            {index < currentPage * pageSize &&
              index >= (currentPage - 1) * pageSize && (
                <Job key={index} job={job} />
              )}
          </>
        ))}
      </div>
      <Pagination
        className="mb-2 mt-4"
        align="center"
        defaultCurrent={1}
        hideOnSinglePage
        pageSize={pageSize}
        current={currentPage}
        onChange={(page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize);
        }}
        total={jobs.length}
        showTotal={(total) => `Total ${total} jobs`}
      />{" "}
    </>
  );
};

export default JobsList;

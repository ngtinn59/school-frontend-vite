import { FaFire, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";

import { CompanyDetailType, JobType } from "../../../utils/type";
import { useNavigate } from "react-router-dom";
import { changeSalary } from "../../../hooks";

interface JobProps {
  company: CompanyDetailType;
  job: JobType;
}

const Job: React.FC<JobProps> = ({ company, job }) => {
  const navigate = useNavigate();

  function handleClickedJob(job: JobType) {
    const jobTitle = job.title.replace(/\s/g, "-");
    navigate(`/job/${jobTitle}-${job.id}`);
  }

  return (
    <>
      <div
        key={job.id}
        className="cursor-pointer rounded-md p-2 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]"
        onClick={() => handleClickedJob(job)}
      >
        <div className="flex justify-between">
          <div className="flex gap-2">
            <img
              src={company.logo}
              alt={company.name}
              className="h-10 rounded-md border"
            />

            <div>
              <p className="text-[var(--color-primary)]">{job.title}</p>
              <p className="text-xs text-gray-700">{company.name}</p>
            </div>
          </div>

          <div>
            {job.is_hot == 1 && (
              <p className="flex items-center justify-end gap-2 text-nowrap text-sm text-red-500">
                Hot
                <FaFire />
              </p>
            )}
            {job.featured == 1 && (
              <p className="flex items-center justify-end gap-2 text-sm text-yellow-500">
                Featured
                <FaStar />
              </p>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center space-x-4">
          <p className="flex items-center text-sm">
            <MdAttachMoney className="text-green-800" />
            {changeSalary(job.salary.salary_from)} -{" "}
            {changeSalary(job.salary.salary_to)}
          </p>

          <p className="flex items-center text-sm">
            <FaMapMarkerAlt className="text-red-500" />
            {job.city.name}
          </p>

          <p className="flex items-center text-sm">
            <IoCalendarOutline className="text-blue-800" />
            {job.last_date}
          </p>
        </div>
      </div>
    </>
  );
};

export default Job;

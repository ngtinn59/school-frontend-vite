import { FaEye } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import Title from "../../../../../components/Title";
import { changeSalary } from "../../../../../hooks";
import { JobType } from "../../../../../utils/type";
import Buttons from "../common/Buttons";

interface JobRequirementsProps {
  jobData: JobType;
}

const JobRequirements: React.FC<JobRequirementsProps> = ({ jobData }) => {
  return (
    <div className="mt-4">
      <Title type="h4">{jobData.title}</Title>

      <div className="flex justify-between">
        <p className="flex items-center gap-1 text-sm text-[var(--text-color-normal)]">
          <IoIosTime />
          Apply before:{" "}
          {new Date(jobData.last_date).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </p>

        <p className="flex items-center gap-1 text-sm text-[var(--text-color-normal)]">
          <FaEye />
          View: {jobData.views}
        </p>

        <p className="flex items-center gap-1 text-sm text-[var(--text-color-normal)]">
          <IoCalendarOutline />
          Created at:{" "}
          {jobData.created_at &&
            new Date(jobData.created_at).toLocaleDateString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
        </p>
      </div>

      <div className="mt-4 flex gap-4">
        <Buttons />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
        <div className="px-1">
          <p className="text-sm text-[var(--text-color-normal)]">
            Experience Level
          </p>
          <p>{jobData.experienceLevel?.name}</p>
        </div>

        <div className="px-1">
          <p className="text-sm text-[var(--text-color-normal)]">Salary</p>
          <p>
            {jobData.salary?.salary_from &&
              changeSalary(jobData.salary?.salary_from)}{" "}
            -{" "}
            {jobData.salary?.salary_to &&
              changeSalary(jobData.salary?.salary_to)}
          </p>
        </div>

        <div className="px-1">
          <p className="text-sm text-[var(--text-color-normal)]">
            Desired Level
          </p>
          <p>{jobData.desiredLevel?.name}</p>
        </div>

        <div className="px-1">
          <p className="text-sm text-[var(--text-color-normal)]">
            Employment Type
          </p>
          <p>{jobData.employmentType?.name}</p>
        </div>
      </div>

      <div className="mt-4">
        <Title type="h4">Infomation</Title>

        <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-3">
          <div className="px-1">
            <p className="text-sm text-[var(--text-color-normal)]">
              Profession
            </p>
            <p>{jobData.profession?.name}</p>
          </div>

          <div className="px-1">
            <p className="text-sm text-[var(--text-color-normal)]">Workplace</p>
            <p>{jobData.workPlace?.name}</p>
          </div>

          <div className="px-1">
            <p className="text-sm text-[var(--text-color-normal)]">
              Education Level
            </p>
            <p>{jobData.educationLevel?.name}</p>
          </div>

          <div className="px-1">
            <p className="text-sm text-[var(--text-color-normal)]">
              Hiring Number
            </p>
            <p>{jobData.quantity}</p>
          </div>

          <div className="px-1">
            <p className="text-sm text-[var(--text-color-normal)]">
              Hiring Area
            </p>
            <p>{jobData.city.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRequirements;

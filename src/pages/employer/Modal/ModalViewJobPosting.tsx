import { Modal, Tag } from "antd";
import { useEffect, useState } from "react";
import { initialJobPosting, JobPosting } from "./ModalCreateEditJobPosting";
import { getPostJob } from "../../../services/api/employer/managePostJob";
import { formatCurrencyVND } from "../../../utils/function/formatCurrency";

interface ModalViewJobPostingProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number | null;
}

const ModalViewJobPosting: React.FC<ModalViewJobPostingProps> = ({
  id,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [job, setJob] = useState<JobPosting>(initialJobPosting);

  useEffect(() => {
    if (!id && job.id === 0) setLoading(true);
  }, [id, job]);

  const fetchJob = async () => {
    setLoading(true);
    const res = await getPostJob(id!);
    try {
      if (res && res.success) {
        setJob(res.data);
      }
    } catch (error) {
      setJob(initialJobPosting);
      console.error("Error fetching job posting", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal
        width={1200}
        loading={loading}
        title={`View Job Posting ${job.id === 0 ? "" : `#${job.title}`}`}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        okButtonProps={{ hidden: true }}
        onCancel={() => setIsModalOpen(false)}
        afterOpenChange={(open) => {
          if (open) fetchJob();
          if (!open) {
            setJob(initialJobPosting);
          }
        }}
      >
        {/* Display job posting details */}
        {job.id && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {job.title || "Job Posting Details"}
            </h2>
            <Tag color={job.featured === 1 ? "red" : "green"}>
              {job.featured === 1 ? "Hiring Urgently" : "Hiring"}
            </Tag>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-600">Job ID:</h3>
                <p className="text-gray-700">{job.id}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Profession:</h3>
                <p className="text-gray-700">{job?.profession?.name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Desired Level:</h3>
                <p className="text-gray-700">{job.desiredLevel.name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Workplace:</h3>
                <p className="text-gray-700">{job.workPlace.name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">
                  Employment Type:
                </h3>
                <p className="text-gray-700">{job.employmentType.name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Quantity:</h3>
                <p className="text-gray-700">{job.quantity}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Salary:</h3>
                <p className="text-gray-700">
                  {formatCurrencyVND(job.salary_from)} -{" "}
                  {formatCurrencyVND(job.salary_to)}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">
                  Education Level:
                </h3>
                <p className="text-gray-700">{job.educationLevel.name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">
                  Application Deadline:
                </h3>
                <p className="text-gray-700">
                  {new Date(job.last_date).toLocaleDateString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Work Address:</h3>
                <p className="text-gray-700">{job.work_address}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Location:</h3>
                <p className="text-gray-700">
                  {job.city.name}, {job.district.name}, {job.country.name}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-600">Contact:</h3>
                <p className="text-gray-700">
                  {job.contact_name} - {job.phone} - {job.email}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-600">Job Description:</h3>
              <p className="text-gray-700">{job.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-600">
                Required Experience:
              </h3>
              <p className="text-gray-700">{job.skill_experience}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-600">Benefits:</h3>
              <p className="text-gray-700">{job.benefits}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalViewJobPosting;

import { faChevronRight, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../components/Title";

type Props = {
  title: string;
  skills?: string[];
  location?: string;
  jobsCount?: number;
  className?: string;
};

export default function CompanyCard({
  title,
  skills,
  location,
  jobsCount,
  className,
}: Props) {
  return (
    <div
      className={`relative flex flex-col items-center  gap-8 pt-8 max-w-md border border-solid border-gray-300 rounded-lg ${className}`}
    >
      <img
        src="../src/assets/employer-card-background.svg "
        className="z-0 absolute top-0 right-0 left-0"
      ></img>
      <div className=" flex flex-col items-center  justify-start gap-8 cursor-pointer flex-1 ">
        <div className="bg-white shadow-md w-40 h-40 grid mx-auto  relative">
          <img
            src="https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM3d3REE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--61527e04af1870bf7e9858df649b2a613e1fad9b/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RW5KbGMybDZaVjkwYjE5bWFYUmJCMmtCcWpBPSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--79eee5883893a012786006950460867831e6f661/lg-development-center-vietnam-logo.png"
            className="m-auto z-10"
          />
        </div>
        <Title type="h4" className="text-center px-3 flex-1">
          {title}
        </Title>
        <div className="flex flex-row flex-wrap gap-3 px-4 justify-center">
          {skills &&
            skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 rounded-xl px-3 py-1 font-semibold text-gray-700"
              >
                {skill}
              </span>
            ))}
        </div>
      </div>
      <div className="bg-gray-100 min-h-14 w-full flex justify-between items-center px-4 py-4 cursor-pointer ">
        <span className="font-semibold text-gray-700 text-base">
          {location}
        </span>
        <span>
          {jobsCount && jobsCount != 0 && (
            <span className="text-green-500 border">
              <FontAwesomeIcon icon={faDotCircle} />
            </span>
          )}
          <span className="font-semibold text-gray-900 text-lg px-2">
            {jobsCount && jobsCount != 0 ? jobsCount + " jobs" : "View company"}
          </span>
          <span className="font-semibold text-gray-900 text-sm ">
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </span>
      </div>
    </div>
  );
}

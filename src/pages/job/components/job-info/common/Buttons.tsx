import { FaShare } from "react-icons/fa";
import { useParams } from "react-router-dom";

import ApplyButton from "./buttons/ApplyButton";
import SaveButton from "./buttons/SaveButton";

const Buttons: React.FC = () => {
  const jobTitleAndId = useParams<{
    jobTitleAndId: string;
  }>().jobTitleAndId?.split("-");
  const jobId = jobTitleAndId?.[jobTitleAndId.length - 1];

  return (
    <>
      <ApplyButton jobId={jobId} />

      <SaveButton jobId={jobId} />

      <button className="flex items-center gap-1 rounded-md border border-[var(--color-primary)] px-4 py-2 text-[var(--color-primary)]">
        <FaShare />
        Share
      </button>
    </>
  );
};

export default Buttons;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  getJobDetail,
  saveJobApi,
  unSaveJobApi,
} from "../../../../../../services/job/jobs-service";
import toast from "react-hot-toast";

interface SaveButtonProps {
  jobId?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({ jobId }) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data: jobInfo } = useQuery({
    queryKey: ["jobInformation", jobId],
    queryFn: () => getJobDetail(jobId),
    select: (jobDetailData) => jobDetailData.data,
  });

  useEffect(() => {
    if (jobInfo) {
      setIsSaved(jobInfo.is_saved);
    }
  }, [jobInfo]);
  const { mutate: saveJob } = useMutation({
    mutationFn: (jobId: string) => saveJobApi(jobId),
    onSuccess: (data) => {
      toast.success(data.message);
      // setIsSaved(true);
      queryClient.invalidateQueries({
        queryKey: ["jobInformation", jobId],
      });
    },
    onError: () => {
      toast.error("Failed to save job");
    },
  });

  const { mutate: unSaveJob } = useMutation({
    mutationFn: (jobId: string) => unSaveJobApi(jobId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["jobInformation", jobId],
      });
      // setIsSaved(false);
    },
    onError: () => {
      toast.error("Failed to save job");
    },
  });
  function handleSaveJob() {
    if (isSaved) {
      unSaveJob(jobId || "");
    } else {
      saveJob(jobId || "");
    }
  }

  return (
    <button
      className={`flex items-center gap-1 rounded-md border border-[var(--color-primary)] px-4 py-2 ${isSaved ? "bg-[var(--color-primary)] text-white" : "bg-white text-[var(--color-primary)]"}`}
      onClick={handleSaveJob}
    >
      {isSaved ? <FaHeart /> : <FaRegHeart />}
      {isSaved ? "Unsaved" : "Save"}
    </button>
  );
};

export default SaveButton;

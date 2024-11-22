import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegFilePdf } from "react-icons/fa";
import Input from "../../../../../../components/Input";
import Modal from "../../../../../../components/Modal";
import RadioGroup from "../../../../../../components/Radio";
import { getUserCVsApi } from "../../../../../../services/api/cvApi";
import {
  applyJobApi,
  getJobDetail,
} from "../../../../../../services/job/jobs-service";
import { CVType } from "../../../../../../utils/type";

interface ApplyButtonProps {
  jobId?: string;
}

interface ApplyJobArgs {
  jobId?: string;
  formData: FormData;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({ jobId }) => {
  const [selectedCVId, setSelectedCVId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | undefined>();
  const [cvType, setCVType] = useState<string>("");
  const [isApplied, setIsApplied] = useState<boolean>(false);

  const { data: cvList } = useQuery({
    queryKey: ["cvList"],
    queryFn: () => getUserCVsApi(),
    select: (cvData) => cvData.data,
  });

  const { data: jobInfo } = useQuery({
    queryKey: ["jobInformation", jobId],
    queryFn: () => getJobDetail(jobId),
    select: (jobDetailData) => jobDetailData.data,
  });

  useEffect(() => {
    if (jobInfo) {
      setIsApplied(jobInfo.is_applied);
    }
  }, [jobInfo]);

  const { mutate: apply } = useMutation({
    mutationFn: ({ jobId, formData }: ApplyJobArgs) =>
      applyJobApi(jobId || "", formData),
    onSuccess: () => {
      toast.success("Applied successfully");
    },
    onError: () => {
      toast.error("Failed to apply");
    },
  });
  const cvOptions = cvList?.map((cv: CVType) => ({
    label: (
      <div>
        <div className="text-lg font-semibold">{cv.desired_position}</div>
        <div className="flex items-center gap-1 text-sm">
          <FaRegFilePdf className="text-red-500" />
          <span className="italic text-gray-500">{cv.attached_file}</span>
        </div>
      </div>
    ),
    value: cv.id.toString(),
  }));

  function handleClose() {
    setSelectedCVId("");
    setName("");
    setPhone("");
    setEmail("");
    setCVType("");
    setUploadedFile(undefined);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : undefined;
    setUploadedFile(file);
  };

  function handleSave() {
    const formData = new FormData();
    if (cvType === "UPLOAD") {
      formData.append("cv", uploadedFile as File);
    } else if (cvType === "ONLINE") {
      formData.append("selected_cv_id", selectedCVId);
    }
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);

    apply({ jobId, formData });
  }
  return (
    <Modal
      title="Apply"
      width="45%"
      handleSave={handleSave}
      onClose={handleClose}
      buttonContent={isApplied ? "Applied" : "Apply"}
      buttonProps={{
        disabled: isApplied,
      }}
      buttonClassName={`rounded-md cur  px-4 py-2 ${isApplied ? "bg-[var(--color-disable)] text-gray-600 cursor-not-allowed" : "bg-[var(--color-primary)] text-white"}`}
      okText="Apply"
    >
      <form>
        <div className="mb-4">
          <Input
            label="CV Type"
            placeholder="Select CV Type"
            inputGroupType="styled-dropdown"
            name="desired_level"
            value={cvType}
            type="text"
            containerClassName="flex flex-col gap-1 "
            onChange={(e) => setCVType(e.target.value)}
            options={[
              {
                label: "Use online CV",
                value: "ONLINE",
              },
              {
                label: "Upload your own CV",
                value: "UPLOAD",
              },
            ]}
            required
          />
        </div>
        {cvType === "UPLOAD" && (
          <div className="mb-2">
            <div className="relative flex items-center gap-4">
              <button className="cursor-pointer border-none bg-[var(--color-primary)] px-3 py-2 text-base text-[white]">
                <FontAwesomeIcon icon={faArrowUpFromBracket} /> Upload file
              </button>
              <div className="text-base">
                {uploadedFile ? uploadedFile.name : "No file chosen"}
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                id="file"
                name="file"
                className="file-upload absolute left-0 top-0 h-full w-full cursor-pointer overflow-hidden opacity-0"
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}
        {cvType === "ONLINE" && (
          <div className="mb-2">
            <RadioGroup
              name="cv"
              options={cvOptions}
              selectedValue={selectedCVId}
              onChange={(value) => setSelectedCVId(value)}
              itemClassName="p-2 border border-gray-300 border-[1.5px] mb-2"
            />
          </div>
        )}
        <div className="mb-2">
          <Input
            label="Name"
            name="name"
            value={name}
            type="text"
            containerClassName="flex flex-col gap-1"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <Input
            label="Phone"
            name="phone"
            value={phone}
            type="text"
            containerClassName="flex flex-col gap-1"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            label="Email"
            name="Email"
            value={email}
            type="email"
            containerClassName="flex flex-col gap-1"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mt-4 text-gray-500">
          Note: You must provide accurate information so that employer can
          contact you.
        </div>
      </form>
    </Modal>
  );
};

export default ApplyButton;

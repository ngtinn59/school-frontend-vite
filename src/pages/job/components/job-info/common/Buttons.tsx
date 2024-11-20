import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart, FaShare } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import Input from "../../../../../components/Input";
import Modal from "../../../../../components/Modal";
import RadioGroup from "../../../../../components/Radio";
import { getUserCVsApi } from "../../../../../services/api/cvApi";
import { applyJobApi } from "../../../../../services/job/jobs-service";
import { CVType } from "../../../../../utils/type";

interface ApplyJobArgs {
  jobId: number;
  formData: FormData;
}

const Buttons: React.FC = () => {
  const jobTitleAndId = useParams<{
    jobTitleAndId: string;
  }>().jobTitleAndId?.split("-");
  const jobId = Number(jobTitleAndId?.[jobTitleAndId.length - 1]);
  const [selectedCVId, setSelectedCVId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { data: cvList } = useQuery({
    queryKey: ["cvList"],
    queryFn: () => getUserCVsApi(),
    select: (cvData) => cvData.data,
  });

  const { mutate: apply } = useMutation({
    mutationFn: ({ jobId, formData }: ApplyJobArgs) =>
      applyJobApi(jobId, formData),
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
  }

  function handleSave() {
    const formData = new FormData();

    formData.append("selected_cv_id", selectedCVId);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);

    apply({ jobId, formData });
  }

  return (
    <>
      <Modal
        title="Apply"
        width="45%"
        handleSave={handleSave}
        onClose={handleClose}
        buttonContent="Apply"
        buttonClassName="rounded-md bg-[var(--color-primary)] px-4 py-2 text-white"
        okText="Apply"
      >
        <form>
          <div className="mb-2">
            <RadioGroup
              name="cv"
              options={cvOptions}
              selectedValue={selectedCVId}
              onChange={(value) => setSelectedCVId(value)}
              itemClassName="p-2 border border-gray-300 border-[1.5px] mb-2"
            />
          </div>
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

      <button className="flex items-center gap-1 rounded-md border border-[var(--color-primary)] px-4 py-2 text-[var(--color-primary)]">
        <FaHeart />
        <FaRegHeart />
        Save
      </button>

      <button className="flex items-center gap-1 rounded-md border border-[var(--color-primary)] px-4 py-2 text-[var(--color-primary)]">
        <FaShare />
        Share
      </button>
    </>
  );
};

export default Buttons;

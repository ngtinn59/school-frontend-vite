import CardWithTitle from "../../../ui/Card/CardWithTitle";
import { PROFILE_DATA_CATEGORY } from "../../../utils/constants";
import { CertificateType } from "../../../utils/type";
import profile_certificates from "../../../assets/profile_certificates.svg";
import CertificateWrapper from "./CertificateWrapper";
import Modal from "../../../components/Modal";
import PlusIcon from "../../../components/PlusIcon";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCertificateApi } from "../../../services/api/profileApi";
import toast from "react-hot-toast";
import { addCertificate } from "../../../services/redux/user";

type Props = { certificateList: CertificateType[] };

const initialCertificate: CertificateType = {
  title: "",
  issueDate: "",
  provider: "",
  description: "",
  id: "",
  certificateUrl: "",
};

export default function Certificate({ certificateList }: Props) {
  const [newCertificate, setNewCertificate] = useState<CertificateType>(initialCertificate);
  const dispatch = useDispatch();
  function handleChangeCertificate(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setNewCertificate({ ...newCertificate, [name]: value });
  }
  function handleSaveCertificate() {
    addCertificateApi(newCertificate)
      .then((res) => {
        if (res.status_code === 200 || res.success) {
          // Update redux store
          dispatch(addCertificate({ ...newCertificate, id: res.data.id }));
          toast.success(res.message);
          // Clear form
          setNewCertificate(initialCertificate);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
  return (
    <CardWithTitle
      title={PROFILE_DATA_CATEGORY.certificates.title}
      titleType="h3"
      description={PROFILE_DATA_CATEGORY.certificates.description}
      icon={profile_certificates}>
      <Modal
        title={PROFILE_DATA_CATEGORY.certificates.title}
        handleSave={handleSaveCertificate}
        buttonContent={<PlusIcon className="text-lg  mx-2" />}
        buttonClassName="absolute right-4 top-4 !p-2 ">
        <div>
          <div className="container mx-auto">
            <form>
              <div className="mt-4">
                <Input
                  label="Certificate name"
                  placeholder="Certificate name"
                  name="title"
                  value={newCertificate.title}
                  type="text"
                  onChange={handleChangeCertificate}
                  containerClassName="flex flex-col gap-1 pb-4"
                  required
                />
                <Input
                  label="Provider"
                  placeholder="Provider name"
                  name="provider"
                  value={newCertificate.provider}
                  type="text"
                  onChange={handleChangeCertificate}
                  containerClassName="flex flex-col gap-1 pb-4"
                  required
                />
                <Input
                  label="Issue Date"
                  placeholder="Issue date, Format: YYYY-MM-DD"
                  name="issueDate"
                  value={newCertificate.issueDate}
                  type="text"
                  onChange={handleChangeCertificate}
                  containerClassName="flex flex-col gap-1 pb-4"
                  required
                />
                <Input
                  label="Certificate URL"
                  placeholder="Certificate URL"
                  name="certificateUrl"
                  value={newCertificate.certificateUrl}
                  type="text"
                  onChange={handleChangeCertificate}
                  containerClassName="flex flex-col gap-1 pb-4"
                  required
                />
                <TextArea
                  name="description"
                  rows={2}
                  value={newCertificate.description}
                  placeholder="Description"
                  inputClassName={"w-full"}
                  onChange={handleChangeCertificate}
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {certificateList &&
        certificateList.map((certificate: CertificateType, index: number) => (
          <CertificateWrapper certificate={certificate} key={`certificate-${index}`} />
        ))}
    </CardWithTitle>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditIcon from "../../../components/EditIcon";
import Title from "../../../components/Title";
import { CertificateType } from "../../../utils/type";
import {
  faTrashCan,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Interweave } from "interweave";
import Link from "../../../components/Link";
import { useState } from "react";
import { PROFILE_DATA_CATEGORY } from "../../../utils/constants";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import { useDispatch } from "react-redux";
import {
  deleteCertificateApi,
  updateCertificateApi,
} from "../../../services/api/profileApi";
import toast from "react-hot-toast";
import {
  deleteCertificate,
  updateCertificate,
} from "../../../services/redux/user";

type Props = {
  certificate: CertificateType;
  type?: string;
};

export default function CertificateWrapper({ certificate, type }: Props) {
  const [newCertificate, setNewCertificate] =
    useState<CertificateType>(certificate);
  const dispatch = useDispatch();

  function handleChangeCertificate(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setNewCertificate({ ...newCertificate, [name]: value });
  }

  function handleSaveCertificate() {
    // Call api function in parent component
    updateCertificateApi(newCertificate)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          dispatch(updateCertificate({ certificate: newCertificate }));
          setNewCertificate(res.data);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  const handleDeleteAward = () => {
    deleteCertificateApi(certificate.id)
      .then((res) => {
        if (res.success || res.status_code == 200) {
          toast.success(res.message);
          dispatch(deleteCertificate(certificate.id));
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  switch (type) {
    default:
      return (
        <div className="flex flex-col gap-0.5 flex-nowrap">
          <div className="flex flex-col  flex-nowrap">
            <div className="relative">
              <Title type="h4">{certificate.title}</Title>
              <span className="absolute top-0 bottom-0 right-0 text-base cursor-pointer">
                <Modal
                  title={PROFILE_DATA_CATEGORY.certificates.title}
                  handleSave={handleSaveCertificate}
                  buttonContent={<EditIcon className="text-lg  mx-2" />}
                  buttonClassName="!p-2 "
                >
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
                <span onClick={handleDeleteAward}>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className="text-gray-500 hover:text-red-500"
                  />
                </span>
              </span>
            </div>
          </div>
          <div className="text-base text-bold ">{certificate.provider}</div>
          <div className="text-base  text-bold">{certificate.issueDate}</div>
          <Interweave
            content={certificate.description}
            className=" text-base text-bold"
          />

          <Link
            to={certificate.certificateUrl}
            className="flex flex-row gap-2 items-center pt-1"
            target="_blank"
          >
            <>
              <span>View certificate</span>
              <FontAwesomeIcon icon={faUpRightFromSquare} />
            </>
          </Link>
        </div>
      );
  }
}

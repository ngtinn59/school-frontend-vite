import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditIcon from "../../../components/EditIcon";
import Title from "../../../components/Title";
import { AwardType } from "../../../utils/type";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Interweave } from "interweave";
import Modal from "../../../components/Modal";
import { PROFILE_DATA_CATEGORY } from "../../../utils/constants";
import Input from "../../../components/Input";
import { useState } from "react";
import {
  deleteAwardApi,
  updateAwardApi,
} from "../../../services/api/profileApi";
import toast from "react-hot-toast";
import TextArea from "../../../components/TextArea";
import { useDispatch } from "react-redux";
import { deleteAward } from "../../../services/redux/user";

type Props = {
  award: AwardType;
  type?: string;
};

export default function AwardWrapper({ award, type }: Props) {
  const [newAward, setNewAward] = useState<AwardType>(award);
  function handleChangeAward(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setNewAward({ ...newAward, [name]: value });
  }

  const dispatch = useDispatch();

  function handleSaveWorkExperience() {
    // Call api function in parent component
    updateAwardApi(newAward)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          // dispatch(updateExperience({ workExperience: newWorkExperience }));
          setNewAward(res.data);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  const handleDeleteAward = () => {
    deleteAwardApi(award.id)
      .then((res) => {
        if (res.success || res.status_code == 200) {
          toast.success(res.message);
          dispatch(deleteAward(award.id));
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
              <Title type="h4">{award.title}</Title>
              <span className="absolute top-0 bottom-0 right-0 text-base cursor-pointer">
                <Modal
                  title={PROFILE_DATA_CATEGORY.awards.title}
                  handleSave={handleSaveWorkExperience}
                  buttonContent={<EditIcon className="text-lg  mx-2" />}
                  buttonClassName="!p-2 "
                >
                  <div>
                    <div className="container mx-auto">
                      <form>
                        <div className="mt-4">
                          <Input
                            label="Award name"
                            placeholder="Award name"
                            name="title"
                            value={newAward.title}
                            type="text"
                            onChange={handleChangeAward}
                            containerClassName="flex flex-col gap-1 pb-4"
                            required
                          />
                          <Input
                            label="Provider"
                            placeholder="Provider name"
                            name="provider"
                            value={newAward.provider}
                            type="text"
                            onChange={handleChangeAward}
                            containerClassName="flex flex-col gap-1 pb-4"
                            required
                          />
                          <Input
                            label="Issue Date"
                            placeholder="Issue date, Format: YYYY-MM-DD"
                            name="issueDate"
                            value={newAward.issueDate}
                            type="text"
                            onChange={handleChangeAward}
                            containerClassName="flex flex-col gap-1 pb-4"
                            required
                          />
                          <TextArea
                            name="description"
                            rows={2}
                            value={newAward.description}
                            placeholder="Description"
                            inputClassName={"w-full"}
                            onChange={handleChangeAward}
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
          <div className="text-base text-bold ">{award.provider}</div>
          <div className="text-base  text-bold">{award.issueDate}</div>
          <Interweave
            content={award.description}
            className=" text-base text-bold"
          />
        </div>
      );
  }
}

import { useState } from "react";
import profile_awards from "../../../assets/profile_awards.svg";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import PlusIcon from "../../../components/PlusIcon";
import TextArea from "../../../components/TextArea";
import CardWithTitle from "../../../ui/Card/CardWithTitle";
import { PROFILE_DATA_CATEGORY } from "../../../utils/constants";
import { AwardType } from "../../../utils/type";
import AwardWrapper from "./AwardWrapper";
import { addAwardApi } from "../../../services/api/profileApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addAward } from "../../../services/redux/user";

type Props = { awardList: AwardType[] };

const initialAward: AwardType = {
  title: "",
  issueDate: "",
  provider: "",
  description: "",
  id: "",
};

export default function Award({ awardList }: Props) {
  const [newAward, setNewAward] = useState<AwardType>(initialAward);
  const dispatch = useDispatch();
  function handleChangeAward(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setNewAward({ ...newAward, [name]: value });
  }
  function handleSaveAward() {
    addAwardApi(newAward)
      .then((res) => {
        if (res.status_code === 200 || res.success) {
          // Update redux store
          dispatch(addAward({ ...newAward, id: res.award.id }));
          toast.success(res.message);
          // Clear form
          setNewAward(initialAward);
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
      title={PROFILE_DATA_CATEGORY.awards.title}
      titleType="h3"
      description={PROFILE_DATA_CATEGORY.awards.description}
      icon={profile_awards}
    >
      <Modal
        title={PROFILE_DATA_CATEGORY.personalProjects.title}
        handleSave={handleSaveAward}
        buttonContent={<PlusIcon className="text-lg  mx-2" />}
        buttonClassName="absolute right-4 top-4 !p-2 "
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
      {awardList?.map((award: AwardType, index: number) => (
        <AwardWrapper award={award} key={`award-${index}`} />
      ))}
    </CardWithTitle>
  );
}

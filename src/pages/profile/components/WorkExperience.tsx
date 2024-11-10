import CardWithTitle from "../../../ui/Card/CardWithTitle";
import { PROFILE_DATA_CATEGORY, SELECT_MONTH_OF_YEAR, SELECT_YEAR } from "../../../utils/constants";
import { WorkExperienceType } from "../../../utils/type";
import profile_work_experience from "../../../assets/profile_work_experience.svg";
import WorkExperienceWrapper from "./WorkExperienceWrapper";
import { useState } from "react";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import PlusIcon from "../../../components/PlusIcon";
import convertDateFormat from "../../../utils/function/convertDateFormat";
import { addWorkExperienceApi } from "../../../services/api/profileApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addExperience } from "../../../services/redux/user";

type Props = { workExperienceList: WorkExperienceType[] };

const workExperienceInitialState = {
  position: "",
  company: "",
  start_date: "1990-01-01",
  end_date: "1990-01-01",
  responsibilities: "",
  id: "",
};

export default function WorkExperience({ workExperienceList }: Props) {
  const [newWorkExperience, setNewWorkExperience] = useState<WorkExperienceType>(
    workExperienceInitialState
  );
  const dispatch = useDispatch();
  function handleChangeNewEducation(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    if (name === "start-month" || name === "start-year") {
      setNewWorkExperience({
        ...newWorkExperience,
        start_date: convertDateFormat(name, value, newWorkExperience.start_date),
      });
    } else if (name === "end-month" || name === "end-year") {
      setNewWorkExperience({
        ...newWorkExperience,
        end_date: convertDateFormat(name, value, newWorkExperience.end_date),
      });
    } else {
      setNewWorkExperience((preEducation) => {
        return { ...preEducation, [name]: value };
      });
    }
  }
  function handleAddNewWorkExperience() {
    addWorkExperienceApi(newWorkExperience)
      .then((res) => {
        if (res.status_code === 200 || res.success) {
          // Update redux store
          dispatch(addExperience({ ...newWorkExperience, id: res.data.id }));
          toast.success(res.message);
          // Clear form
          setNewWorkExperience(workExperienceInitialState);
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
      title={PROFILE_DATA_CATEGORY.workExperience.title}
      titleType="h3"
      description={PROFILE_DATA_CATEGORY.workExperience.description}
      icon={profile_work_experience}>
      <Modal
        title={PROFILE_DATA_CATEGORY.workExperience.title}
        handleSave={handleAddNewWorkExperience}
        buttonContent={<PlusIcon className="text-lg  " />}
        buttonClassName="absolute right-4 top-4">
        <div>
          <div className="container mx-auto">
            <form>
              <div className="">
                <Input
                  label="Position"
                  placeholder="Position"
                  name="position"
                  value={newWorkExperience.position}
                  type="text"
                  onChange={handleChangeNewEducation}
                  containerClassName="flex flex-col gap-1 pb-2"
                  required
                />
                <Input
                  label="Company"
                  placeholder="Company"
                  name="company"
                  value={newWorkExperience.company}
                  type="text"
                  onChange={handleChangeNewEducation}
                  containerClassName="flex flex-col gap-1 pb-2"
                  required
                />
                <div className="grid grid-cols-2 gap-4 ">
                  <Input
                    inputGroupType="styled-dropdown"
                    name="start-month"
                    label="Start"
                    value={newWorkExperience.start_date.split("-")[1]}
                    options={SELECT_MONTH_OF_YEAR}
                    onChange={handleChangeNewEducation}
                    containerClassName="flex flex-col gap-1 justify-end"
                    required
                  />
                  <Input
                    inputGroupType="styled-dropdown"
                    name="start-year"
                    value={newWorkExperience.start_date.split("-")[0]}
                    placeholder="major"
                    options={SELECT_YEAR}
                    onChange={handleChangeNewEducation}
                    containerClassName="flex flex-col gap-1 justify-end"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 ">
                  <Input
                    inputGroupType="styled-dropdown"
                    name="end-month"
                    label="End"
                    value={newWorkExperience.end_date.split("-")[1]}
                    options={SELECT_MONTH_OF_YEAR}
                    onChange={handleChangeNewEducation}
                    containerClassName="flex flex-col gap-1  justify-end"
                    required
                  />
                  <Input
                    inputGroupType="styled-dropdown"
                    name="end-year"
                    value={newWorkExperience.end_date.split("-")[0]}
                    options={SELECT_YEAR}
                    onChange={handleChangeNewEducation}
                    containerClassName="flex flex-col gap-1 justify-end"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <TextArea
                  name="responsibilities"
                  rows={2}
                  value={newWorkExperience.responsibilities}
                  placeholder="Responsibilities"
                  inputClassName={"w-full"}
                  onChange={handleChangeNewEducation}
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {workExperienceList &&
        workExperienceList.map((workExperience: WorkExperienceType, index: number) => (
          <WorkExperienceWrapper key={`work-experience-${index}`} workExperience={workExperience} />
        ))}
    </CardWithTitle>
  );
}

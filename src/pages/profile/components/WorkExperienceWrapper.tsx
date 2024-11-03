import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Interweave } from "interweave";
import { WorkExperienceType } from "../../../utils/type";
import Title from "../../../components/Title";
import EditIcon from "../../../components/EditIcon";
import Modal from "../../../components/Modal";
import { useState } from "react";
import Input from "../../../components/Input";
import {
  PROFILE_DATA_CATEGORY,
  SELECT_MONTH_OF_YEAR,
  SELECT_YEAR,
} from "../../../utils/constants";
import TextArea from "../../../components/TextArea";
import convertDateFormat from "../../../utils/function/convertDateFormat";
import {
  deleteWorkExperienceApi,
  updateWorkExperienceApi,
} from "../../../services/api/profileApi";
import toast from "react-hot-toast";
import {
  deleteExperience,
  updateExperience,
} from "../../../services/redux/user";
import { useDispatch } from "react-redux";

type Props = {
  workExperience: WorkExperienceType;
};

export default function WorkExperienceWrapper({ workExperience }: Props) {
  const [newWorkExperience, setNewWorkExperience] =
    useState<WorkExperienceType>(workExperience);
  const dispatch = useDispatch();

  const handleChangeNewWorkExperience = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "start-month" || name === "start-year") {
      setNewWorkExperience({
        ...newWorkExperience,
        start_date: convertDateFormat(
          name,
          value,
          newWorkExperience.start_date
        ),
      });
    } else if (name === "end-month" || name === "end-year") {
      setNewWorkExperience({
        ...newWorkExperience,
        end_date: convertDateFormat(name, value, newWorkExperience.end_date),
      });
    } else {
      setNewWorkExperience({ ...newWorkExperience, [name]: value });
    }
  };

  function handleSaveWorkExperience() {
    // Call api function in parent component
    updateWorkExperienceApi(newWorkExperience)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          dispatch(updateExperience({ workExperience: newWorkExperience }));
          setNewWorkExperience(workExperience);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  const handleDeleteWorkExperience = () => {
    deleteWorkExperienceApi(workExperience.id)
      .then((res) => {
        if (res.success || res.status_code == 200) {
          toast.success(res.message);
          dispatch(deleteExperience(workExperience.id));
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="flex flex-col gap-2 flex-nowrap">
      <div className="flex flex-col  flex-nowrap">
        <div className="relative">
          <Title type="h4">{workExperience.position}</Title>
          <span className="absolute top-0 bottom-0 right-0 text-base  cursor-pointer">
            <Modal
              title={PROFILE_DATA_CATEGORY.workExperience.title}
              handleSave={handleSaveWorkExperience}
              buttonContent={<EditIcon className="text-lg  mx-2" />}
              buttonClassName="!p-2 "
            >
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
                        onChange={handleChangeNewWorkExperience}
                        containerClassName="flex flex-col gap-1 pb-4"
                        required
                      />
                      <Input
                        label="Company"
                        placeholder="Company"
                        name="company"
                        value={newWorkExperience.company}
                        type="text"
                        onChange={handleChangeNewWorkExperience}
                        containerClassName="flex flex-col gap-1 pb-4"
                        required
                      />
                      <div className="grid grid-cols-2 gap-4 ">
                        <Input
                          inputGroupType="styled-dropdown"
                          name="start-month"
                          label="Start"
                          value={newWorkExperience.start_date.split("-")[1]}
                          options={SELECT_MONTH_OF_YEAR}
                          onChange={handleChangeNewWorkExperience}
                          containerClassName="flex flex-col gap-1 justify-end"
                          required
                        />
                        <Input
                          inputGroupType="styled-dropdown"
                          name="start-year"
                          value={newWorkExperience.start_date.split("-")[2]}
                          placeholder="major"
                          options={SELECT_YEAR}
                          onChange={handleChangeNewWorkExperience}
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
                          onChange={handleChangeNewWorkExperience}
                          containerClassName="flex flex-col gap-1  justify-end"
                          required
                        />
                        <Input
                          inputGroupType="styled-dropdown"
                          name="end-year"
                          value={newWorkExperience.end_date.split("-")[2]}
                          options={SELECT_YEAR}
                          onChange={handleChangeNewWorkExperience}
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
                        onChange={handleChangeNewWorkExperience}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
            <span onClick={handleDeleteWorkExperience}>
              <FontAwesomeIcon
                icon={faTrashCan}
                className="text-gray-500 hover:text-red-600"
              />
            </span>
          </span>
        </div>
        <div className="text-base text-bold font-medium">
          {workExperience?.company}
        </div>
      </div>
      <div className="flex flex-col  flex-nowrap">
        <div className="text-base font-medium text-bold">
          <span>{workExperience?.start_date.replace(/-/g, "/")}</span> -{" "}
          <span>{workExperience?.end_date.replace(/-/g, "/")}</span>
        </div>
        <div className="font-medium text-base text-bold list-disc list-inside ">
          <Interweave content={workExperience?.responsibilities} />
        </div>
      </div>
    </div>
  );
}

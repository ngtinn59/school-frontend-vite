import { useState } from "react";
import EditIcon from "../../../components/EditIcon";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import TextArea from "../../../components/TextArea";
import Title from "../../../components/Title";
import {
  PROFILE_DATA_CATEGORY,
  SELECT_MONTH_OF_YEAR,
  SELECT_YEAR,
} from "../../../utils/constants";
import { EducationType } from "../../../utils/type";
import { useDispatch } from "react-redux";
import { deleteEducation, updateEducation } from "../../../services/redux/user";
import formatDateToDDMMYYYY from "../../../utils/function/formatDateToDDMMYYYY";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  deleteEducationApi,
  updateEducationApi,
} from "../../../services/api/profileApi";
import toast from "react-hot-toast";
import convertDateFormat from "../../../utils/function/convertDateFormat";

type props = {
  education: EducationType;
};

export default function EducationWrapper({ education }: props) {
  const [newEducation, setNewEducation] = useState<EducationType>(education);

  const { institution, degree, start_date, end_date, additionalDetail } =
    newEducation;
  const dispatch = useDispatch();
  const handleChangeEducation = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "start-month" || name === "start-year") {
      setNewEducation({
        ...newEducation,
        start_date: convertDateFormat(name, value, newEducation.start_date),
      });
    } else if (name === "end-month" || name === "end-year") {
      setNewEducation({
        ...newEducation,
        end_date: convertDateFormat(name, value, newEducation.end_date),
      });
    } else {
      setNewEducation({ ...newEducation, [name]: value });
    }
  };
  const handleSaveEducation = () => {
    // Call api function in parent component
    updateEducationApi(newEducation)
      .then((res) => {
        if (res.status_code == 200 || res.success || true == true) {
          toast.success(res.message);
          dispatch(updateEducation({ education: newEducation }));
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleDeleteEducation = () => {
    deleteEducationApi(education.id)
      .then((res) => {
        if (res.success || res.status_code == 200 || true == true) {
          toast.success(res.message);
          dispatch(deleteEducation(education.id));
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="flex flex-row flex-nowrap">
      <div className="flex flex-col gap-2 flex-nowrap flex-1">
        <div className="flex  flex-col  flex-nowrap">
          <Title type="h4">{degree}</Title>

          <div className="text-base text-bold  ">{institution}</div>
        </div>
        <div className="flex flex-col  flex-nowrap">
          <div className="text-base  text-bold  ">
            <span>
              {formatDateToDDMMYYYY(new Date(start_date))
                .split("/")
                .slice(1)
                .join("/")}
            </span>{" "}
            -{" "}
            <span>
              {formatDateToDDMMYYYY(new Date(end_date))
                .split("/")
                .slice(1)
                .join("/")}
            </span>
          </div>
          <div className=" text-base text-bold   ">{additionalDetail}</div>
        </div>
      </div>
      <div className="-mt-2">
        <Modal
          title={PROFILE_DATA_CATEGORY.education.title}
          handleSave={handleSaveEducation}
          buttonContent={<EditIcon className="text-lg  " />}
          buttonClassName="!p-2 "
        >
          <div>
            <div className="container mx-auto">
              <form>
                <div className="">
                  <Input
                    label="Institution"
                    placeholder="Institution"
                    name="institution"
                    value={institution}
                    type="text"
                    onChange={handleChangeEducation}
                    containerClassName="flex flex-col gap-1 pb-4"
                    required
                  />
                  <Input
                    label="Degree"
                    placeholder="degree"
                    name="degree"
                    value={degree}
                    type="text"
                    onChange={handleChangeEducation}
                    containerClassName="flex flex-col gap-1 pb-4"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4 ">
                    <Input
                      inputGroupType="styled-dropdown"
                      name="start-month"
                      label="Start"
                      options={SELECT_MONTH_OF_YEAR}
                      onChange={handleChangeEducation}
                      containerClassName="flex flex-col gap-1 justify-end"
                      required
                    />
                    <Input
                      inputGroupType="styled-dropdown"
                      name="start-year"
                      placeholder="major"
                      options={SELECT_YEAR}
                      onChange={handleChangeEducation}
                      containerClassName="flex flex-col gap-1 justify-end"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 ">
                    <Input
                      inputGroupType="styled-dropdown"
                      name="end-month"
                      label="End"
                      options={SELECT_MONTH_OF_YEAR}
                      onChange={handleChangeEducation}
                      containerClassName="flex flex-col gap-1  justify-end"
                      required
                    />
                    <Input
                      inputGroupType="styled-dropdown"
                      name="end-year"
                      options={SELECT_YEAR}
                      onChange={handleChangeEducation}
                      containerClassName="flex flex-col gap-1 justify-end"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <TextArea
                    name="additionalDetail"
                    rows={2}
                    placeholder="Other detailed information"
                    inputClassName={"w-full"}
                    onChange={handleChangeEducation}
                    value={additionalDetail}
                  />
                </div>
              </form>
            </div>
          </div>
        </Modal>
        <span className="px-2 py-2">
          <FontAwesomeIcon
            icon={faTrashCan}
            className="text-gray-500 cursor-pointer hover:text-red-500"
            onClick={handleDeleteEducation}
          />
        </span>
      </div>
    </div>
  );
}

import { useState } from "react";
import profile_education from "../../../assets/profile_education.svg";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import PlusIcon from "../../../components/PlusIcon";
import TextArea from "../../../components/TextArea";
import CardWithTitle from "../../../ui/Card/CardWithTitle";
import { PROFILE_DATA_CATEGORY, SELECT_MONTH_OF_YEAR, SELECT_YEAR } from "../../../utils/constants";
import { EducationType } from "../../../utils/type";
import { addEducationApi } from "../../../services/api/profileApi";
import toast from "react-hot-toast";
import { addEducation } from "../../../services/redux/user";
import { useDispatch } from "react-redux";
import EducationWrapper from "./EducationWrapper";

type Props = {
  educationList: EducationType[];
};

const educationInitialState = {
  institution: "",
  degree: "",
  start_date: "2000-01-01", //YYYY/MM/DD
  end_date: "2000-01-01", //YYYY/MM/DD
  additionalDetail: "",
  id: "",
};

export const Education = ({ educationList }: Props) => {
  const [newEducation, setNewEducation] = useState<EducationType>(educationInitialState);
  const dispatch = useDispatch();
  const handleChangeEducation = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (
      name === "start-month" ||
      name === "start-year" ||
      name === "end-month" ||
      name === "end-year"
    ) {
      const startMonth = newEducation.start_date.split("-")[1];
      const startYear = newEducation.start_date.split("-")[0];
      const endMonth = newEducation.end_date.split("-")[1];
      const endYear = newEducation.end_date.split("-")[0];
      if (name === "start-month") {
        setNewEducation((preEducation) => {
          return {
            ...preEducation,
            start_date: `${startYear}-${value}-01`,
          };
        });
      }
      if (name === "start-year") {
        setNewEducation((preEducation) => {
          return {
            ...preEducation,
            start_date: `${value}-${startMonth}-01`,
          };
        });
      }
      if (name === "end-month") {
        setNewEducation((preEducation) => {
          return {
            ...preEducation,
            end_date: `${endYear}-${value}-01`,
          };
        });
      }
      if (name === "end-year") {
        setNewEducation((preEducation) => {
          return {
            ...preEducation,
            end_date: `${value}-${endMonth}-01`,
          };
        });
      }
    } else {
      setNewEducation((preEducation) => {
        return { ...preEducation, [name]: value };
      });
    }
  };
  function handleAddEducation() {
    if (
      new Date(newEducation.start_date.replace("-", "/")) >
      new Date(newEducation.end_date.replace("-", "/"))
    ) {
      toast.error("Start date cannot be greater than end date");
      return;
    } else {
      addEducationApi(newEducation)
        .then((res) => {
          if (res.status_code === 200 || res.success) {
            // Update redux store
            console.log(res);
            dispatch(addEducation({ ...newEducation, id: res.profile_id }));
            toast.success(res.message);
            // Clear form
            setNewEducation(educationInitialState);
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  }
  return (
    <CardWithTitle
      title={PROFILE_DATA_CATEGORY.education.title}
      titleType="h3"
      description={PROFILE_DATA_CATEGORY.education.description}
      icon={profile_education}>
      <Modal
        title={PROFILE_DATA_CATEGORY.education.title}
        handleSave={handleAddEducation}
        buttonContent={<PlusIcon className="text-lg  " />}
        buttonClassName="absolute right-4 top-4">
        <div>
          <div className="container mx-auto">
            <form>
              <div className="">
                <Input
                  label="Institution"
                  placeholder="Institution"
                  name="institution"
                  value={newEducation.institution}
                  type="text"
                  onChange={handleChangeEducation}
                  containerClassName="flex flex-col gap-1 pb-2"
                  required
                />
                <Input
                  label="Degree"
                  placeholder="degree"
                  name="degree"
                  value={newEducation.degree}
                  type="text"
                  onChange={handleChangeEducation}
                  containerClassName="flex flex-col gap-1 pb-2"
                  required
                />
                <div className="grid grid-cols-2 gap-4 ">
                  <Input
                    inputGroupType="styled-dropdown"
                    name="start-month"
                    label="Start"
                    value={newEducation.start_date.split("-")[1]}
                    options={SELECT_MONTH_OF_YEAR}
                    onChange={handleChangeEducation}
                    containerClassName="flex flex-col gap-1 justify-end"
                    required
                  />
                  <Input
                    inputGroupType="styled-dropdown"
                    name="start-year"
                    value={newEducation.start_date.split("-")[2]}
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
                    value={newEducation.end_date.split("-")[1]}
                    options={SELECT_MONTH_OF_YEAR}
                    onChange={handleChangeEducation}
                    containerClassName="flex flex-col gap-1  justify-end"
                    required
                  />
                  <Input
                    inputGroupType="styled-dropdown"
                    name="end-year"
                    value={newEducation.end_date.split("-")[2]}
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
                  value={newEducation.additionalDetail}
                  placeholder="Other detailed information"
                  inputClassName={"w-full"}
                  onChange={handleChangeEducation}
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {educationList &&
        educationList.map((education, index) => {
          console.log(education);
          return <EducationWrapper key={`education-${index}`} education={education} />;
        })}
    </CardWithTitle>
  );
};

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Markup } from "interweave";
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
import convertDateFormat from "../../../utils/function/convertDateFormat";
import { PersonalProjectType } from "../../../utils/type";
import {
  deletePersonalProjectApi,
  updatePersonalProjectApi,
} from "../../../services/api/profileApi";
import toast from "react-hot-toast";
import {
  deleteProject,
  updatePersonalProject,
} from "../../../services/redux/user";
import { useDispatch } from "react-redux";

type Props = {
  project: PersonalProjectType;
  type?: string;
};

export default function PersonalProjectWrapper({ project }: Props) {
  const dispatch = useDispatch();
  const { title, start_date, end_date, description } = project;
  const [newPersonalProject, setNewPersonalProject] =
    useState<PersonalProjectType>(project);

  const handleChangePersonalProject = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "start-month" || name === "start-year") {
      setNewPersonalProject({
        ...newPersonalProject,
        start_date: convertDateFormat(
          name,
          value,
          newPersonalProject.start_date
        ),
      });
    } else if (name === "end-month" || name === "end-year") {
      setNewPersonalProject({
        ...newPersonalProject,
        end_date: convertDateFormat(name, value, newPersonalProject.end_date),
      });
    } else {
      setNewPersonalProject({ ...newPersonalProject, [name]: value });
    }
  };

  function handleSavePersonalProject() {
    console.log(newPersonalProject, "newPersonalProject");
    // Call api function in parent component
    updatePersonalProjectApi(newPersonalProject)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          dispatch(
            updatePersonalProject({ personalProject: newPersonalProject })
          );
          setNewPersonalProject(project);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  const handleDeletePersonalProject = () => {
    deletePersonalProjectApi(project.id)
      .then((res) => {
        if (res.success || res.status_code == 200) {
          toast.success(res.message);
          dispatch(deleteProject(project.id));
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
          <Title type="h4">{title}</Title>
          <span className="absolute top-0 bottom-0 right-0 text-base">
            <Modal
              title={PROFILE_DATA_CATEGORY.personalProjects.title}
              handleSave={handleSavePersonalProject}
              buttonContent={<EditIcon className="text-lg  mx-2" />}
              buttonClassName="!p-2 "
            >
              <div>
                <div className="container mx-auto">
                  <form>
                    <div className="">
                      <Input
                        label="Project name"
                        placeholder="Project name"
                        name="title"
                        value={newPersonalProject.title}
                        type="text"
                        onChange={handleChangePersonalProject}
                        containerClassName="flex flex-col gap-1 pb-4"
                        required
                      />

                      <div className="grid grid-cols-2 gap-4 ">
                        <Input
                          inputGroupType="styled-dropdown"
                          name="start-month"
                          label="Start"
                          value={newPersonalProject.start_date.split("-")[1]}
                          options={SELECT_MONTH_OF_YEAR}
                          onChange={handleChangePersonalProject}
                          containerClassName="flex flex-col gap-1 justify-end"
                          required
                        />
                        <Input
                          inputGroupType="styled-dropdown"
                          name="start-year"
                          value={newPersonalProject.start_date.split("-")[2]}
                          placeholder="major"
                          options={SELECT_YEAR}
                          onChange={handleChangePersonalProject}
                          containerClassName="flex flex-col gap-1 justify-end"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 ">
                        <Input
                          inputGroupType="styled-dropdown"
                          name="end-month"
                          label="End"
                          value={newPersonalProject.end_date.split("-")[1]}
                          options={SELECT_MONTH_OF_YEAR}
                          onChange={handleChangePersonalProject}
                          containerClassName="flex flex-col gap-1  justify-end"
                          required
                        />
                        <Input
                          inputGroupType="styled-dropdown"
                          name="end-year"
                          value={newPersonalProject.end_date.split("-")[2]}
                          options={SELECT_YEAR}
                          onChange={handleChangePersonalProject}
                          containerClassName="flex flex-col gap-1 justify-end"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <TextArea
                        name="description"
                        rows={2}
                        value={newPersonalProject.description}
                        placeholder="Description"
                        inputClassName={"w-full"}
                        onChange={handleChangePersonalProject}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
            <span onClick={handleDeletePersonalProject}>
              <FontAwesomeIcon
                icon={faTrashCan}
                className="text-gray-500 cursor-pointer hover:text-red-500"
              />
            </span>
          </span>
        </div>
      </div>
      <div className="flex flex-col  flex-nowrap">
        <div className="text-base font-medium text-bold">
          <span>{start_date.replace(/-/g, "/")}</span> -{" "}
          <span>{end_date.replace(/-/g, "/")}</span>
        </div>
        <Markup
          content={description}
          className="font-medium text-base text-bold  "
        />
      </div>
    </div>
  );
}

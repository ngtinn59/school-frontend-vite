import CardWithTitle from "../../../ui/Card/CardWithTitle";
import { PROFILE_DATA_CATEGORY, SELECT_MONTH_OF_YEAR, SELECT_YEAR } from "../../../utils/constants";
import { PersonalProjectType } from "../../../utils/type";
import profile_personal_project from "../../../assets/profile_personal_project.svg";
import PersonalProjectWrapper from "./PersonalProjectWrapper";
import Modal from "../../../components/Modal";
import { useState } from "react";
import Input from "../../../components/Input";
import convertDateFormat from "../../../utils/function/convertDateFormat";
import PlusIcon from "../../../components/PlusIcon";
import TextArea from "../../../components/TextArea";
import { addPersonalProjectApi } from "../../../services/api/profileApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addPersonalProject } from "../../../services/redux/user";

type Props = { personalProjectList: PersonalProjectType[] };

const initialProject = {
  title: "",
  start_date: "1990-01-01",
  end_date: "1990-01-01",
  description: "",
  id: "",
};

export default function PersonalProject({ personalProjectList }: Props) {
  const [newPersonalProject, setNewPersonalProject] = useState<PersonalProjectType>(initialProject);
  const dispatch = useDispatch();

  const handleChangePersonalProject = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "start-month" || name === "start-year") {
      setNewPersonalProject({
        ...newPersonalProject,
        start_date: convertDateFormat(name, value, newPersonalProject.start_date),
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

  function handleAddPersonalProject() {
    // Call api function in parent component
    addPersonalProjectApi(newPersonalProject)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          dispatch(
            addPersonalProject({ personalProject: { ...newPersonalProject, id: res.data.id } })
          );
          setNewPersonalProject(initialProject);
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
      title={PROFILE_DATA_CATEGORY.personalProjects.title}
      titleType="h3"
      description={PROFILE_DATA_CATEGORY.personalProjects.description}
      icon={profile_personal_project}>
      <Modal
        title={PROFILE_DATA_CATEGORY.workExperience.title}
        handleSave={handleAddPersonalProject}
        buttonContent={<PlusIcon className="text-lg  " />}
        buttonClassName="absolute right-4 top-4">
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
                    value={newPersonalProject.start_date.split("-")[0]}
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
                    value={newPersonalProject.end_date.split("-")[0]}
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
      {personalProjectList &&
        personalProjectList.map((project: PersonalProjectType, index: number) => (
          <PersonalProjectWrapper
            project={project}
            type="personal-project"
            key={`project-${index}`}
          />
        ))}
    </CardWithTitle>
  );
}

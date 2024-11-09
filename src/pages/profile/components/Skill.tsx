import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import profile_skills from "../../../assets/profile_skills.svg";
import DropdownSearchSkills from "../../../components/DropdownSearchSkills";
import EditIcon from "../../../components/EditIcon";
import Modal from "../../../components/Modal";
import PlusIcon from "../../../components/PlusIcon";
import CardWithTitle from "../../../ui/Card/CardWithTitle";
import {
  PROFILE_DATA_CATEGORY,
  PROFILE_JOB_PREFERENCES_SKILLS_STRING,
} from "../../../utils/constants";
import { SkillType } from "../../../utils/type";
import SkillsWrapper from "./SkillsWrapper";
import Title from "../../../components/Title";
import { convertSkillTypeToSkills } from "../../../utils/function/convertSkillTypeToSkills";
import { updateSkillApi } from "../../../services/api/profileApi";
import toast from "react-hot-toast";
import { updateSkill } from "../../../services/redux/user";
import { useDispatch } from "react-redux";

type Props = { skills: SkillType };

export default function Skill({ skills }: Props) {
  const [currSkills, setCurrSkills] = useState<SkillType>(skills);
  const dispatch = useDispatch();
  const isSkillEmpty = !(
    skills.beginner?.length &&
    skills.intermediate?.length &&
    skills.excellent?.length
  );

  useEffect(() => {
    setCurrSkills(skills);
  }, [skills]);

  const handleChangeSkill = (newSkills: string[], skillLevel: string) => {
    setCurrSkills({
      ...currSkills,
      [skillLevel]: newSkills,
    });
  };

  function handleUpdateSkill() {
    updateSkillApi(convertSkillTypeToSkills(currSkills))
      .then((res) => {
        if (res.status_code === 200 || res.success) {
          // Update redux store
          dispatch(updateSkill(currSkills));
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }
  console.log(currSkills, "skills");
  return (
    <CardWithTitle
      title={PROFILE_DATA_CATEGORY.skills.title}
      titleType="h3"
      description={PROFILE_DATA_CATEGORY.skills.description}
      icon={profile_skills}>
      <Modal
        title={PROFILE_DATA_CATEGORY.workExperience.title}
        handleSave={handleUpdateSkill}
        buttonContent={
          isSkillEmpty ? <PlusIcon className="text-lg  " /> : <EditIcon className="text-lg  mx-2" />
        }
        buttonClassName="absolute right-4 top-4">
        <div>
          <div className="container mx-auto">
            <form>
              {/* Excellent */}
              <div className="flex flex-col gap-4">
                <Title type="h4" className="col-start-1 col-end-3">
                  Excellent
                </Title>
                <DropdownSearchSkills
                  id="dropdown-search-skills-excellent"
                  data={PROFILE_JOB_PREFERENCES_SKILLS_STRING}
                  className={`outline-none border border-solid border-gray-300  rounded-md `}
                  handleChangeValues={(skills) => {
                    handleChangeSkill(skills, "excellent");
                  }}
                  currentValues={currSkills.excellent}
                />

                <div className="flex gap-2 flex-row flex-wrap">
                  {currSkills?.excellent?.length > 0 &&
                    currSkills.excellent.map((skill, index) => (
                      <span
                        key={index}
                        className=" px-3 py-1 text-base font-medium  border border-solid border-disabled bg-gray-50 rounded-full cursor-default flex items-center gap-1 "
                        onClick={() => {
                          const newSkills = currSkills.excellent.filter(
                            (s) => s.toLowerCase().trim() !== skill.toLowerCase().trim()
                          );
                          handleChangeSkill(newSkills, "excellent");
                        }}>
                        <span>{skill}</span>
                        <FontAwesomeIcon
                          icon={faClose}
                          className="text-base text-gray-300 hover:text-red-500"
                        />
                      </span>
                    ))}
                </div>
              </div>

              {/* Intermediate */}
              <div className="flex flex-col gap-4">
                <Title type="h4" className="col-start-1 col-end-3">
                  Intermediate
                </Title>
                <DropdownSearchSkills
                  id="dropdown-search-skills-intermediate"
                  data={PROFILE_JOB_PREFERENCES_SKILLS_STRING}
                  className={`outline-none border border-solid border-gray-300  rounded-md `}
                  handleChangeValues={(skills) => {
                    handleChangeSkill(skills, "intermediate");
                  }}
                  currentValues={currSkills.intermediate}
                />

                <div className="flex gap-2 flex-row flex-wrap">
                  {currSkills?.intermediate?.length > 0 &&
                    currSkills.intermediate.map((skill, index) => (
                      <span
                        key={index}
                        className=" px-3 py-1 text-base font-medium  border border-solid border-disabled bg-gray-50 rounded-full cursor-default flex items-center gap-1 "
                        onClick={() => {
                          const newSkills = currSkills.intermediate.filter(
                            (s) => s.toLowerCase().trim() !== skill.toLowerCase().trim()
                          );
                          handleChangeSkill(newSkills, "intermediate");
                        }}>
                        <span>{skill}</span>
                        <FontAwesomeIcon
                          icon={faClose}
                          className="text-base text-gray-300 hover:text-red-500"
                        />
                      </span>
                    ))}
                </div>
              </div>

              {/* Beginner */}
              <div className="flex flex-col gap-4">
                <Title type="h4" className="col-start-1 col-end-3">
                  Beginner
                </Title>
                <DropdownSearchSkills
                  id="dropdown-search-skills-beginner"
                  data={PROFILE_JOB_PREFERENCES_SKILLS_STRING}
                  className={`outline-none border border-solid border-gray-300  rounded-md `}
                  handleChangeValues={(skills) => {
                    handleChangeSkill(skills, "beginner");
                  }}
                  currentValues={currSkills.beginner}
                />

                <div className="flex gap-2 flex-row flex-wrap">
                  {currSkills?.beginner?.length > 0 &&
                    currSkills.beginner.map((skill, index) => (
                      <span
                        key={index}
                        className=" px-3 py-1 text-base font-medium  border border-solid border-disabled bg-gray-50 rounded-full cursor-default flex items-center gap-1 "
                        onClick={() => {
                          const newSkills = currSkills.beginner.filter(
                            (s) => s.toLowerCase().trim() !== skill.toLowerCase().trim()
                          );
                          handleChangeSkill(newSkills, "beginner");
                        }}>
                        <span>{skill}</span>
                        <FontAwesomeIcon
                          icon={faClose}
                          className="text-base text-gray-300 hover:text-red-500"
                        />
                      </span>
                    ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {!!(skills.beginner?.length && skills.intermediate?.length && skills.excellent?.length) && (
        <SkillsWrapper skills={skills} />
      )}
    </CardWithTitle>
  );
}

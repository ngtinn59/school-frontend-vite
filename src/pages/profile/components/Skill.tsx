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
import Input from "../../../components/Input";
import Button from "../../../components/Button";

type Props = { skills: SkillType };

export default function Skill({ skills }: Props) {
  const [currSkills, setCurrSkills] = useState<SkillType>(skills);
  const [currExcellentSkill, setCurrExcellentSkill] = useState<string>("");
  const [currIntermediateSkill, setCurrIntermediateSkill] =
    useState<string>("");
  const [currBeginnerSkill, setCurrBeginnerSkill] = useState<string>("");
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

  function addExcellentSkill() {
    if (currExcellentSkill.trim() === "") return;
    const newSkills = [...currSkills.excellent, currExcellentSkill];
    handleChangeSkill(newSkills, "excellent");
    setCurrExcellentSkill("");
  }

  function addIntermediateSkill() {
    if (currIntermediateSkill.trim() === "") return;
    const newSkills = [...currSkills.intermediate, currIntermediateSkill];
    handleChangeSkill(newSkills, "intermediate");
    setCurrIntermediateSkill("");
  }

  function addBeginnerSkill() {
    if (currBeginnerSkill.trim() === "") return;
    const newSkills = [...currSkills.beginner, currBeginnerSkill];
    handleChangeSkill(newSkills, "beginner");
    setCurrBeginnerSkill("");
  }

  return (
    <CardWithTitle
      title={PROFILE_DATA_CATEGORY.skills.title}
      titleType="h3"
      description={PROFILE_DATA_CATEGORY.skills.description}
      icon={profile_skills}
    >
      <Modal
        title={PROFILE_DATA_CATEGORY.skills.title}
        handleSave={handleUpdateSkill}
        buttonContent={
          isSkillEmpty ? (
            <PlusIcon className="text-lg" />
          ) : (
            <EditIcon className="mx-2 text-lg" />
          )
        }
        buttonClassName="absolute right-4 top-4"
      >
        <div>
          <div className="container mx-auto">
            <form>
              {/* Excellent */}
              <div className="flex flex-col gap-4">
                <Title type="h4" className="col-start-1 col-end-3">
                  Excellent
                </Title>

                <div className="flex items-center gap-2">
                  <div className="basis-[80%]">
                    <Input
                      inputClassName="w-full"
                      value={currExcellentSkill}
                      type="text"
                      name="excellentSkill"
                      onChange={(e) => setCurrExcellentSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addExcellentSkill();
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <Button
                      buttonType="primary"
                      type="button"
                      className="w-full rounded-sm px-4 py-2"
                      onClick={addExcellentSkill}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                <div className="flex flex-row flex-wrap gap-2">
                  {currSkills?.excellent?.length > 0 &&
                    currSkills.excellent.map((skill, index) => (
                      <span
                        key={index}
                        className="flex cursor-default items-center gap-1 rounded-full border border-solid border-disabled bg-gray-50 px-3 py-1 text-base font-medium"
                        onClick={() => {
                          const newSkills = currSkills.excellent.filter(
                            (s) =>
                              s.toLowerCase().trim() !==
                              skill.toLowerCase().trim(),
                          );
                          handleChangeSkill(newSkills, "excellent");
                        }}
                      >
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

                <div className="flex items-center gap-2">
                  <div className="basis-[80%]">
                    <Input
                      inputClassName="w-full"
                      value={currIntermediateSkill}
                      type="text"
                      name="intermediateSkill"
                      onChange={(e) => setCurrIntermediateSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addIntermediateSkill();
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <Button
                      buttonType="primary"
                      type="button"
                      className="w-full rounded-sm px-4 py-2"
                      onClick={addIntermediateSkill}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                <div className="flex flex-row flex-wrap gap-2">
                  {currSkills?.intermediate?.length > 0 &&
                    currSkills.intermediate.map((skill, index) => (
                      <span
                        key={index}
                        className="flex cursor-default items-center gap-1 rounded-full border border-solid border-disabled bg-gray-50 px-3 py-1 text-base font-medium"
                        onClick={() => {
                          const newSkills = currSkills.intermediate.filter(
                            (s) =>
                              s.toLowerCase().trim() !==
                              skill.toLowerCase().trim(),
                          );
                          handleChangeSkill(newSkills, "intermediate");
                        }}
                      >
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

                <div className="flex items-center gap-2">
                  <div className="basis-[80%]">
                    <Input
                      inputClassName="w-full"
                      value={currBeginnerSkill}
                      type="text"
                      name="beginnerSkill"
                      onChange={(e) => setCurrBeginnerSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addBeginnerSkill();
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <Button
                      buttonType="primary"
                      type="button"
                      className="w-full rounded-sm px-4 py-2"
                      onClick={addBeginnerSkill}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                <div className="flex flex-row flex-wrap gap-2">
                  {currSkills?.beginner?.length > 0 &&
                    currSkills.beginner.map((skill, index) => (
                      <span
                        key={index}
                        className="flex cursor-default items-center gap-1 rounded-full border border-solid border-disabled bg-gray-50 px-3 py-1 text-base font-medium"
                        onClick={() => {
                          const newSkills = currSkills.beginner.filter(
                            (s) =>
                              s.toLowerCase().trim() !==
                              skill.toLowerCase().trim(),
                          );
                          handleChangeSkill(newSkills, "beginner");
                        }}
                      >
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
      {!!(
        skills.beginner?.length ||
        skills.intermediate?.length ||
        skills.excellent?.length
      ) && <SkillsWrapper skills={skills} />}
    </CardWithTitle>
  );
}

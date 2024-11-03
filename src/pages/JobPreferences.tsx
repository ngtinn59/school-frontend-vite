import { faCheck, faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Divider from "../components/Divider";
import Dropdown from "../components/Dropdown";
import DropdownSearchCopy from "../components/DropdownSearch";
import Input from "../components/Input";
import Title from "../components/Title";
import ToggleButton from "../components/ToggleButton";
import Tooltip from "../components/Tooltip";
import Wrapper from "../components/Wrapper";
import {
  HOMEPAGE_JOBS_CITIES,
  PROFILE_COMPANY_SIZE,
  PROFILE_COMPANY_TYPE,
  PROFILE_CURRENT_SALARY_CURRENCY,
  PROFILE_JOB_LEVELS,
  PROFILE_JOB_PREFERENCES_SKILLS,
  PROFILE_WORKING_TYPE,
} from "../utils/constants";
import { ComponentSelectionWithSearchType, ToggleType } from "../utils/type";

const GridLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-12 gap-4">{children}</div>
);

const TitleWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="col-start-1 col-end-4">{children}</div>
);

const ContentWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="col-start-4 col-end-13 flex flex-col gap-2">{children}</div>
);

const initialWorkingType: ToggleType[] = PROFILE_WORKING_TYPE.map((type) => ({
  name: type,
  isChecked: false,
}));

const initialCompanyType: ToggleType[] = PROFILE_COMPANY_TYPE.map((type) => ({
  name: type,
  isChecked: false,
}));
const initialCompanySize: ToggleType[] = PROFILE_COMPANY_SIZE.map((type) => ({
  name: type,
  isChecked: false,
}));

function JobPreferences() {
  const [skills, setSkills] = useState(
    [] as ComponentSelectionWithSearchType[]
  );
  const [jobLevels, setJobLevels] = useState([] as string[]);
  const [currentSalary, setCurrentSalary] = useState(0);
  const [expectedSalary, setExpectedSalary] = useState({
    expectedSalaryFrom: 0,
    expectedSalaryTo: 0,
  });
  const [workingType, setWorkingType] = useState(initialWorkingType);
  const [companyType, setCompanyType] = useState(initialCompanyType);
  const [companySize, setCompanySize] = useState(initialCompanySize);
  const [jobLocation, setJobLocation] = useState("");
  const handleChangeSkills = useCallback(
    (skills: ComponentSelectionWithSearchType[]) => {
      setSkills(skills);
    },
    []
  );
  return (
    <Wrapper className="flex flex-col gap-6" type="narrow">
      <Card className="bg-white gap-5 flex flex-col">
        <Title type="h3">My interested job type</Title>
        <p className="font-medium text-normal">
          Let us know the type of job you prefer so we can recommend more
          suitable opportunities on our site. No emails sent
        </p>
        <Divider />
        {/* Skills */}
        <GridLayout>
          <TitleWrap>
            <Title type="h4" className="col-start-1 col-end-3">
              Skills
            </Title>
          </TitleWrap>
          <ContentWrap>
            <DropdownSearchCopy
              id="dropdown-search-skills"
              data={PROFILE_JOB_PREFERENCES_SKILLS}
              className={`outline-none border border-solid border-gray-300  rounded-md  ${
                skills.length > 5 ? `bg-disabled pointer-events-none` : ""
              }`}
              handleChangeValues={handleChangeSkills}
              currentValues={skills}
            />
            <div className="text-sm font-semibold text-gray-400 -mt-1">
              {skills.length} / 6 skills
            </div>
            <div className="flex gap-2">
              {skills.length > 0 &&
                skills.map((skill) => (
                  <span
                    key={skill.id}
                    className=" px-3 py-1 text-base font-medium  border border-solid border-disabled bg-gray-50 rounded-full cursor-default flex items-center gap-1 "
                    onClick={() => {
                      const newSkills = skills.filter((s) => s.id !== skill.id);
                      handleChangeSkills(newSkills);
                    }}
                  >
                    <span>{skill.name}</span>
                    <FontAwesomeIcon
                      icon={faClose}
                      className="text-base text-gray-300 hover:text-red-500"
                    />
                  </span>
                ))}
            </div>
          </ContentWrap>
        </GridLayout>
        {/* Job Level */}
        <GridLayout>
          <TitleWrap>
            <Title type="h4">Job Level</Title>
            <p className="font-medium text-base text-normal">
              Allow multiple choices
            </p>
          </TitleWrap>
          <ContentWrap>
            {PROFILE_JOB_LEVELS.map((level) => (
              <Input
                key={level.id}
                id={level.id}
                type="checkbox"
                name={level.id}
                label={level.text}
                containerClassName="flex flex-row-reverse items-center justify-end"
                inputClassName="w-5 h-5 mr-2 !rounded-sm !shadow-none !ring-0"
                labelClassName="text-base font-medium text-normal"
                onChange={() => {
                  setJobLevels([...jobLevels, level.id]);
                }}
              />
            ))}
          </ContentWrap>
        </GridLayout>
        {/* Current Salary per month */}
        <GridLayout>
          <TitleWrap>
            <Title type="h4" className="inline pr-2">
              Current Salary per month
            </Title>
            <Tooltip text="The system is only used for job recommendation purposes. It is not visible to any users" />
          </TitleWrap>
          <ContentWrap>
            <div className="flex flex-row flex-nowrap gap-6">
              <Dropdown
                name="city"
                options={PROFILE_CURRENT_SALARY_CURRENCY}
                containerClassName="static h-12 font-semibold  outline-none border border-solid border-gray-300  rounded-md"
              />
              <Input
                type="number"
                name="current-salary"
                containerClassName="flex-1 flex flex-col appearance-none"
                inputClassName="appearance-none"
                required
                placeholder="Enter number"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(Number(e.target.value))}
              />
            </div>
          </ContentWrap>
        </GridLayout>
        {/* Expected Salary per month */}
        <GridLayout>
          <TitleWrap>
            <Title type="h4" className="inline pr-2">
              Expected Salary per month
            </Title>
          </TitleWrap>
          <ContentWrap>
            <div className="flex flex-row flex-nowrap gap-6">
              <Dropdown
                name="city"
                options={PROFILE_CURRENT_SALARY_CURRENCY}
                containerClassName="static h-12 font-semibold  outline-none border border-solid border-gray-300  rounded-md"
              />
              <div className="flex flex-row flex-1 gap-4">
                <Input
                  type="number"
                  name="salary-expect-from"
                  containerClassName="flex-1 flex flex-col appearance-none"
                  inputClassName="appearance-none"
                  required
                  placeholder="From"
                  value={expectedSalary.expectedSalaryFrom}
                  onChange={(e) =>
                    setExpectedSalary({
                      expectedSalaryFrom: Number(e.target.value),
                      expectedSalaryTo: expectedSalary.expectedSalaryTo,
                    })
                  }
                />
                <Input
                  type="number"
                  name="salary-expect-to"
                  containerClassName="flex-1 flex flex-col appearance-none"
                  inputClassName="appearance-none"
                  required
                  placeholder="To"
                  value={expectedSalary.expectedSalaryTo}
                  onChange={(e) =>
                    setExpectedSalary({
                      expectedSalaryFrom: expectedSalary.expectedSalaryFrom,
                      expectedSalaryTo: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </ContentWrap>
        </GridLayout>
        {/* Working Type */}
        <GridLayout>
          <TitleWrap>
            <Title type="h4" className="inline pr-2">
              Working Type
            </Title>
            <p className="font-medium text-base text-normal">
              Allow multiple choices
            </p>
          </TitleWrap>
          <ContentWrap>
            <div className="flex flex-row gap-6">
              <div className="flex flex-row flex-1 flex-wrap gap-2">
                {workingType.map((type, idx) => (
                  <ToggleButton
                    key={idx}
                    className="!rounded-full select-none"
                    onClick={() => {
                      const newWorkingType = workingType.map((t, i) =>
                        i === idx ? { ...t, isChecked: !t.isChecked } : t
                      );
                      setWorkingType(newWorkingType);
                    }}
                    checked={type.isChecked}
                    icon={
                      type.isChecked ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faPlus} />
                      )
                    }
                  >
                    {type.name}
                  </ToggleButton>
                ))}
              </div>
            </div>
          </ContentWrap>
        </GridLayout>
        {/* Company Type */}
        <GridLayout>
          <TitleWrap>
            <Title type="h4" className="inline pr-2">
              Company Type
            </Title>
            <p className="font-medium text-base text-normal">
              Allow multiple choices
            </p>
          </TitleWrap>
          <ContentWrap>
            <div className="flex flex-row flex-wrap gap-6">
              <div className="flex flex-row flex-1 flex-wrap gap-2">
                {companyType.map((type, idx) => (
                  <ToggleButton
                    key={idx}
                    className="!rounded-full select-none"
                    onClick={() => {
                      const newCompanyType = companyType.map((t, i) =>
                        i === idx ? { ...t, isChecked: !t.isChecked } : t
                      );
                      setCompanyType(newCompanyType);
                    }}
                    checked={type.isChecked}
                    icon={
                      type.isChecked ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faPlus} />
                      )
                    }
                  >
                    {type.name}
                  </ToggleButton>
                ))}
              </div>
            </div>
          </ContentWrap>
        </GridLayout>
        {/* Company Size */}
        <GridLayout>
          <TitleWrap>
            <Title type="h4" className="inline pr-2">
              Company Size
            </Title>
            <p className="font-medium text-base text-normal">
              Allow multiple choices
            </p>
          </TitleWrap>
          <ContentWrap>
            <div className="flex flex-row flex-wrap gap-6">
              <div className="flex flex-row flex-1 flex-wrap gap-2">
                {companySize.map((type, idx) => (
                  <ToggleButton
                    key={idx}
                    className="!rounded-full select-none"
                    onClick={() => {
                      const newCompanySize = companySize.map((t, i) =>
                        i === idx ? { ...t, isChecked: !t.isChecked } : t
                      );
                      setCompanySize(newCompanySize);
                    }}
                    checked={type.isChecked}
                    icon={
                      type.isChecked ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faPlus} />
                      )
                    }
                  >
                    {type.name}
                  </ToggleButton>
                ))}
              </div>
            </div>
          </ContentWrap>
        </GridLayout>
        {/* Location */}
        <GridLayout>
          <TitleWrap>
            <Title type="h4" className="col-start-1 col-end-3">
              Location
            </Title>
          </TitleWrap>
          <ContentWrap>
            <Dropdown
              options={HOMEPAGE_JOBS_CITIES}
              containerClassName={`outline-none border border-solid border-gray-300  rounded-md w-full font-semibold`}
              onChange={(e) => {
                setJobLocation(e.target.value);
              }}
              value={jobLocation}
            />
          </ContentWrap>
        </GridLayout>
        <Button
          className="w-fit py-4 px-20 rounded-md self-end"
          type="button"
          buttonType="primary"
        >
          Save
        </Button>
      </Card>
    </Wrapper>
  );
}

export default memo(JobPreferences);

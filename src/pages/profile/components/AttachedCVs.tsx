import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import Switch from "../../../components/Switch";
import { addObjectiveApi, getObjectivesApi } from "../../../services/api/objectiveApi";
import {
  getCitiesApi,
  getCountriesApi,
  getDesiredLevelsApi,
  getDistrictsApi,
  getEducationLevelsApi,
  getEmploymentTypesApi,
  getExperienceLevelsApi,
  getProfessionsApi,
  getWorkplacesApi,
} from "../../../services/api/publicApi";
import {
  CityType,
  CountryType,
  DesiredLevelType,
  DistrictType,
  EducationLevelType,
  EmploymentTypeType,
  ExperienceLevelType,
  ObjectiveType,
  ProfessionType,
  WorkplaceType,
} from "../../../utils/type";
import AttachedCVWrapper from "./AttachedCVWrapper";

const objectiveInitialState: ObjectiveType = {
  desired_position: "",
  desired_level: { id: 0, name: "" },
  education_level: { id: 0, name: "" },
  experience_level: { id: 0, name: "" },
  profession: { id: 0, name: "" },
  country: { id: 0, name: "" },
  city: { id: 0, name: "" },
  district: { id: 0, name: "" },
  work_address: "",
  employment_type: { id: 0, name: "" },
  salary_from: "",
  salary_to: "",
  status: "0",
  workplace: { id: 0, name: "" },
  file: "",
};

interface AddObjectiveArgs {
  objective: ObjectiveType;
  file: File;
}

const AttachedCVs: React.FC = () => {
  const [uploadedFile, setUploadedFiles] = useState<File | undefined>();
  const [objective, setObjective] = useState<ObjectiveType>(objectiveInitialState);
  const queryClient = useQueryClient();

  const { data: objectiveData } = useQuery({
    queryKey: ["objectives"],
    queryFn: () => getObjectivesApi(),
  });

  const { data: desiredLevelOptions } = useQuery({
    queryKey: ["desiredLevels"],
    queryFn: () => getDesiredLevelsApi(),
    select: (desiredLevelData) =>
      desiredLevelData.data.map((item: DesiredLevelType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: educationLevelOptions } = useQuery({
    queryKey: ["educationLevels"],
    queryFn: () => getEducationLevelsApi(),
    select: (educationLevelData) =>
      educationLevelData.data.map((item: EducationLevelType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: experienceLevelOptions } = useQuery({
    queryKey: ["experienceLevels"],
    queryFn: () => getExperienceLevelsApi(),
    select: (experienceLevelData) =>
      experienceLevelData.data.map((item: ExperienceLevelType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: professionOptions } = useQuery({
    queryKey: ["professions"],
    queryFn: () => getProfessionsApi(),
    select: (professionData) =>
      professionData.data.map((item: ProfessionType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: countryOptions } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountriesApi(),
    select: (countryData) =>
      countryData.data.map((item: CountryType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: cityOptions } = useQuery({
    queryKey: ["cities", objective?.country.id],
    queryFn: () => getCitiesApi(objective.country.id),
    enabled: !!objective?.country.id && objective.country.id !== 0,
    select: (cityData) =>
      cityData.data.map((item: CityType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: districtOptions } = useQuery({
    queryKey: ["districts", objective?.city.id],
    queryFn: () => getDistrictsApi(objective.city.id),
    enabled: !!objective?.city.id && objective.city.id !== 0,
    select: (districtData) =>
      districtData.data.map((item: DistrictType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: workplaceOptions } = useQuery({
    queryKey: ["workplaces"],
    queryFn: () => getWorkplacesApi(),
    select: (workplaceData) =>
      workplaceData.data.map((item: WorkplaceType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: employmentTypeOptions } = useQuery({
    queryKey: ["employmentTypes"],
    queryFn: () => getEmploymentTypesApi(),
    select: (employmentTypeData) =>
      employmentTypeData.data.map((item: EmploymentTypeType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { mutate: addObjective } = useMutation({
    mutationFn: ({ objective, file }: AddObjectiveArgs) => addObjectiveApi(objective, file),
    onSuccess: () => {
      toast.success("Objective added successfully");
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("objectives");
        },
      });
    },
    onError: () => {
      toast.error("Failed to add objective");
    },
  });

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setObjective((prevObjective) => {
      if (!prevObjective) return prevObjective;
      return {
        ...prevObjective,
        status: checked ? "1" : "0",
      };
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : undefined;
    setUploadedFiles(file);
    setObjective((prevObjective) => {
      if (!prevObjective || file === undefined) return prevObjective;
      return {
        ...prevObjective,
        file: URL.createObjectURL(file),
      };
    });
  };

  function handleObjectiveChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    if (name === "desired_position" || name === "work_address") {
      setObjective((prevObjective) => {
        if (!prevObjective) return prevObjective;
        return {
          ...prevObjective,
          [name]: value,
        };
      });
    } else if (name === "salary_from" || name === "salary_to") {
      setObjective((prevObjective) => {
        if (!prevObjective) return prevObjective;
        return {
          ...prevObjective,
          [name]: Number(value),
        };
      });
    } else {
      setObjective((prevObjective) => {
        if (!prevObjective) return prevObjective;
        return {
          ...prevObjective,
          [name]: {
            id: Number(value),
          },
        };
      });
    }
  }

  const handleSave = () => {
    if (uploadedFile) {
      addObjective(
        { objective, file: uploadedFile },
        {
          onSuccess: () => {
            setObjective(objectiveInitialState);
          },
        }
      );
    } else {
      toast.error("Please upload your CV");
    }
  };

  return (
    <Card className="md:col-span-3 bg-white md:flex hidden flex-col h-fit">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">
          Attached CVs{" "}
          {objectiveData && (
            <>
              <span>(</span>
              <span className="text-red-500">{objectiveData.data.length}</span>
              <span>)</span>
            </>
          )}
        </h3>
      </div>
      {objectiveData?.data && (
        <div className="p-4">
          {objectiveData.data.map((objective: ObjectiveType, index: number) => (
            <AttachedCVWrapper key={index} objective={objective} />
          ))}
        </div>
      )}

      <Modal
        title="Objectives"
        handleSave={handleSave}
        width="50%"
        buttonContent={
          <Button buttonType="primary" className="py-2 px-4 w-full rounded-sm">
            <FontAwesomeIcon icon={faArrowUpFromBracket} /> {""}
            Upload CV
          </Button>
        }>
        <form>
          <div className="flex items-center justify-between gap-8 mb-4">
            <div className="flex flex-1 flex-col items-start gap-1 mb-4">
              <label htmlFor="cv-file" className="mb-2">
                Your CV <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center justify-between gap-4 relative">
                <button className="py-2 text-[white] bg-[var(--color-primary)] px-3 border-none cursor-pointer text-base">
                  <FontAwesomeIcon icon={faArrowUpFromBracket} /> Upload file
                </button>
                <div className="text-base">
                  {uploadedFile ? uploadedFile.name : "No file chosen"}
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  id="file"
                  name="file"
                  className="absolute h-full top-0 left-0 w-full opacity-0 cursor-pointer overflow-hidden file-upload"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="status" className="mb-2">
                  Allow employers to see your CV
                </label>
                <Switch isOn={objective?.status === "1"} onToggle={handleToggle} name="status" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-8 mb-4">
            <div className="flex-1">
              <Input
                label="Desired position"
                name="desired_position"
                value={objective?.desired_position || ""}
                type="text"
                containerClassName="flex flex-col gap-1"
                onChange={handleObjectiveChange}
                required
              />
            </div>
            <div className="flex-1">
              <Input
                label="Desired level"
                placeholder="Select desired level"
                inputGroupType="styled-dropdown"
                name="desired_level"
                value={objective?.desired_level.id || ""}
                type="text"
                containerClassName="flex flex-col gap-1"
                onChange={handleObjectiveChange}
                options={desiredLevelOptions}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-8 mb-4">
            <div className="flex-1">
              <Input
                label="Education level"
                placeholder="Select education level"
                inputGroupType="styled-dropdown"
                name="education_level"
                value={objective?.education_level.id || ""}
                type="text"
                containerClassName="flex flex-col gap-1"
                onChange={handleObjectiveChange}
                options={educationLevelOptions}
                required
              />
            </div>
            <div className="flex-1">
              <Input
                label="Experience level"
                placeholder="Select experience level"
                inputGroupType="styled-dropdown"
                name="experience_level"
                value={objective?.experience_level.id || ""}
                type="text"
                containerClassName="flex flex-col gap-1"
                onChange={handleObjectiveChange}
                options={experienceLevelOptions}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-8 mb-4">
            <div className="flex-1">
              <Input
                label="Profession"
                placeholder="Select profession"
                inputGroupType="styled-dropdown"
                name="profession"
                value={objective?.profession.id || ""}
                type="text"
                containerClassName="flex flex-col gap-1"
                onChange={handleObjectiveChange}
                options={professionOptions}
                required
              />
            </div>
            <div className="flex-1">
              <Input
                label="Country"
                placeholder="Select country"
                inputGroupType="styled-dropdown"
                name="country"
                value={objective?.country.id || ""}
                type="text"
                containerClassName="flex flex-col gap-1"
                onChange={handleObjectiveChange}
                options={countryOptions}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-8 mb-4">
            <div className="flex-1">
              <Input
                label="City"
                placeholder="Select city"
                inputGroupType="styled-dropdown"
                name="city"
                value={objective?.city.id || ""}
                type="text"
                containerClassName="flex flex-col gap-1"
                onChange={handleObjectiveChange}
                options={cityOptions}
                required
              />
            </div>
            <div className="flex-1">
              <Input
                label="District"
                inputGroupType="styled-dropdown"
                name="district"
                value={objective?.district.id || ""}
                type="text"
                containerClassName="flex flex-col gap-1"
                onChange={handleObjectiveChange}
                options={districtOptions}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-8 mb-4">
            <div className="flex-1">
              <Input
                label="Work address"
                name="work_address"
                value={objective?.work_address || ""}
                type="text"
                containerClassName="flex flex-col gap-1"
                onChange={handleObjectiveChange}
                required
              />
            </div>
            <div className="flex-1">
              <Input
                label="Workplace"
                placeholder="Select workplace"
                inputGroupType="styled-dropdown"
                name="workplace"
                value={objective?.workplace.id || ""}
                type="text"
                containerClassName="flex flex-col gap-1"
                onChange={handleObjectiveChange}
                options={workplaceOptions}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-8 mb-4">
            <div className="flex-1">
              <Input
                label="Minimum expected salary"
                name="salary_from"
                value={objective?.salary_from || ""}
                type="number"
                containerClassName="flex flex-col gap-1"
                onChange={handleObjectiveChange}
                required
              />
            </div>
            <div className="flex-1">
              <Input
                label="Maximum expected salary"
                name="salary_to"
                value={objective?.salary_to || ""}
                type="number"
                containerClassName="flex flex-col gap-1"
                onChange={handleObjectiveChange}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="basis-[calc(50%-1rem)] ">
              <Input
                label="Employment type"
                placeholder="Select employment type"
                inputGroupType="styled-dropdown"
                name="employment_type"
                value={objective?.employment_type.id || ""}
                type="text"
                containerClassName="flex flex-col gap-1"
                onChange={handleObjectiveChange}
                options={employmentTypeOptions}
                required
              />
            </div>
          </div>
        </form>
      </Modal>
    </Card>
  );
};

export default AttachedCVs;

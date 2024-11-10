import { faArrowUpFromBracket, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import Switch from "../../../components/Switch";
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
  updateObjectiveApi,
} from "../../../services/api/objectiveApi";
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
import EditIcon from "../../../components/EditIcon";
import toast from "react-hot-toast";

interface Props {
  objective: ObjectiveType;
}

interface UpdateObjectiveArgs {
  objective: ObjectiveType;
  file: File;
}

const AttachedCVWrapper: React.FC<Props> = ({ objective }) => {
  const [uploadedFile, setUploadedFiles] = useState<File | undefined>();
  const [newObjective, setNewObjective] = useState<ObjectiveType>(objective);
  const queryClient = useQueryClient();

  const { data: desiredLevelData } = useQuery({
    queryKey: ["desiredLevels"],
    queryFn: () => getDesiredLevelsApi(),
  });

  const desiredLevelOptions =
    desiredLevelData?.data.map((item: DesiredLevelType) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const { data: educationLevelData } = useQuery({
    queryKey: ["educationLevels"],
    queryFn: () => getEducationLevelsApi(),
  });

  const educationLevelOptions =
    educationLevelData?.data.map((item: EducationLevelType) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const { data: experienceLevelData } = useQuery({
    queryKey: ["experienceLevels"],
    queryFn: () => getExperienceLevelsApi(),
  });

  const experienceLevelOptions =
    experienceLevelData?.data.map((item: ExperienceLevelType) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const { data: professionData } = useQuery({
    queryKey: ["professions"],
    queryFn: () => getProfessionsApi(),
  });

  const professionOptions =
    professionData?.data.map((item: ProfessionType) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const { data: countryData } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountriesApi(),
  });

  const countryOptions =
    countryData?.data.map((item: CountryType) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const { data: cityData } = useQuery({
    queryKey: ["cities", objective?.country.id],
    queryFn: () => getCitiesApi(objective.country.id),
    enabled: !!objective?.country.id && objective.country.id !== 0,
  });

  const cityOptions =
    cityData?.data.map((item: CityType) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const { data: districtData } = useQuery({
    queryKey: ["districts", objective?.city.id],
    queryFn: () => getDistrictsApi(objective.city.id),
    enabled: !!objective?.city.id && objective.city.id !== 0,
  });

  const districtOptions =
    districtData?.data.map((item: DistrictType) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const { data: workplaceData } = useQuery({
    queryKey: ["workplaces"],
    queryFn: () => getWorkplacesApi(),
  });

  const workplaceOptions =
    workplaceData?.data.map((item: WorkplaceType) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const { data: employmentTypeData } = useQuery({
    queryKey: ["employmentTypes"],
    queryFn: () => getEmploymentTypesApi(),
  });

  const employmentTypeOptions =
    employmentTypeData?.data.map((item: EmploymentTypeType) => ({
      value: item.id,
      label: item.name,
    })) || [];

  const { mutate: updateObjective } = useMutation({
    mutationFn: ({ objective, file }: UpdateObjectiveArgs) => updateObjectiveApi(objective, file),
    onSuccess: () => {
      toast.success("Objective updated successfully");
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes("objectives");
        },
      });
    },
    onError: () => {
      toast.error("Failed to update objective");
    },
  });

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setNewObjective((prevObjective) => {
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
    setNewObjective((prevObjective) => {
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
      setNewObjective((prevObjective) => {
        if (!prevObjective) return prevObjective;
        return {
          ...prevObjective,
          [name]: value,
        };
      });
    } else if (name === "salary_from" || name === "salary_to") {
      setNewObjective((prevObjective) => {
        if (!prevObjective) return prevObjective;
        return {
          ...prevObjective,
          [name]: Number(value),
        };
      });
    } else {
      setNewObjective((prevObjective) => {
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
      updateObjective(
        { objective: newObjective, file: uploadedFile },
        {
          onSuccess: () => {
            setNewObjective(newObjective);
          },
        }
      );
    } else {
      toast.error("Please upload your CV");
    }
  };
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div>
          <h3 className="text-lg font-semibold mb-1">{objective.desired_position}</h3>
          <p className="text-sm text-gray-400">
            Last updated {dayjs(objective.updated_at).format("DD/MM/YYYY HH:mm:ss")}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center">
        <Modal
          title="Objectives"
          handleSave={handleSave}
          width="50%"
          buttonContent={<EditIcon className="text-lg" />}
          buttonClassName="!p-0">
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
                  <Switch
                    isOn={newObjective?.status === "1"}
                    onToggle={handleToggle}
                    name="status"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-8 mb-4">
              <div className="flex-1">
                <Input
                  label="Desired position"
                  name="desired_position"
                  value={newObjective?.desired_position || ""}
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
                  value={newObjective?.desired_level.id || ""}
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
                  value={newObjective?.education_level.id || ""}
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
                  value={newObjective?.experience_level.id || ""}
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
                  value={newObjective?.profession.id || ""}
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
                  value={newObjective?.country.id || ""}
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
                  value={newObjective?.city.id || ""}
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
                  value={newObjective?.district.id || ""}
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
                  value={newObjective?.work_address || ""}
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
                  value={newObjective?.workplace.id || ""}
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
                  value={newObjective?.salary_from || ""}
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
                  value={newObjective?.salary_to || ""}
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
                  value={newObjective?.employment_type.id || ""}
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
        <FontAwesomeIcon
          icon={faTrashCan}
          className="text-gray-500 cursor-pointer hover:text-red-500"
        />
      </div>
    </div>
  );
};

export default AttachedCVWrapper;

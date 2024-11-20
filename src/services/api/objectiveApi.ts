import axios from "axios";
import { URL_API_OBJECTIVES } from "../../utils/constants";
import { ObjectiveType } from "../../utils/type";
import { generateConfig } from "./common";

export const getObjectivesApi = async () => {
  const config = await generateConfig();
  const response = await axios.get(`${URL_API_OBJECTIVES}`, config);
  return response.data;
};

export const addObjectiveApi = async (data: ObjectiveType, cvFile?: File) => {
  const config = await generateConfig();
  const formData = new FormData();
  if (cvFile) {
    formData.append("file", cvFile);
  }
  formData.append("desired_position", data.desired_position);
  formData.append("desired_level_id", String(data.desired_level.id));
  formData.append("education_level_id", String(data.education_level.id));
  formData.append("experience_level_id", String(data.experience_level.id));
  formData.append("profession_id", String(data.profession.id));
  formData.append("country_id", String(data.country.id));
  formData.append("city_id", String(data.city.id));
  formData.append("district_id", String(data.district.id));
  formData.append("work_address", data.work_address);
  formData.append("employment_type_id", String(data.employment_type.id));
  formData.append("salary_from", String(data.salary_from));
  formData.append("salary_to", String(data.salary_to));
  formData.append("status", data.status);
  formData.append("workplace_id", String(data.workplace.id));

  const response = await axios.post(`${URL_API_OBJECTIVES}`, formData, config);
  return response.data;
};

export const updateObjectiveApi = async (
  data: ObjectiveType,
  cvFile?: File,
) => {
  const config = await generateConfig();
  const formData = new FormData();
  if (cvFile) {
    formData.append("file", cvFile);
  }
  formData.append("desired_position", data.desired_position);
  formData.append("desired_level_id", String(data.desired_level.id));
  formData.append("education_level_id", String(data.education_level.id));
  formData.append("experience_level_id", String(data.experience_level.id));
  formData.append("profession_id", String(data.profession.id));
  formData.append("country_id", String(data.country.id));
  formData.append("city_id", String(data.city.id));
  formData.append("district_id", String(data.district.id));
  formData.append("work_address", data.work_address);
  formData.append("employment_type_id", String(data.employment_type.id));
  formData.append("salary_from", String(data.salary_from));
  formData.append("salary_to", String(data.salary_to));
  formData.append("status", data.status);
  formData.append("workplace_id", String(data.workplace.id));

  formData.append("_method", "PUT");

  const response = await axios.post(
    `${URL_API_OBJECTIVES}/${data.id}`,
    formData,
    config,
  );
  return response.data;
};

export const deleteObjectiveApi = async (id: number) => {
  const config = await generateConfig();
  const response = await axios.delete(`${URL_API_OBJECTIVES}/${id}`, config);
  return response.data;
};

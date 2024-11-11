import axios from "axios";
import { BASE_URL_API } from "../../utils/constants";

export const getDesiredLevelsApi = async () => {
  const response = await axios.get(`${BASE_URL_API}/api/desired-levels`);
  return response.data;
};

export const getEducationLevelsApi = async () => {
  const response = await axios.get(`${BASE_URL_API}/api/education-levels`);
  return response.data;
};

export const getExperienceLevelsApi = async () => {
  const response = await axios.get(`${BASE_URL_API}/api/experience-levels`);
  return response.data;
};

export const getProfessionsApi = async () => {
  const response = await axios.get(`${BASE_URL_API}/api/professions`);
  return response.data;
};

export const getEmploymentTypesApi = async () => {
  const response = await axios.get(`${BASE_URL_API}/api/employment-types`);
  return response.data;
};

export const getCountriesApi = async () => {
  const response = await axios.get(`${BASE_URL_API}/api/countries`);
  return response.data;
};

export const getCitiesApi = async (countryId: number) => {
  const response = await axios.get(`${BASE_URL_API}/api/countries/${countryId}/cities`);
  return response.data;
};

export const getDistrictsApi = async (cityId: number) => {
  const response = await axios.get(`${BASE_URL_API}/api/cities/${cityId}/districts`);
  return response.data;
};

export const getWorkplacesApi = async () => {
  const response = await axios.get(`${BASE_URL_API}/api/workplaces`);
  return response.data;
};

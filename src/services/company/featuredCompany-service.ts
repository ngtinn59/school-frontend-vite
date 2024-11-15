import axios from "axios";
import { BASE_URL_API } from "../../utils/constants";

export const getFeaturedCompanies = async () => {
  const response = await axios.get(
    `${BASE_URL_API}/api/list-companies/featured`,
  );
  return response.data;
};

export const getCompanyDetail = async (id: string | undefined) => {
  const response = await axios.get(`${BASE_URL_API}/api/list-companies/${id}`);
  return response.data;
};

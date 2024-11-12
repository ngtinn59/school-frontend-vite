import axios from "axios";
import { BASE_URL_API } from "../../utils/constants";
import { dataRegister } from "../../pages/employer/register";

export const registerEmployerApi = async (data: dataRegister) => {
  const response = await axios.post(
    `${BASE_URL_API}/api/employer/register`,
    data
  );
  return response.data;
};

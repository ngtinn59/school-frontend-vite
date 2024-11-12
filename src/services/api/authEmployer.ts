import { BASE_URL_API } from "../../utils/constants";
import { IDataRegister } from "../../pages/employer/register";
import { axiosInstance } from "../../utils/baseAxios";

export const registerEmployerApi = async (data: IDataRegister) => {
  const response = await axiosInstance.post(
    `${BASE_URL_API}/api/employer/register`,
    data
  );
  return response.data;
};

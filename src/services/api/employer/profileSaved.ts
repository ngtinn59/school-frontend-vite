import axios from "axios";
import { BASE_URL_API } from "../../../utils/constants";

export const getAllProfileSaved = async () => {
  const response = await axios.get(
    `${BASE_URL_API}/api/employer/candidates/saved`
  );
  return response.data;
};

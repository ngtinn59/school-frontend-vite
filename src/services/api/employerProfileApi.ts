import axios from "axios";
import { generateConfig, generateEmployerConfig } from "./common";
import { EMPLOYER_BE_API } from "../../modules";
import { EmployerProfileType } from "../../utils/type";
import { UploadFile } from "antd";
import { BASE_URL_API } from "../../utils/constants";

export const getEmployerProfile = async () => {
  const config = await generateConfig();
  const response = await axios.get(EMPLOYER_BE_API.PROFILE, config);
  return response.data;
};

export const updateEmployerProfileApi = async (
  profile: EmployerProfileType,
  logoFileList: UploadFile[],
  bannerFileList: UploadFile[]
) => {
  const config = await generateEmployerConfig();
  const formData = new FormData();
  formData.append("name", profile.name);
  formData.append("description", profile.description);
  formData.append("phone", profile.phone);
  formData.append("company_email", profile.company_email);
  formData.append("website", profile.website);
  formData.append("facebook", profile.facebook);
  formData.append("youtube", profile.youtube);
  formData.append("linked", profile.linked);
  formData.append("tax_code", profile.tax_code);
  formData.append("date_of_establishment", profile.date_of_establishment);
  formData.append("latitude", profile.latitude.toString());
  formData.append("longitude", profile.longitude.toString());
  formData.append("country_id", profile.country.id.toString());
  formData.append("city_id", profile.city.id.toString());
  formData.append("district_id", profile.district.id.toString());
  formData.append("address", profile.address);
  formData.append("company_type_id", profile.companyType.id.toString());
  formData.append("company_size_id", profile.companySize.id.toString());
  formData.append("working_days", profile.working_days);
  formData.append("overtime_policy", profile.overtime_policy);
  if (logoFileList && logoFileList.length > 0) {
    formData.append("logo", logoFileList[0].originFileObj as File);
  }
  if (bannerFileList && bannerFileList.length > 0) {
    formData.append("banner", bannerFileList[0].originFileObj as File);
  }

  const response = await axios.post(`${BASE_URL_API}/${EMPLOYER_BE_API.PROFILE}`, formData, config);
  return response.data;
};

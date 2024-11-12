import axios from "axios";
import { generateConfig } from "./common";
import { EMPLOYER_BE_API } from "../../modules";
import { EmployerProfileType } from "../../utils/type";

export const getEmployerProfile = async () => {
  const config = await generateConfig();
  const response = await axios.get(EMPLOYER_BE_API.PROFILE, config);
  return response.data;
};

export const updateEmployerProfile = async (
  profile: EmployerProfileType,
  logo?: File,
  banner?: File
) => {
  const config = await generateConfig();
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
  formData.append("company_type_id", profile.company_type.id.toString());
  formData.append("company_size_id", profile.company_size.id.toString());
  formData.append("working_days", profile.working_days);
  formData.append("overtime_policy", profile.overtime_policy);
  if (logo) {
    formData.append("logo", logo);
  }
  if (banner) {
    formData.append("banner", banner);
  }

  const response = await axios.post(EMPLOYER_BE_API.PROFILE, formData, config);
  return response.data;
};

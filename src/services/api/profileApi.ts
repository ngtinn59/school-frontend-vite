import axios from "axios";
import {
  URL_API_ABOUT_ME,
  URL_API_AWARDS,
  URL_API_CERTIFICATES,
  URL_API_EDUCATION,
  URL_API_EXPERIENCE,
  URL_API_PERSONAL_PROJECT,
  URL_API_PROFILE,
  URL_API_SKILLS,
} from "../../utils/constants";
import { convertSkillsToSkillType } from "../../utils/function/convertSkillsToSkillType";
import {
  AwardType,
  CertificateType,
  EducationType,
  PersonalProjectType,
  SkillType,
  WorkExperienceType,
} from "../../utils/type";
import { UserInformationType } from "../../utils/type/profileType";
import { generateConfig } from "./common";

// Api use to remove image and use default no avatar image
export const srcToFile = async (src: string, fileName: string) => {
  const response = await axios.get(src, {
    responseType: "blob",
  });
  const mimeType = response.headers["content-type"];
  return new File([response.data], fileName, { type: mimeType });
};

// Get user information api
export const getUserInformationApi = async () => {
  const config = await generateConfig();
  const response = await axios.get(`${URL_API_PROFILE}`, config);
  return response.data;
};

// Update user information api
export const updateUserInformationApi = async (
  data: UserInformationType,
  image: File | undefined
) => {
  const formDataToSend = new FormData();
  formDataToSend.append("name", data.name);
  formDataToSend.append("title", data.title);
  formDataToSend.append("email", data.email);
  formDataToSend.append("phone", data.phone);
  formDataToSend.append("birthday", data.birthday);
  data.gender && formDataToSend.append("gender", data.gender);
  data.location && formDataToSend.append("location", data.location);
  data.website && formDataToSend.append("website", data.website);
  if (image) {
    formDataToSend.append("image", image);
  }

  const config = await generateConfig();
  const response = await axios.post(`${URL_API_PROFILE}`, formDataToSend, config);
  return response.data;
};

// Get about me api
export const getAboutMeApi = async () => {
  const config = await generateConfig();
  const response = await axios.get(`${URL_API_ABOUT_ME}`, config);
  return response.data;
};

// Update about me api
export const updateAboutMeApi = async (description: string) => {
  const config = await generateConfig();
  const response = await axios.post(`${URL_API_ABOUT_ME}`, { description: description }, config);
  return response.data;
};

// Get user education api
export const getEducationApi = async () => {
  const config = await generateConfig();
  const response = await axios.get(`${URL_API_EDUCATION}`, config);
  return response.data;
};

// Add user education api
export const addEducationApi = async (education: EducationType) => {
  const config = await generateConfig();
  const response = await axios.post(
    `${URL_API_EDUCATION}`,
    {
      institution: education.institution,
      degree: education.degree,
      start_date: education.start_date,
      end_date: education.end_date,
      additionalDetail: education.additionalDetail || "",
    },
    config
  );
  return response.data;
};

// Update user education api
export const updateEducationApi = async (education: EducationType) => {
  const config = await generateConfig();
  const response = await axios.put(
    `${URL_API_EDUCATION}/${education.id}`,
    {
      institution: education.institution,
      degree: education.degree,
      start_date: education.start_date,
      end_date: education.end_date,
      additionalDetail: education.additionalDetail || "",
    },
    config
  );
  return response.data;
};

// Delete user education api
export const deleteEducationApi = async (educationId: number) => {
  const config = await generateConfig();
  const response = await axios.delete(`${URL_API_EDUCATION}/${educationId}`, config);
  return response.data;
};

// Get user experiences api
export const getWorkExperienceApi = async () => {
  const config = await generateConfig();
  const response = await axios.get(`${URL_API_EXPERIENCE}`, config);
  return response.data;
};

// add user experiences api
export const addWorkExperienceApi = async (workExperience: WorkExperienceType) => {
  const config = await generateConfig();
  const response = await axios.post(
    `${URL_API_EXPERIENCE}`,
    {
      position: workExperience.position,
      company: workExperience.company,
      start_date: workExperience.start_date,
      end_date: workExperience.end_date,
      responsibilities: workExperience.responsibilities,
    },
    config
  );
  return response.data;
};

// Update user experiences api
export const updateWorkExperienceApi = async (workExperience: WorkExperienceType) => {
  const config = await generateConfig();
  const response = await axios.put(
    `${URL_API_EXPERIENCE}/${workExperience.id}`,
    workExperience,
    config
  );
  return response.data;
};

// Delete user experiences api
export const deleteWorkExperienceApi = async (workExperienceId: string) => {
  const config = await generateConfig();
  const response = await axios.delete(`${URL_API_EXPERIENCE}/${workExperienceId}`, config);
  return response.data;
};

// Get user skills api
export const getSkillApi = async () => {
  const config = await generateConfig();
  const response = await axios.get(`${URL_API_SKILLS}`, config);
  return response.data;
};

// Update skill api
export const updateSkillApi = async (skill: { name: string; level: string }[]) => {
  const config = await generateConfig();
  const response = await axios.post(`${URL_API_SKILLS}`, skill, config);
  return response.data;
};

// Get project api
export const getPersonalProjectApi = async () => {
  const config = await generateConfig();
  const response = await axios.get(`${URL_API_PERSONAL_PROJECT}`, config);
  return response.data;
};

// Add project api
export const addPersonalProjectApi = async (personalProject: PersonalProjectType) => {
  const config = await generateConfig();
  const response = await axios.post(
    `${URL_API_PERSONAL_PROJECT}`,
    {
      title: personalProject.title,
      description: personalProject.description,
      start_date: personalProject.start_date,
      end_date: personalProject.end_date,
    },
    config
  );
  return response.data;
};

// update project api
export const updatePersonalProjectApi = async (personalProject: PersonalProjectType) => {
  const config = await generateConfig();
  const response = await axios.put(
    `${URL_API_PERSONAL_PROJECT}/${personalProject.id}`,
    personalProject,
    config
  );
  return response.data;
};

// Delete project api
export const deletePersonalProjectApi = async (personalProjectId: string) => {
  const config = await generateConfig();
  const response = await axios.delete(`${URL_API_PERSONAL_PROJECT}/${personalProjectId}`, config);
  return response.data;
};

// Get certificate api
export const getCertificateApi = async () => {
  const config = await generateConfig();
  const response = await axios.get(`${URL_API_CERTIFICATES}`, config);
  return response.data;
};

// Add certificate api
export const addCertificateApi = async (certificate: CertificateType) => {
  const config = await generateConfig();
  const response = await axios.post(
    `${URL_API_CERTIFICATES}`,
    {
      title: certificate.title,
      description: certificate.description,
      issueDate: certificate.issueDate,
      provider: certificate.provider,
      certificateUrl: certificate.certificateUrl,
    },
    config
  );
  return response.data;
};

// Update certificate api
export const updateCertificateApi = async (certificate: CertificateType) => {
  const config = await generateConfig();
  const response = await axios.put(
    `${URL_API_CERTIFICATES}/${certificate.id}`,
    {
      title: certificate.title,
      description: certificate.description,
      issueDate: certificate.issueDate,
      provider: certificate.provider,
      certificateUrl: certificate.certificateUrl,
    },
    config
  );
  return response.data;
};

// Delete certificate api
export const deleteCertificateApi = async (certificateId: string) => {
  const config = await generateConfig();
  const response = await axios.delete(`${URL_API_CERTIFICATES}/${certificateId}`, config);
  return response.data;
};

// Get award api
export const getAwardApi = async () => {
  const config = await generateConfig();
  const response = await axios.get(`${URL_API_AWARDS}`, config);
  return response.data;
};

// Add award api
export const addAwardApi = async (award: AwardType) => {
  const config = await generateConfig();
  const response = await axios.post(
    `${URL_API_AWARDS}`,
    {
      title: award.title,
      description: award.description,
      issueDate: award.issueDate,
      provider: award.provider,
    },
    config
  );
  return response.data;
};

// Update award api
export const updateAwardApi = async (award: AwardType) => {
  const config = await generateConfig();
  const response = await axios.put(
    `${URL_API_AWARDS}/${award.id}`,
    {
      title: award.title,
      description: award.description,
      issueDate: award.issueDate,
      provider: award.provider,
    },
    config
  );
  return response.data;
};

// Delete award api
export const deleteAwardApi = async (awardId: string) => {
  const config = await generateConfig();
  const response = await axios.delete(`${URL_API_AWARDS}/${awardId}`, config);
  return response.data;
};

// Get user profile api
export const getUserProfileApi = async (
  aboutMePromise: Promise<{ data: { description: string }[] }>,
  educationPromise: Promise<{ data: EducationType }>,
  workExperiencePromise: Promise<{ data: WorkExperienceType }>,
  personalProjectsPromise: Promise<{ data: PersonalProjectType }>,
  certificatePromise: Promise<{ data: CertificateType }>,
  awardPromise: Promise<{ data: AwardType }>,
  skillsPromise: Promise<{ data: SkillType }>
) => {
  try {
    const [
      aboutMeRes,
      educationRes,
      workExperienceRes,
      personalProjectRes,
      certificateRes,
      awardRes,
      skillsRes,
    ] = await Promise.all([
      aboutMePromise,
      educationPromise,
      workExperiencePromise,
      personalProjectsPromise,
      certificatePromise,
      awardPromise,
      skillsPromise,
    ]);
    const aboutMeData = aboutMeRes.data[0];
    const educationData = educationRes.data;
    const workExperienceData = workExperienceRes.data;
    const personalProjectData = personalProjectRes.data;
    const certificateResData = certificateRes.data;
    const awardData = awardRes.data;
    const skillsData = skillsRes.data;

    return {
      aboutMe: aboutMeData,
      education: educationData,
      workExperience: workExperienceData,
      personalProjects: personalProjectData,
      certificates: certificateResData || [],
      awards: awardData || [],
      skills: convertSkillsToSkillType(skillsData),
    };
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    // Handle error appropriately, e.g., show a message to the user
  }
};

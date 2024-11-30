import React from "react";

export type ApiLoginResponse = {
  status: number;
  data: {
    name?: string;
    token?: string;
    message?: string;
    id?: number;
    token_type?: string;
    success?: boolean;
  };
  errors?: {
    [key: string]: string[];
  };
};

export type LoaderLoginResponse = {
  id?: number;
  isLogin: boolean;
  token?: string;
  token_type?: string;
  name?: string;
};

export type ProfileNavLinkItemsType = {
  label: string;
  to: string;
}[];

export type ProfileDataCategoryType = {
  title: string;
  id: string;
  description: string;
  // icon: string;
  content?: React.ReactNode;
};

export type ProfileCategoryType = {
  aboutMe: ProfileDataCategoryType;
  education: ProfileDataCategoryType;
  workExperience: ProfileDataCategoryType;
  skills: ProfileDataCategoryType;
  personalProjects: ProfileDataCategoryType;
  certificates: ProfileDataCategoryType;
  awards: ProfileDataCategoryType;
  coverLetter: ProfileDataCategoryType;
};

export type ComponentSelectionWithSearchType = {
  id: number;
  name: string;
};

export type ProfileJobLevelType = {
  id: string;
  text: string;
};

export type ToggleType = {
  name: string;
  isChecked: boolean;
};

export type Duration = {
  start_date: string;
  end_date: string;
};

export type EducationType = {
  degree: string;
  institution: string;
  start_date: string;
  end_date: string;
  additionalDetail: string;
  id: number;
};

export type WorkExperienceType = {
  position: string;
  company: string;
  start_date: string;
  end_date: string;
  responsibilities: string;
  id: string;
};

export type SkillType = {
  excellent: string[];
  intermediate: string[];
  beginner: string[];
};

export type PersonalProjectType = {
  title: string;
  start_date: string;
  end_date: string;
  description: string;
  id: string;
};

export type CertificateType = {
  title: string;
  provider: string;
  issueDate: string;
  description: string;
  certificateUrl: string;
  id: string;
};

export type AwardType = {
  title: string;
  provider: string;
  issueDate: string;
  description: string;
  id: string;
};

export type ProfileDataForCV = {
  aboutMe: { description: string; id: number };
  education: EducationType[] | [];
  workExperience: WorkExperienceType[] | [];
  skills: SkillType;
  personalProjects: PersonalProjectType[] | [];
  certificates: CertificateType[] | [];
  awards: AwardType[] | [];
};

export type ObjectiveType = {
  id?: number;
  desired_position: string;
  desired_level: DesiredLevelType;
  education_level: EducationLevelType;
  profession: ProfessionType;
  employment_type: EmploymentTypeType;
  experience_level: ExperienceLevelType;
  workplace: WorkplaceType;
  work_address: string;
  salary_from: string;
  salary_to: string;
  file: string;
  status: string;
  country: CountryType;
  city: CityType;
  district: DistrictType;
  created_at?: string;
  updated_at?: string;
};

export type DesiredLevelType = {
  id: number;
  name: string;
};

export type EducationLevelType = {
  id: number;
  name: string;
};

export type ProfessionType = {
  id: number;
  name: string;
};

export type EmploymentTypeType = {
  id: number;
  name: string;
};

export type ExperienceLevelType = {
  id: number;
  name: string;
};

export type WorkplaceType = {
  id: number;
  name: string;
};

export type CountryType = {
  id: number;
  name: string;
};

export type CityType = {
  id: number;
  name: string;
};

export type DistrictType = {
  id: number;
  name: string;
};

export type FeaturedCompanyType = {
  id: number;
  company_name: string;
  logo: string;
  is_hot: number;
  city: CityType;
};

export type CompanyType = {
  id: number;
  logo: string;
  name: string;
  size?: string;
};

export type CompanyTypeType = {
  id: number;
  name: string;
};

export type CompanySizeType = {
  id: number;
  name: string;
};

export type CompanyDetailType = {
  id: number;
  country: CountryType;
  city: CityType;
  district: DistrictType;
  companyType: CompanyTypeType;
  companySize: CompanySizeType;
  name: string;
  phone: string;
  company_email: string;
  tax_code: string;
  date_of_establishment: string;
  working_days: string;
  overtime_policy: string;
  website: string;
  facebook: string;
  youtube: string;
  linked: string;
  logo: string;
  banner: string;
  address: string;
  latitude: string;
  longitude: string;
  description: string;
  jobs: JobType[];
};

export type SalaryType = {
  salary_from: number;
  salary_to: number;
};

export type JobType = {
  id: number;
  title: string;
  featured?: number;
  is_hot?: number;
  company?: CompanyType;
  salary: SalaryType;
  city: CityType;
  last_date: string;
  score?: number;

  experienceLevel?: ExperienceLevelType;
  views?: number;
  created_at?: string;
  desiredLevel?: DesiredLevelType;
  employmentType?: EmploymentTypeType;
  profession?: ProfessionType;
  workPlace?: WorkplaceType;
  educationLevel?: EducationLevelType;
  quantity?: number;
  logo?: string;
  description?: string;
  skill_experience?: string;
  benefits?: string;
  latitude?: string;
  longitude?: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  work_address?: string;
};

export type EmployerProfileType = {
  id: number;
  name: string;
  phone: string;
  company_email: string;
  tax_code: string;
  date_of_establishment: string;
  logo: string;
  banner: string;
  country: CountryType;
  city: CityType;
  district: DistrictType;
  address: string;
  companyType: CompanyType;
  companySize: CompanySizeType;
  working_days: string;
  overtime_policy: string;
  website: string;
  facebook: string;
  youtube: string;
  linked: string;
  latitude: number;
  longitude: number;
  description: string;
};

export type CVType = {
  id: number;
  desired_position: string;
  attached_file: string;
  file: string;
};

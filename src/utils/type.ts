import React from "react";

export type ApiLoginResponse = {
  status: number;
  data: {
    name?: string;
    token?: string;
    message?: string;

    token_type?: string;
    success?: boolean;
  };
  errors?: {
    [key: string]: string[];
  };
};

export type LoaderLoginResponse = {
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
  id: string;
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

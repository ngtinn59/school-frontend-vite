// import EditIcon from "../components/EditIcon";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getUserInformation,
  getUserProfile,
} from "../../../services/redux/user";
import AboutMeSection from "./components/AboutMeSection";
import CertificateSection from "./components/CertificateSection";
import EducationSection from "./components/EducationSection";
import PersonalDetailSection from "./components/PersonalDetailSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillSection from "./components/SkillSection";
import WorkExperienceSection from "./components/WorkExperienceSection";

type props = {
  className?: string;
};

export default function CVModern({ className }: props) {
  const userProfile = useSelector(getUserProfile);
  const userInformation = useSelector(getUserInformation);
  const [templateColor] = useState<string>("#012a4a");
  return (
    <div
      className={`${
        className ? className : ""
      }  overflow-hidden w-[763.6363636px] 2xl:w-[933.3333333px]    bg-white relative `}
    >
      {/* Main cv */}
      <div className="p-8 lg:p-10 grid grid-cols-12 bg-white after:w-[calc(100%+20rem)] after:h-48 after:lg:h-56 after:bg-gray-200 after:absolute after:-ml-6 after:rotate-3 after:-translate-y-16 lg:after:-translate-y-24 after:-translate-x-8 after:z-0  ">
        <div className="absolute z-10 top-0 left-0">
          <svg
            fill={templateColor}
            height="710"
            stroke={templateColor}
            viewBox="0 0 471 714"
            width="471"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M274.188 288.165L314 0H0V473L35.6199 329.558C36.4452 326.234 39.2939 323.805 42.7057 323.514L256.072 305.356C265.386 304.563 272.908 297.424 274.188 288.165Z"
              fill={templateColor}
            ></path>
          </svg>
        </div>
        {/* Left section */}
        <div className="flex flex-col gap-5 col-span-4 pr-4  z-20">
          {/* Personal Detail */}
          <PersonalDetailSection userInformation={userInformation} />
          {/* Education section */}
          <EducationSection
            education={userProfile.education}
            templateColor={templateColor}
          />
          {/* Render the skills section */}
          <SkillSection
            skills={userProfile.skills}
            templateColor={templateColor}
          />
        </div>
        <div className="col-span-1 2xl:hidden"></div>
        {/* Right section */}
        <div className="pl-4 col-span-7 2xl:col-span-8 flex flex-col  z-10">
          {/* About me  */}
          <AboutMeSection
            aboutMeDescription={userProfile.aboutMe?.description}
            profileImage={userInformation.image_url}
          />

          <div className="flex flex-col mt-6">
            {" "}
            {/* Render the work experience section */}
            <WorkExperienceSection
              workExperience={userProfile.workExperience}
              templateColor={templateColor}
            />
            {/* Projects section */}
            <ProjectsSection
              personalProjects={userProfile.personalProjects}
              templateColor={templateColor}
            />
            {/* Certificates section */}
            <CertificateSection
              certificates={userProfile.certificates}
              templateColor={templateColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

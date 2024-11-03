import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getUserInformation,
  getUserProfile,
} from "../../../services/redux/user";
import AboutMeSection from "./components/AboutMeSection";
import AwardsSection from "./components/AwardsSection";
import CertificateSection from "./components/CertificateSection";
import EducationSection from "./components/EducationSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillSection from "./components/SkillSection";
import WorkExperienceSection from "./components/WorkExperienceSection";
// import EditIcon from "../components/EditIcon";

type props = {
  className?: string;
};

export default function CVCubic({ className }: props) {
  const userProfile = useSelector(getUserProfile);
  const userInformation = useSelector(getUserInformation);
  const [templateColor, setTemplateColor] = useState<string>("#ed1b2f");
  useEffect(() => {
    setTemplateColor("#ed1b2f");
  }, []);
  return (
    <div className={`${className} bg-white overflow-hidden`}>
      {/* Render the personal information section */}
      <div className="   px-6 md:px-8 lg:px-12 pt-6 md:pt-8 lg:pt-12 pb-3 md:pb-4 lg:pb-6 relative">
        <div className="flex gap-6 flex-col md:flex-row items-center md:items-start">
          <div className=" w-full pl-20 ">
            {/* Decorative shape */}
            <div
              className={`absolute z-20 top-0 left-0 w-0 h-0 before:border-t-[4rem] before:border-r-[4rem]
              !before:border-t-[${templateColor}] before:border-t-cv_color_red 
               before:border-transparent rotate-90`}
            ></div>
            <div
              className={`absolute z-20 left-[6rem] top-[3rem] w-0 h-0 before:border-b-[3rem] before:border-l-[3rem] !before:border-b-[${templateColor}] before:border-b-cv_color_red    before:border-transparent rotate-90`}
            ></div>
            <div
              className={`absolute z-10 top-[1rem] left-[4.2rem] w-[8.5rem] h-[8.5rem] border border-solid border-[${templateColor}] border-cv_color_red `}
            >
              <div className="absolute -bottom-2 -right-2 w-[7rem] h-[8rem] bg-white  "></div>
            </div>

            {/* About Me section */}
            <AboutMeSection
              templateColor={templateColor}
              userInformation={userInformation}
              aboutMe={userProfile.aboutMe?.description}
            />
          </div>
        </div>
        {/* Decorative shape */}
        <div className="absolute right-0 top-20">
          <svg
            fill="none"
            height="204"
            viewBox="0 0 42 204"
            width="42"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 65.3579V32L42 0V204L23.3253 190.686V90.7749L0 65.3579Z"
              fill={templateColor ? templateColor : "#9A173F"}
            ></path>
          </svg>
        </div>
      </div>

      {/* Render the main section */}
      <div className=" px-6 md:px-8 lg:px-12 pt-3 md:pt-4 lg:pt-6 pb-3 md:pb-4 lg:pb-6  flex flex-col flex-nowrap gap-4 ">
        {/* Render the education section */}
        <EducationSection
          education={userProfile.education}
          templateColor={templateColor}
        />

        {/* Render the work experience section */}
        <WorkExperienceSection
          workExperience={userProfile.workExperience}
          templateColor={templateColor}
        />

        {/* Render the skills section */}
        <SkillSection
          skills={userProfile.skills}
          templateColor={templateColor}
        />

        {/* Render the personal projects section */}
        <ProjectsSection
          personalProjects={userProfile.personalProjects}
          templateColor={templateColor}
        />

        {/* Render the certificates section */}
        <CertificateSection
          certificates={userProfile.certificates}
          templateColor={templateColor}
        />

        {/* Render the awards section */}
        <AwardsSection
          awards={userProfile.awards}
          templateColor={templateColor}
        />
      </div>
    </div>
  );
}

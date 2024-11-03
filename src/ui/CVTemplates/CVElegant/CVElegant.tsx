import { useSelector } from "react-redux";
import Divider from "../../../components/Divider";
import {
  getUserInformation,
  getUserProfile,
} from "../../../services/redux/user";
import AboutMeSection from "./components/AboutMeSection";
import AwardsSection from "./components/AwardsSection";
import CertificatesSection from "./components/CertificatesSection";
import EducationSection from "./components/EducationSection";
import PersonalDetailSection from "./components/PersonalDetailSection";
import PersonalsProjectSection from "./components/PersonalsProjectSection";
import SkillSection from "./components/SkillSection";
import WorkExperienceSection from "./components/WorkExperienceSection";
// import EditIcon from "../components/EditIcon";

type props = {
  className?: string;
};

export default function CVElegant({ className }: props) {
  const userProfile = useSelector(getUserProfile);
  const userInformation = useSelector(getUserInformation);
  return (
    <div className={`${className} bg-white rounded-md overflow-hidden`}>
      {/* Render the personal information section */}
      <PersonalDetailSection userInformation={userInformation} />
      <div className="p-6  flex flex-col flex-nowrap gap-1">
        {/* Render the aboutMe section */}
        <AboutMeSection aboutMe={userProfile.aboutMe?.description} />
        <Divider />

        {/* Render the education section */}
        <EducationSection education={userProfile.education} />
        <Divider />

        {/* Render the work experience section */}
        <WorkExperienceSection workExperience={userProfile.workExperience} />
        <Divider />

        {/* Render the skills section */}
        <SkillSection skills={userProfile.skills} />
        <Divider />

        {/* Render the personal projects section */}
        <PersonalsProjectSection
          personalProjects={userProfile.personalProjects}
        />
        <Divider />

        {/* Render the certificates section */}
        <CertificatesSection certificates={userProfile.certificates} />
        <Divider />

        {/* Render the awards section */}
        <AwardsSection awards={userProfile.awards} />
      </div>
    </div>
  );
}

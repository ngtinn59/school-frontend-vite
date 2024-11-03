import { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
// import { ProfileDataForCV } from "../../utils/type";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../services/redux/user";
import AboutMe from "./components/AboutMe";
import Award from "./components/Award";
import Certificate from "./components/Certificate";
import { Education } from "./components/Education";
import PersonalProject from "./components/PersonalProject";
import ProfileQuality from "./components/ProfileQuality";
import Skill from "./components/Skill";
import UserInformation from "./components/UserInformation";
import WorkExperience from "./components/WorkExperience";
// import profile_cover_letter from "../assets/profile_cover_letter.svg";

export default function Profile() {
  const profileForCV = useSelector(getUserProfile);
  const [profileCTA, setProfileCTA] = useState<string[]>([]);

  // Check user quality
  useEffect(() => {
    const tempCTA = [];
    if (profileForCV.aboutMe?.description?.length === 0)
      tempCTA.push("Add About Me");
    if (profileForCV.education?.length === 0) tempCTA.push("Add Education");
    if (profileForCV.workExperience?.length === 0)
      tempCTA.push("Add Work Experience");

    if (
      !(
        profileForCV.skills.beginner &&
        profileForCV.skills.intermediate &&
        profileForCV.skills.excellent
      )
    )
      tempCTA.push("Add Skills");
    if (profileForCV.personalProjects?.length === 0)
      tempCTA.push("Add Personal Projects");
    if (profileForCV.certificates?.length === 0)
      tempCTA.push("Add Certificates");
    if (profileForCV.awards?.length === 0) tempCTA.push("Add Awards");

    setProfileCTA(tempCTA);
  }, [profileForCV]);
  return (
    <Wrapper className="">
      <div className="grid grid-cols-10 gap-6">
        <ProfileQuality profileCTA={profileCTA} />
        <div className="md:col-span-7 col-span-10 gap-6 grid">
          <UserInformation />
          <AboutMe aboutMe={profileForCV.aboutMe} />
          <Education educationList={profileForCV.education} />
          <WorkExperience workExperienceList={profileForCV.workExperience} />
          <Skill skills={profileForCV.skills} />
          <PersonalProject
            personalProjectList={profileForCV.personalProjects}
          />
          <Certificate certificateList={profileForCV.certificates} />
          <Award awardList={profileForCV.awards} />
        </div>
      </div>
    </Wrapper>
  );
}

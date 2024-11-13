import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import Title from "../../../components/Title";
import { CompanyDetailType } from "../../../utils/type";

interface SocialMediaProps {
  data: CompanyDetailType;
}

const SocialMedia: React.FC<SocialMediaProps> = ({ data }) => {
  function handleClickSocialMedia(url: string) {
    window.location.replace(url);
  }

  return (
    <>
      <Title type="h4" className="mt-4 text-blue-900">
        Website
      </Title>
      <div className="flex items-center gap-4">
        <FaFacebook
          className="text-blue-800"
          onClick={() => handleClickSocialMedia(data.facebook)}
        />
        <FaYoutube
          className="text-red-500"
          onClick={() => handleClickSocialMedia(data.youtube)}
        />
        <FaLinkedin
          className="text-blue-900"
          onClick={() => handleClickSocialMedia(data.linked)}
        />
      </div>
    </>
  );
};

export default SocialMedia;

import Title from "../../../components/Title";
import { CompanyDetailType } from "../../../utils/type";

interface AboutCompanyProps {
  data: CompanyDetailType;
}

const AboutCompany: React.FC<AboutCompanyProps> = ({ data }) => {
  return (
    <>
      <Title type="h4" className="text-blue-900">
        Về công ty
      </Title>
      <p className="text-justify">{data.description}</p>
    </>
  );
};

export default AboutCompany;

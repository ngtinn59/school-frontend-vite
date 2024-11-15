import Title from "../../../components/Title";
import { CompanyDetailType } from "../../../utils/type";

interface AboutCompanyProps {
  data: CompanyDetailType;
}

const AboutCompany: React.FC<AboutCompanyProps> = ({ data }) => {
  return (
    <>
      <Title type="h4" className="text-[var(--text-color-bold)]">
        About us
      </Title>
      <p className="text-justify text-[var(--text-color-normal)]">
        {data.description}
      </p>
    </>
  );
};

export default AboutCompany;

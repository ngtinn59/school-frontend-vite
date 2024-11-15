import { CompanyDetailType } from "../../../utils/type";

interface BannerProps {
  data: CompanyDetailType;
}

const Banner: React.FC<BannerProps> = ({ data }) => {
  return (
    <img
      src={data.banner || `/src/assets/banner_company.jpg`}
      alt={data.name}
      className="h-72 w-full rounded-md object-cover"
    />
  );
};

export default Banner;

import { PiUsersThreeBold } from "react-icons/pi";
import { CompanyType } from "../../../../../utils/type";
import { useNavigate } from "react-router-dom";

interface CompanyProps {
  companyData: CompanyType;
}

const Company: React.FC<CompanyProps> = ({ companyData }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex cursor-pointer items-center gap-2 rounded-md hover:bg-gray-100"
      onClick={() =>
        navigate(
          `/company/${companyData.name.replace(/ /g, "-")}` +
            `-${companyData.id}`,
        )
      }
    >
      <img
        src={companyData.logo}
        alt={companyData.name}
        className="h-14 rounded-lg border-[4px] border-white bg-white shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]"
      />

      <div>
        <p className="text-[var(--color-primary)]">{companyData.name}</p>
        <p className="flex items-center gap-1 text-xs text-gray-700">
          <PiUsersThreeBold /> {companyData.size}
        </p>
      </div>
    </div>
  );
};

export default Company;

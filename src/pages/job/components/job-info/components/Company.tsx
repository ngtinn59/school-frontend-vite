import { PiUsersThreeBold } from "react-icons/pi";
import { CompanyType } from "../../../../../utils/type";

interface CompanyProps {
  companyData: CompanyType;
}

const Company: React.FC<CompanyProps> = ({ companyData }) => {
  return (
    <div className="flex items-center gap-2">
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

import { PiBagSimpleBold, PiUsersThreeBold } from "react-icons/pi";
import { IoCalendarOutline, IoSave } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa";

import Title from "../../../components/Title";
import { CompanyDetailType } from "../../../utils/type";

interface HeaderProps {
  data: CompanyDetailType;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  return (
    <div className="relative flex justify-between p-2 shadow-lg">
      <img
        src={data.logo}
        alt={data.name}
        className="absolute -top-20 h-32 rounded-lg border-[4px] border-white bg-white shadow-[0px_0px_5px_1px_rgba(0,0,0,0.24)]"
      />
      <div className="w-40" />

      <div className="flex w-full justify-between">
        <div>
          <Title type="h3" className="text-[var(--color-primary)]">
            {data.name}
          </Title>

          <div className="flex space-x-8 text-[var(--text-color-normal)]">
            <p className="flex items-center gap-2">
              <PiBagSimpleBold />
              {data.companyType.name}
            </p>

            <p className="flex items-center gap-2">
              <PiUsersThreeBold />
              {data.companySize.name}
            </p>

            <p className="flex items-center gap-2">
              <IoCalendarOutline />
              {data.date_of_establishment}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <button className="hover:text-green-700">
            <p className="flex items-center gap-2">
              <IoSave />
              Save
            </p>
          </button>

          <button className="hover:text-green-700">
            <p className="flex items-center gap-2">
              <FaShareAlt />
              Share
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

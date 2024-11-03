import { NavLink, useLocation } from "react-router-dom";
import Wrapper from "../../../components/Wrapper";
import { PROFILE_NAV_LINK_ITEMS } from "../../../utils/constants";

function ProfileNavigation() {
  const path = useLocation().pathname;
  return (
    <nav className=" bg-white shadow-sm">
      <Wrapper className="pt-2">
        <div className="flex flex-row gap-2">
          {PROFILE_NAV_LINK_ITEMS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={`text-lg font-semibold p-2 hover:border-b-4 hover:border-solid hover:border-gray-200 focus:border-blue-600 ${
                path == link.to ? "text-blue-600 border-b-4 border-solid" : ""
              }`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </Wrapper>
    </nav>
  );
}

export default ProfileNavigation;

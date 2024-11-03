import { NavLink, Outlet, useLocation } from "react-router-dom";
import Wrapper from "../../../components/Wrapper";
import { JobSeekerRoute } from "../constants/routes.constant";

export default function WrapperLayout() {
  const path = useLocation().pathname;
  const links = [
    {
      to: JobSeekerRoute.employerList,
      label: "Employer List",
    },
    {
      to: JobSeekerRoute.jobList,
      label: "Job List",
    },
    {
      to: "/job/applied",
      label: "Job Applied",
    },
  ];
  return (
    <div className="bg-gray-100 h-full pb-8">
      <nav className=" bg-white shadow-sm">
        <Wrapper className="pt-2">
          <div className="flex flex-row gap-2">
            {links.map((link) => (
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
      <Outlet />
    </div>
  );
}

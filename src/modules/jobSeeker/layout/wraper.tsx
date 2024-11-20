import { NavLink, Outlet, useLocation } from "react-router-dom";
import Wrapper from "../../../components/Wrapper";
import { JobSeekerRoute } from "../constants/routes.constant";

export default function WrapperLayout() {
  const path = useLocation().pathname;
  const links = [
    {
      to: JobSeekerRoute.jobSaved,
      label: "Job Saved",
    },
    {
      to: "/job/applied",
      label: "Job Applied",
    },
  ];
  return (
    <div className="h-full bg-gray-100 pb-8">
      <nav className="bg-white shadow-sm">
        <Wrapper className="pt-2">
          <div className="flex flex-row gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={`p-2 text-lg font-semibold hover:border-b-4 hover:border-solid hover:border-gray-200 focus:border-blue-600 ${
                  path == link.to ? "border-b-4 border-solid text-blue-600" : ""
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

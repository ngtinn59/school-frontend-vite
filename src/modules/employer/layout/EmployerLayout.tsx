import { NavLink, Outlet, useLocation } from "react-router-dom";
import Toast from "../../../components/Toast";
import Footer from "../../../ui/Layout/Footer";
import Header from "./Header";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useAppSelector } from "../../../app/hooks";

import { EMPLOYER_ROUTES } from "../constants/routes.constant";
import { useEffect } from "react";
import { EmployerProfile } from "../../../pages/employer/profile";
import { EditProfile } from "../../../pages/employer/edit-profile";
import { ListJD } from "../../../pages/employer/list-jd";
import { ListApplication } from "../../../pages/employer/list-application";
import ProfileSaved from "../../../pages/employer/profile-saved";
import FindProfileCandidate from "../../../pages/employer/find-profile-candidate";

export function EmployerLayout(props: { hideTab?: boolean }) {
  const isLogin = useAppSelector((state) => state.employer.isLogin);
  const location = useLocation();

  const items: TabsProps["items"] = [
    {
      key: EMPLOYER_ROUTES.PROFILE,
      label: <NavLink to={EMPLOYER_ROUTES.PROFILE}>Profile</NavLink>,
      children: <EmployerProfile />,
    },
    {
      key: EMPLOYER_ROUTES.EDIT_PROFILE,
      label: <NavLink to={EMPLOYER_ROUTES.EDIT_PROFILE}>Edit Profile</NavLink>,
      children: <EditProfile />,
    },
    {
      key: EMPLOYER_ROUTES.LIST_JD,
      label: (
        <NavLink to={EMPLOYER_ROUTES.LIST_JD}>
          Job Description Management
        </NavLink>
      ),
      children: <ListJD />,
    },
    {
      key: EMPLOYER_ROUTES.LIST_APPLICATION,
      label: (
        <NavLink to={EMPLOYER_ROUTES.LIST_APPLICATION}>
          Applications Management
        </NavLink>
      ),
      children: <ListApplication />,
    },
    {
      key: EMPLOYER_ROUTES.LIST_CANDIDATE_PROFILE_SAVED,
      label: (
        <NavLink to={EMPLOYER_ROUTES.LIST_CANDIDATE_PROFILE_SAVED}>
          Candidate Profile Saved
        </NavLink>
      ),
      children: <ProfileSaved />,
    },
    {
      key: EMPLOYER_ROUTES.FIND_PROFILE_CANDIDATE,
      label: (
        <NavLink to={EMPLOYER_ROUTES.FIND_PROFILE_CANDIDATE}>
          Find Profile Candidate
        </NavLink>
      ),
      children: <FindProfileCandidate />,
    },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div className="relative h-screen">
      <Toast />
      <Header />

      <div className="absolute bottom-0 top-11 flex w-full flex-col items-center justify-between">
        <div className="w-full flex-1">
          {isLogin && !props.hideTab ? (
            <Tabs
              size="large"
              centered
              activeKey={location.pathname}
              defaultActiveKey={location.pathname}
              items={items}
            />
          ) : (
            <Outlet />
          )}
        </div>
        <Footer className="w-full pt-8" />
      </div>
    </div>
  );
}

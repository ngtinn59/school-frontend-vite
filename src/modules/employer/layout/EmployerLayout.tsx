import { NavLink, Outlet, useLocation } from "react-router-dom";
import Toast from "../../../components/Toast";
import Footer from "../../../ui/Layout/Footer";
import Header from "./Header";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useAppSelector } from "../../../app/hooks";

import { EMPLOYER_ROUTES } from "../constants/routes.constant";
import { useEffect } from "react";

export function EmployerLayout() {
  const isLogin = useAppSelector((state) => state.employer.isLogin);
  const location = useLocation();

  const items: TabsProps["items"] = [
    {
      key: EMPLOYER_ROUTES.PROFILE,
      label: <NavLink to={EMPLOYER_ROUTES.PROFILE}>Profile</NavLink>,
      children: <Outlet />,
    },
    {
      key: EMPLOYER_ROUTES.EDIT_PROFILE,
      label: <NavLink to={EMPLOYER_ROUTES.EDIT_PROFILE}>Edit Profile</NavLink>,
      children: <Outlet />,
    },
    {
      key: EMPLOYER_ROUTES.LIST_JD,
      label: (
        <NavLink to={EMPLOYER_ROUTES.LIST_JD}>
          Job Description Management
        </NavLink>
      ),
      children: <Outlet />,
    },
    {
      key: EMPLOYER_ROUTES.LIST_APPLICATION,
      label: (
        <NavLink to={EMPLOYER_ROUTES.LIST_APPLICATION}>
          Applications Management
        </NavLink>
      ),
      children: <Outlet />,
    },
    {
      key: EMPLOYER_ROUTES.LIST_CANDIDATE_PROFILE_SAVED,
      label: (
        <NavLink to={EMPLOYER_ROUTES.LIST_CANDIDATE_PROFILE_SAVED}>
          Candidate Profile Saved
        </NavLink>
      ),
      children: <Outlet />,
    },
  ];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div className="relative  h-screen">
      <Toast />
      <Header />

      <div className="absolute top-11 bottom-0  w-full   flex flex-col items-center justify-between">
        <div className="flex-1 w-full">
          {isLogin ? (
            <Tabs
              size="large"
              centered
              activeKey={
                location.pathname.includes("edit-jd") ||
                location.pathname.includes("create-jd")
                  ? EMPLOYER_ROUTES.LIST_JD
                  : location.pathname
              }
              defaultActiveKey={location.pathname}
              items={items}
            />
          ) : (
            <Outlet />
          )}
        </div>
        <Footer className=" w-full pt-8" />
      </div>
    </div>
  );
}

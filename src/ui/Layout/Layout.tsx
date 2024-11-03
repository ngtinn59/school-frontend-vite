import { Outlet } from "react-router-dom";

import Toast from "../../components/Toast";
import Footer from "./Footer";
import Header from "./Header";
import React from "react";

export default function Layout({ moreMenu }: { moreMenu?: React.JSX.Element }) {
  return (
    <div className="relative  h-screen">
      <Toast />
      <Header moreMenu={moreMenu} />
      <div className="absolute top-11 bottom-0  w-full   flex flex-col items-center justify-between">
        <div className="flex-1 w-full">
          <Outlet />
        </div>
        <Footer className=" w-full pt-8" />
      </div>
    </div>
  );
}

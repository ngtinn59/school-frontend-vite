import { Outlet } from "react-router-dom";
import Toast from "../../components/Toast";
import Header from "./Header";

export default function LayoutWithoutFooter() {
  return (
    <div className="relative  h-screen">
      <Toast />
      <Header />
      <div className="absolute top-11 bottom-0  w-full   flex flex-col items-center justify-between">
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

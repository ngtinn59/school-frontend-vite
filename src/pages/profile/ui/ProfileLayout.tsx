import { Outlet } from "react-router-dom";
import ProfileNavigation from "./ProfileNavigation";

export default function ProfileLayout() {
  return (
    <div className="bg-gray-100 h-full pb-8">
      <ProfileNavigation />
      <Outlet />
    </div>
  );
}

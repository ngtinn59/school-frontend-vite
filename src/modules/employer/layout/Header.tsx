import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import { EMPLOYER_ROUTES, employerActions } from "..";
import { useAppSelector } from "../../../app/hooks";
import logo from "../../../assets/brand_logo.svg";
import { RiChat1Line } from "react-icons/ri";
import { NotifcationIcon } from "../../notifications/NotificationIcon";
const Header: React.FC = () => {
  const dispatch = useDispatch();

  const { profile, isLogin } = useAppSelector((state) => state.employer);

  const handleSignOut = () => {
    dispatch(employerActions.logout());
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-fit max-w-full bg-gray-800">
      <div className="mx-auto flex items-center justify-between px-4 py-2 xl:max-w-[1280px]">
        <Link to="/" className="text-white">
          <img src={logo} alt="brand-logo" width={60} />
        </Link>

        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link to="/contact" className="text-white">
                Liên hệ
              </Link>
            </li>
            <li>
              {profile?.name && isLogin ? (
                <div className="flex items-center gap-2">
                  <Link
                    to={EMPLOYER_ROUTES.CONVERSATIONS}
                    className="text-white"
                  >
                    <RiChat1Line size={20} />
                  </Link>
                  <NotifcationIcon />

                  <span className="group relative">
                    <Link
                      to="/profile"
                      className="group/item flex flex-1 flex-row items-center gap-2 text-white"
                    >
                      Chào mừng {profile.name}
                      <div
                        className="relative block aspect-square w-8 rounded-full bg-cover bg-center bg-no-repeat p-1 shadow-md"
                        style={{
                          backgroundImage: `url(${profile.logo})`,
                        }}
                      ></div>
                    </Link>
                    <Button
                      className="absolute !hidden w-full rounded-md !bg-red-600 p-2 group-hover:!block"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </Button>
                  </span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link to="/sign-in" className="text-white">
                    Đăng nhập
                  </Link>
                  <Link to="/employer/login" className="text-white">
                    Đăng nhập nhà tuyển dụng
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

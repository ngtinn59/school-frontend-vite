import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import { employerActions } from "..";
import { useAppSelector } from "../../../app/hooks";
import logo from "../../../assets/brand_logo.svg";
const Header: React.FC = () => {
  const dispatch = useDispatch();

  const { profile, isLogin } = useAppSelector((state) => state.employer);

  const handleSignOut = () => {
    dispatch(employerActions.logout());
  };

  return (
    <header className="bg-gray-800 	max-w-full fixed right-0 left-0 z-50 top-0 h-fit">
      <div className="flex items-center justify-between px-4 py-2 mx-auto xl:max-w-[1280px]">
        <Link to="/" className="text-white">
          <img src={logo} alt="brand-logo" width={60} />
        </Link>

        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link to="/contact" className="text-white">
                Liên hệ
              </Link>
            </li>
            <li>
              {profile?.name && isLogin ? (
                <span className="group relative">
                  <Link
                    to="/profile"
                    className="text-white flex flex-row items-center flex-1 gap-2 group/item "
                  >
                    Chào mừng {profile.name}
                    <div
                      className="bg-cover bg-center bg-no-repeat rounded-full relative block p-1 aspect-square w-8 shadow-md"
                      style={{
                        backgroundImage: `url(${profile.logo})`,
                      }}
                    ></div>
                  </Link>
                  <Button
                    className="p-2 rounded-md !hidden group-hover:!block absolute w-full !bg-red-600"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Button>
                </span>
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

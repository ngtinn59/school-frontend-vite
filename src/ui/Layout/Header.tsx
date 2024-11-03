import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect } from "react-router-dom";
import logo from "../../assets/brand_logo.svg";
import {
  getUserInformation,
  getUserAuthentication,
  signOut,
} from "../../services/redux/user";
import Button from "../../components/Button";
import { signOutApi } from "../../services/api/authenticationApi";
import deleteCookie from "../../utils/function/deleteCookie";
import toast from "react-hot-toast";

const Header: React.FC<{ moreMenu?: React.JSX.Element }> = ({ moreMenu }) => {
  const user = useSelector(getUserAuthentication);
  const userInformation = useSelector(getUserInformation);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOutApi()
      .then((res) => {
        toast.success(res.message);
        redirect("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
    deleteCookie("token");
    deleteCookie("token_type");
    deleteCookie("name");
    dispatch(signOut());
  };
  return (
    <header className="bg-gray-800 	max-w-full fixed right-0 left-0 z-50 top-0 h-fit">
      <div className="flex items-center justify-between px-4 py-2 mx-auto xl:max-w-[1280px]">
        <Link to="/" className="text-white">
          <img src={logo} alt="brand-logo" width={60} />
        </Link>

        <nav>
          <ul className="flex space-x-4 items-center">
            {/* <li>
              <Link to="/" className="text-white">
                Tìm kiếm công việc
              </Link>
            </li> */}
            {/* <li>
              <Link to="/companies" className="text-white">
                Công Ty
              </Link>
            </li> */}
            <li>
              <Link to="/contact" className="text-white">
                Liên hệ
              </Link>
            </li>
            <li>
              <Link to="/create-cv" className="text-white">
                Tạo CV
              </Link>
            </li>

            {moreMenu}

            <li>
              {!(
                user.name === "" &&
                user.token === "" &&
                user.token_type === ""
              ) ? (
                <span className="group relative">
                  <Link
                    to="/profile"
                    className="text-white flex flex-row items-center flex-1 gap-2 group/item "
                  >
                    Chào mừng {user.name}
                    <div
                      className="bg-cover bg-center bg-no-repeat rounded-full relative block p-1 aspect-square w-8 shadow-md"
                      style={{
                        backgroundImage: `url(${userInformation.image_url})`,
                      }}
                    ></div>
                  </Link>
                  <Button
                    className="p-2 rounded-md !hidden group-hover:!block absolute w-full !bg-red-600"
                    // backgroundColor="#fff"
                    // textColor="#000"
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

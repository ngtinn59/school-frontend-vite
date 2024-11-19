import React, { useState } from "react";
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
import ModalChangePassword from "../../pages/employer/Modal/ModalChangePassword";

const Header: React.FC<{ moreMenu?: React.JSX.Element }> = ({ moreMenu }) => {
  const [openModal, setOpenModal] = useState(false);
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
    <header className="fixed left-0 right-0 top-0 z-50 h-fit max-w-full bg-gray-800">
      <div className="mx-auto flex items-center justify-between px-4 py-2 xl:max-w-[1280px]">
        <Link to="/" className="text-white">
          <img src={logo} alt="brand-logo" width={60} />
        </Link>

        <nav>
          <ul className="flex items-center space-x-4">
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
                    className="group/item flex flex-1 flex-row items-center gap-2 text-white"
                  >
                    Chào mừng {user.name}
                    <div
                      className="relative block aspect-square w-8 rounded-full bg-cover bg-center bg-no-repeat p-1 shadow-md"
                      style={{
                        backgroundImage: `url(${userInformation.image_url})`,
                      }}
                    ></div>
                  </Link>
                  <div className="absolute hidden w-full flex-col items-center gap-2 group-hover:flex">
                    <Button
                      className="w-full rounded-md !bg-red-600 p-2"
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      Change password
                    </Button>
                    <Button
                      className="w-full rounded-md !bg-red-600 p-2"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </Button>
                  </div>
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
      <ModalChangePassword open={openModal} setOpen={setOpenModal} />
    </header>
  );
};

export default Header;

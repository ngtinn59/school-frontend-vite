/* eslint-disable @typescript-eslint/ban-ts-comment */
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import toast from "react-hot-toast";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import icon_google from "../assets/icons/icon_google.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import Link from "../components/Link";
import Title from "../components/Title";
import Wrapper from "../components/Wrapper";
import { signInApi } from "../services/api/authenticationApi";
import { LOGIN_PAGE_TEXT_USP } from "../utils/constants";
import { ApiLoginResponse } from "../utils/type";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserAuthentication } from "../services/redux/user";
import { useAppSelector } from "../app/hooks";
import { EMPLOYER_ROUTES } from "../modules";
import ModalForgotPassword from "./employer/Modal/ModalForgotPassword";
import ModalChangePasswordUser from "./profile/ModalChangePasswordUser";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const alert = location.state?.alert;
  const user = useSelector(getUserAuthentication);
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  useEffect(() => {
    if (isSuccess) {
      setOpenChangePassword(true);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (alert) toast.error(alert, { duration: 1000 });
  }, []);

  useEffect(() => {
    if (user.name !== "" && user.token !== "" && user.token_type !== "") {
      navigate("/");
    }
  }, [navigate, user]);

  const employer = useAppSelector((state) => state.employer);

  useEffect(() => {
    if (employer.isLogin) {
      navigate(EMPLOYER_ROUTES.PROFILE);
    }
  }, [employer.isLogin, navigate]);

  return (
    <Wrapper>
      <div className="flex flex-col gap-4">
        <Title type="h2">Chào mừng đến với ITViec!</Title>
        <div className="flex w-full flex-col-reverse gap-10 md:flex-row md:gap-40">
          <div className="flex flex-col gap-4">
            <div className="text-base">
              Bằng cách đăng nhập, bạn đồng ý với{" "}
              <Link to="terms-conditions">Điều khoản & Điều kiện</Link> và{" "}
              <Link to="privacy-policy">Chính sách bảo mật</Link> của ITviec
              liên quan đến thông tin cá nhân của bạn.
            </div>
            <div>
              <Button
                buttonType="outline"
                type="button"
                className="h-12 w-full rounded-md"
              >
                <div className="flex flex-row items-center justify-center gap-4">
                  <span>
                    <img src={icon_google} className="h-8" />
                  </span>
                  <span>Đăng nhập bằng Google</span>
                </div>
              </Button>
            </div>
            <div className="flex flex-row items-center">
              <div className="flex-grow border-t-2 border-solid border-slate-200"></div>
              <div className="grid-1 px-2">hoặc</div>
              <div className="flex-grow border-t-2 border-solid border-slate-200"></div>
            </div>

            <Form method="POST" className="flex flex-col gap-4 text-base">
              <Input
                placeholder="Vui lòng nhập địa chỉ Email"
                type="text"
                name="email"
                id="login-email"
                containerClassName="flex flex-col gap-1"
                // required
                label="Địa chỉ Email"
              />

              <Input
                placeholder="Vui lòng nhập mật khẩu"
                type="password"
                name="password"
                label="Mật khẩu"
                id="login-password"
                containerClassName="flex flex-col gap-1"
                // required
              />
              <span>
                <Button
                  type="submit"
                  buttonType="primary"
                  className="h-12 w-full rounded-md"
                >
                  Đăng nhập
                </Button>
                <div
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="block cursor-pointer text-end"
                >
                  Quên mật khẩu?
                </div>
              </span>
            </Form>
            <div className="text-center">
              <span>Chưa có tài khoản? </span>
              <Link to="/sign-up">Đăng ký ngay!</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Title type="h2" className="">
              Đăng nhập để có quyền truy cập ngay vào hàng ngàn đánh giá và
              thông tin lương
            </Title>
            <ul className="flex flex-col">
              {LOGIN_PAGE_TEXT_USP.map((text, idx) => (
                <li key={idx}>
                  <span className="mr-2 text-xl text-green-500">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className="text-md text-lg">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ModalForgotPassword
          open={open}
          setOpen={setOpen}
          setIsSuccess={setIsSuccess}
        />
        <ModalChangePasswordUser
          open={openChangePassword}
          setOpen={setOpenChangePassword}
        />
      </div>
    </Wrapper>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const formToJSON: { [key: string]: FormDataEntryValue } = {};
  for (const [key, value] of form.entries()) {
    formToJSON[key] = value;
  }
  const email = formToJSON.email.toString();
  const password = formToJSON.password.toString();
  const res: ApiLoginResponse = await signInApi(email, password);
  console.log(res);
  if (res.status === 200) {
    document.cookie = `token=${res.data.token}`;
    document.cookie = `token_type=${res.data.token_type}`;
    document.cookie = `name=${res.data.name}`;
    document.cookie = `id=${res.data.id}`;
    console.log("res", res.data);
    toast.success("Đăng nhập thành công!");
    return redirect("/");
  } else {
    res.errors &&
      Object.keys(res.errors).forEach((key) => {
        res.errors &&
          toast.error(
            `${key[0].toUpperCase() + key.slice(1)}: ${res.errors[key].join(
              ", ",
            )}`,
          );
      });
    return null;
  }
};

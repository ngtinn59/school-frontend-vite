import { FormEventHandler, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Link, useNavigate } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Title from "../../components/Title";
import { LOGIN_PAGE_TEXT_USP } from "../../utils/constants";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utils/baseAxios";
import { employerActions } from "../../modules/employer/redux/employer.slice";
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_EMPLOYER_ID,
  EMPLOYER_BE_API,
  EMPLOYER_ROUTES,
} from "../../modules/employer";
import Cookies from "js-cookie";
import ModalForgotPassword from "./Modal/ModalForgotPassword";
import ModalChangePasswordUser from "../profile/ModalChangePasswordUser";

export const LoginEmployer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  useEffect(() => {
    if (isSuccess) {
      setOpenChangePassword(true);
    }
  }, [isSuccess]);
  const { mutate } = useMutation<Record<string, string>, unknown, FormData>({
    mutationKey: ["employer-login"],
    mutationFn: async (data) => {
      try {
        const result = await axiosInstance.post(EMPLOYER_BE_API.LOGIN, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return result.data;
      } catch (error: any) {
        if (error.response.data.error) {
          Object.values(error.response.data.error).forEach((err) => {
            toast.error(err as string);
          });
        }
        throw error;
      }
    },
  });

  const onLogin: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    mutate(formData, {
      onSuccess: (result: Record<string, string>) => {
        toast.success("Đăng Nhập thành công");
        Cookies.set(COOKIE_ACCESS_TOKEN, result.access_token);
        Cookies.set(COOKIE_EMPLOYER_ID, result.id);
        dispatch(employerActions.setLogin(true));
        navigate(EMPLOYER_ROUTES.PROFILE);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Wrapper>
      <div className="flex flex-col gap-4">
        <Title type="h2">Welcome to ITViec!</Title>
        <div className="flex w-full flex-col-reverse gap-10 md:flex-row md:gap-40">
          <div className="flex flex-col gap-4">
            <div className="text-base">
              By signing in, you agree to ITviec’s{" "}
              <Link to="terms-conditions"> Terms & Conditions</Link> and{" "}
              <Link to="privacy-policy">Privacy Policy</Link> in relation to
              your privacy information.
            </div>

            <div className="flex flex-row items-center">
              <div className="flex-grow border-t-2 border-solid border-slate-200"></div>
              <div className="grid-1 px-2">or</div>
              <div className="flex-grow border-t-2 border-solid border-slate-200"></div>
            </div>

            <Form onSubmit={onLogin} className="flex flex-col gap-4 text-base">
              <Input
                placeholder="Email"
                type="text"
                name="email"
                id="login-email"
                containerClassName="flex flex-col gap-1"
                // required
                label="Email"
              />

              <Input
                placeholder="Password"
                type="password"
                name="password"
                label="Password"
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
                  Login
                </Button>
                <div
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="block cursor-pointer text-end"
                >
                  Forgot password?
                </div>
              </span>
            </Form>
            <div className="text-center">
              <span>Do not have an account? </span>
              <Link to="/employer/register">Sign up now!</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Title type="h2" className="">
              Sign in to get instant access to thousands of reviews and salary
              information
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
          setIsSuccess={setIsSuccess}
          open={open}
          setOpen={setOpen}
        />
        <ModalChangePasswordUser
          open={openChangePassword}
          setOpen={setOpenChangePassword}
        />
      </div>
    </Wrapper>
  );
};

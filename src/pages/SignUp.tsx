import { useState } from "react";
import toast from "react-hot-toast";
import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import icon_google from "../assets/icons/icon_google.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import Link from "../components/Link";
import Title from "../components/Title";
import Wrapper from "../components/Wrapper";
import { signUpApi } from "../services/api/authenticationApi";

export default function SignUp() {
  const [isAgreeGoogle, setIsAgreeGoogle] = useState(true);
  const [isAgreeTerms, setIsAgreeTerms] = useState(true);
  console.log(isAgreeGoogle, "isAgreeGoogle");
  return (
    <Wrapper>
      <div className="flex flex-col gap-4">
        <Title type="h2">Chào mừng bạn đến với việc làm cái bè!</Title>
        <div className="flex w-full flex-col-reverse gap-10 md:flex-row md:gap-40">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-row items-center">
              <div className="flex-grow border-t-2 border-solid border-slate-200"></div>
              <div className="flex-grow border-t-2 border-solid border-slate-200"></div>
            </div>

            <Form method="POST" className="flex flex-col gap-4 text-base">
              <Input
                placeholder="Vui lòng nhập họ và tên"
                type="text"
                name="name"
                id="sign-up-name"
                required
                label="Họ và tên"
                containerClassName="flex flex-col gap-1"
              />
              <Input
                placeholder="Vui lòng nhập địa chỉ Email"
                type="text"
                name="email"
                id="sign-up-email"
                required
                label="Địa chỉ Email"
                containerClassName="flex flex-col gap-1"
              />

              <Input
                placeholder="Vui lòng nhập mật khẩu"
                type="password"
                name="password"
                label="Mật khẩu"
                id="sign-up-password"
                containerClassName="flex flex-col gap-1"
                required
              />
              <div className="text-base">
                <Input
                  type="checkbox"
                  placeholder=""
                  name="sign-with-google"
                  required
                  containerClassName="contents"
                  inputClassName="h-6 w-6 transform translate-y-1.5 mr-1"
                  onChange={() => {
                    setIsAgreeTerms(!isAgreeTerms);
                  }}
                />{" "}
                Tôi đã đọc và đồng ý với{" "}
                <Link to="terms-conditions">Điều khoản & Điều kiện</Link> và{" "}
                <Link to="privacy-policy">Chính sách Bảo mật</Link> liên quan
                đến thông tin riêng tư của bạn.
              </div>
              <span>
                <Button
                  type="submit"
                  buttonType={isAgreeTerms ? "disabled" : "primary"}
                  className="h-12 w-full rounded-md"
                >
                  Đăng ký
                </Button>
              </span>
            </Form>

            <div className="text-center">
              <span>Đã có tài khoản?</span>
              <Link to="/sign-in">Đăng nhập ngay bây giờ!</Link>
            </div>
          </div>
          <div className="hidden flex-1 gap-4 lg:block">
            <img
              src="src/assets/sign-up-robot-image.png"
              className="w-full max-w-96"
            />
          </div>
        </div>
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

  try {
    const email = formToJSON.email.toString();
    const password = formToJSON.password.toString();
    const name = formToJSON.name.toString();
    const res = await signUpApi(email, password, name);
    if (res.status === 200) {
      toast.success(res.data.message as string);
      return redirect("/");
    } else {
      res.errors &&
        Object.keys(res.errors).forEach((key) => {
          res.errors &&
            toast.error(
              `${key[0].toUpperCase() + key.slice(1)}: ${res.errors[key].join(", ")}`,
            );
        });
      return redirect("/sign-up");
    }
  } catch (err) {
    toast.error(err as string);
  }
};

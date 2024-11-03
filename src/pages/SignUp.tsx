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
        <Title type="h2">Welcome to ITViet!</Title>
        <div className="flex flex-col-reverse md:flex-row md:gap-40 gap-10 w-full">
          <div className="flex flex-col gap-4 flex-1 ">
            <div className="text-base ">
              <Input
                type="checkbox"
                placeholder=""
                name="sign-with-google"
                onChange={() => {
                  setIsAgreeGoogle(!isAgreeGoogle);
                }}
                containerClassName="contents"
                inputClassName="h-6 w-6 transform translate-y-1.5 mr-1 "
              />
              By signing up with Google, I agree to ITviec’s{" "}
              <Link to="terms-conditions"> Terms & Conditions</Link> and{" "}
              <Link to="privacy-policy">Privacy Policy</Link> in relation to
              your privacy information.
            </div>
            <div>
              <Button
                buttonType={isAgreeGoogle ? "disabled" : "outline"}
                type="button"
                className="w-full h-12 rounded-md"
              >
                <div className="flex flex-row justify-center items-center gap-4">
                  <span>
                    <img src={icon_google} className="h-8" />
                  </span>
                  <span>Sign Up with Google</span>
                </div>
              </Button>
            </div>
            <div className="flex flex-row items-center">
              <div className="flex-grow border-t-2 border-slate-200 border-solid"></div>
              <div className="grid-1 px-2">or</div>
              <div className="flex-grow border-t-2 border-slate-200 border-solid"></div>
            </div>

            <Form method="POST" className="text-base flex flex-col gap-4">
              <Input
                placeholder="Name"
                type="text"
                name="name"
                id="sign-up-name"
                required
                label="Name"
                containerClassName="flex flex-col gap-1"
              />
              <Input
                placeholder="Email"
                type="text"
                name="email"
                id="sign-up-email"
                required
                label="Email"
                containerClassName="flex flex-col gap-1"
              />

              <Input
                placeholder="Password"
                type="password"
                name="password"
                label="Password"
                id="sign-up-password"
                containerClassName="flex flex-col gap-1"
                required
              />
              <div className="text-base ">
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
                I have read and agree to ITviec’s{" "}
                <Link to="terms-conditions"> Terms & Conditions</Link> and{" "}
                <Link to="privacy-policy">Privacy Policy</Link> in relation to
                your privacy information.
              </div>
              <span>
                <Button
                  type="submit"
                  buttonType={isAgreeTerms ? "disabled" : "primary"}
                  className="w-full h-12 rounded-md"
                >
                  Sign Up
                </Button>
              </span>
            </Form>

            <div className="text-center">
              <span>Already have an account? </span>
              <Link to="/sign-in">Sign In Now!</Link>
            </div>
          </div>
          <div className="flex-1 gap-4 lg:block hidden">
            <img
              src="src/assets/sign-up-robot-image.png"
              className=" w-full max-w-96"
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
      document.cookie = `token=${res.data.token}`;
      document.cookie = `token_type=${res.data.token_type}`;
      document.cookie = `name=${res.data.name}`;
      console.log("res", res.data);
      toast.success(res.data.message as string);
      return redirect("/");
    } else {
      res.errors &&
        Object.keys(res.errors).forEach((key) => {
          res.errors &&
            toast.error(
              `${key[0].toUpperCase() + key.slice(1)}: ${res.errors[key].join(
                ", "
              )}`
            );
        });
      return redirect("/sign-up");
    }
  } catch (err) {
    toast.error(err as string);
  }
};

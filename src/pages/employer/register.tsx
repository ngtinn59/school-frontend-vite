import { FormEventHandler, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import icon_google from "../../assets/icons/icon_google.svg";
import logo_robot from "../../assets/sign-up-robot-image.png";
import Wrapper from "../../components/Wrapper";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Link from "../../components/Link";
import Button from "../../components/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/baseAxios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { EMPLOYER_BE_API } from "../../modules";
import { BASE_URL_API } from "../../utils/constants";
import axios from "axios";

export default function EmployerRegister() {
  const [isAgreeGoogle, setIsAgreeGoogle] = useState(true);
  const [isAgreeTerms, setIsAgreeTerms] = useState(true);
  const navigate = useNavigate();

  const [country, setCountry] = useState();
  const [city, setCity] = useState();

  const { mutate } = useMutation<unknown, unknown, FormData>({
    mutationKey: ["employer-register"],
    mutationFn: async (data) => {
      try {
        const result = await axiosInstance.post(
          EMPLOYER_BE_API.REGISTER,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return result.data;
      } catch (error: any) {
        if (error.response.data.errors) {
          Object.values(error.response.data.errors).forEach((err) => {
            toast.error(err as string);
          });
        }
        throw error;
      }
    },
    onSuccess: (data: any) => {
      axios.post(
        `${BASE_URL_API}/${EMPLOYER_BE_API.SKILL}`,
        {
          skills: [
            {
              name: "JAVA",
            },
            {
              name: "HTML",
            },
            {
              name: "CSS",
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      );
    },
  });

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await axiosInstance.get(EMPLOYER_BE_API.COUNTRY);
      return response.data.data;
    },
  });

  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(EMPLOYER_BE_API.CITIES);
        return response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onRegister: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.delete("sign-with-google");
    mutate(formData, {
      onSuccess: () => {
        toast.success("Đăng ký thành công");
        navigate("/employer/login");
      },
    });
  };
  return (
    <Wrapper>
      <div className="flex flex-col gap-4">
        <Title type="h2">Welcome to ITViet!</Title>
        <div className="flex flex-col-reverse md:flex-row md:gap-40 gap-10 w-full">
          <div className="flex flex-col gap-4 flex-1 mb-10">
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

            <Form
              method="POST"
              onSubmit={onRegister}
              className="text-base flex flex-col gap-4"
            >
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

              <label htmlFor="country_id">
                Country <span className="text-red-600">*</span>
              </label>
              <Select
                id="country_id"
                placeholder="Country"
                className="h-12"
                onSelect={(value) => {
                  setCountry(value);
                }}
                options={countries?.map(
                  (country: { name: string; id: number }) => ({
                    label: country.name,
                    value: country.id,
                  })
                )}
              />
              <input type="number" name="country_id" hidden value={country} />

              <label htmlFor="city_id">
                City <span className="text-red-600">*</span>
              </label>
              <Select
                id="city_id"
                options={cities?.map((city: { name: string; id: number }) => ({
                  label: city.name,
                  value: city.id,
                }))}
                onSelect={(value) => {
                  setCity(value);
                }}
                placeholder="City"
                className="h-12"
              />
              <input type="number" name="city_id" hidden value={city} />

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
                />
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
              <Link to="/employer/login">Sign In Now!</Link>
            </div>
          </div>
          <div className="flex-1 gap-4 lg:block hidden">
            <img src={logo_robot} className=" w-full max-w-96" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

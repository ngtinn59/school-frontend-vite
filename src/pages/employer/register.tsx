import { Button, Form, Steps } from "antd";
import Wrapper from "../../components/Wrapper";
import { IoIosLock } from "react-icons/io";
import { useState } from "react";
import RegisterFormAccount from "./Form/RegisterFormAccount";
import RegisterFormInforCompany from "./Form/RegisterFormInforCompany";
import { Link, useNavigate } from "react-router-dom";
import { registerEmployerApi } from "../../services/api/authEmployer";
import dayjs from "dayjs";
import toast from "react-hot-toast";
export interface IDataRegister {
  name: string;
  email: string;
  password: string;
  country_id?: number | null;
  city_id?: number | null;
  company_name?: string;
  company_email?: string;
  address?: string;
  phone: string;
  company_size_id?: number | null;
  company_type_id?: number | null;
  date_of_establishment?: string;
  website?: string;
  tax_code?: string;
  district_id?: number | null;
  confirmPassword?: string;
}

const initialDataRegister: IDataRegister = {
  name: "",
  email: "",
  password: "",
  country_id: null,
  city_id: null,
  company_name: "",
  company_email: "",
  address: "",
  phone: "",
  company_size_id: null,
  company_type_id: null,
  date_of_establishment: "",
  website: "",
  tax_code: "",
  district_id: null,
};

const EmployerRegister: React.FC = () => {
  const navigate = useNavigate();
  const [formRegister] = Form.useForm();
  const [dataRegister, setDataRegister] =
    useState<IDataRegister>(initialDataRegister);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectCountryId, setSelectCountryId] = useState<number>(0);
  const [selectCityId, setSelectCityId] = useState<number>(0);

  const [current, setCurrent] = useState<number>(0);
  const next = () => {
    formRegister.validateFields().then(() => {
      setCurrent(current + 1);
    });
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const onValuesChange = (
    changedValues: IDataRegister,
    allValues: IDataRegister
  ) => {
    setDataRegister({ ...dataRegister, ...allValues });
    if (changedValues.country_id) {
      formRegister.setFieldsValue({ city_id: null, district_id: null });
      setSelectCountryId(changedValues.country_id);
      setSelectCityId(0);
    }
    if (changedValues.city_id) {
      formRegister.setFieldsValue({ district_id: null });
      setSelectCityId(changedValues.city_id);
    }
  };

  const handleRegisterAccount = async (data: IDataRegister) => {
    setLoading(true);
    const { confirmPassword, date_of_establishment, ...dataRegister } = data;
    const date_of_establishment_format = dayjs(date_of_establishment).format(
      "YYYY/MM/DD"
    );
    const dataRegisterEmployer = {
      ...dataRegister,
      date_of_establishment: date_of_establishment_format,
    };
    try {
      const res = await registerEmployerApi(dataRegisterEmployer);
      if (res && res.success) {
        toast.success(res.message);
        formRegister.resetFields();
        setDataRegister(initialDataRegister);
        setSelectCityId(0);
        setSelectCountryId(0);
        navigate("/employer/login");
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        for (const field in errors) {
          if (Object.prototype.hasOwnProperty.call(errors, field)) {
            const errorMessage = errors[field][0];
            console.log(`${field} error: `, errorMessage);
            toast.error(errorMessage);
          }
        }
      } else {
        console.log("error: ", error);
      }
    }
    setLoading(false);
  };

  const onFinish = async () => {
    handleRegisterAccount(dataRegister);
  };

  const steps = [
    {
      title: "Thông tin tài khoản",
      content: <RegisterFormAccount />,
    },
    {
      title: "Thông tin công ty",
      content: (
        <RegisterFormInforCompany
          form={formRegister}
          selectCountryId={selectCountryId}
          setSelectCountryId={setSelectCountryId}
          selectCityId={selectCityId}
          setSelectCityId={setSelectCityId}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <Wrapper>
      <div className="flex items-center justify-center py-4 mb-8">
        <div className="max-w-screen-md p-10  bg-gray-100 w-full shadow-lg rounded-lg">
          {/* title */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center bg-red-500 w-10 h-10 text-2xl text-white rounded-full">
              <IoIosLock />
            </div>
            <h1 className="text-center font-semibold text-slate-700 text-xl">
              Đăng ký tài khoản nhà tuyển dụng
            </h1>
          </div>
          {/* Step */}
          <div className="mt-4">
            <Steps
              size="small"
              items={items}
              status="process"
              current={current}
            />
          </div>
          {/* form */}
          <div className="mt-6">
            <Form
              name="register-employer"
              layout="vertical"
              form={formRegister}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onValuesChange={onValuesChange}
              disabled={loading}
            >
              {steps[current].content}
            </Form>
          </div>
          <div className="flex items-center justify-end mt-6 gap-2">
            {current > 0 && (
              <Button loading={loading} onClick={prev} className="mr-2">
                Quay lại
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" className="bg-blue-500" onClick={next}>
                Tiếp tục
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                loading={loading}
                type="primary"
                className="bg-blue-500"
                onClick={() => formRegister.submit()}
              >
                Đăng ký
              </Button>
            )}
          </div>
          {/* Have an account */}
          {current < steps.length - 1 && (
            <div className="text-end mt-5">
              <Link
                to="/employer/login"
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Đã có tài khoản? Đăng nhập
              </Link>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default EmployerRegister;

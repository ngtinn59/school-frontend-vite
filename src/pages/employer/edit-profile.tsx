import {
  Avatar,
  Button,
  Form,
  Input,
  Select,
  Typography,
  FormProps,
} from "antd";
import { useAppSelector } from "../../app/hooks";
import { useForm } from "antd/es/form/Form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EMPLOYER_BE_API, EMPLOYER_ROUTES } from "../../modules";
import { axiosInstance } from "../../utils/baseAxios";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const EditProfile = () => {
  const profile = useAppSelector((state) => state.employer.profile);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [form] = useForm();

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await axiosInstance.get(EMPLOYER_BE_API.COUNTRY);
      return response.data.data;
    },
    select: (data) => {
      return data.map((country: { name: string; id: number }) => ({
        label: country.name,
        value: country.id,
      }));
    },
  });

  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await axiosInstance.get(EMPLOYER_BE_API.CITIES);
      return response.data.data;
    },
    select: (data) => {
      return data.map((city: { name: string; id: number }) => ({
        label: city.name,
        value: city.id,
      }));
    },
  });

  const { data: companyTypes } = useQuery({
    queryKey: ["companyTypes"],
    queryFn: async () => {
      const response = await axiosInstance.get(EMPLOYER_BE_API.COMPANY_TYPES);
      return response.data.data;
    },
    select: (data) => {
      return data.map((type: { name: string; id: number }) => ({
        label: type.name,
        value: type.id,
      }));
    },
  });

  const { data: companySize } = useQuery({
    queryKey: ["companySize"],
    queryFn: async () => {
      const response = await axiosInstance.get(EMPLOYER_BE_API.COMPANY_SIZE);
      return response.data.data;
    },
    select: (data) => {
      return data.map((size: { name: string; id: number }) => ({
        label: size.name,
        value: size.id,
      }));
    },
  });

  const { mutate } = useMutation<unknown, unknown, any>({
    mutationKey: ["editProfileEmployer"],
    mutationFn: async (payload) => {
      const response = await axiosInstance.post(
        EMPLOYER_BE_API.PROFILE,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
  });

  const onEdit: FormProps["onFinish"] = (values: Record<string, any>) => {
    const formData = new FormData();
    Object.entries(values).map(([key, value]) => {
      if (key === "logo") {
        if (value) {
          formData.append(key, value.target.files.item(0));
        }

        return;
      }
      formData.append(key, value);
    });

    mutate(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        queryClient.invalidateQueries({
          queryKey: ["employer-profile"],
        });
        navigate(EMPLOYER_ROUTES.PROFILE);
      },
    });
  };

  useEffect(() => {
    const profileData = { ...profile };
    if (profileData?.logo) delete profileData.logo;

    form.setFieldsValue({
      ...profileData,
      country_id: countries?.find((i: any) => i.label === profileData?.country)
        ?.value,
      city_id: cities?.find((i: any) => i.label === profileData?.city)?.value,
      company_type_id: companyTypes?.find(
        (i: any) => i.label === profileData?.companyType
      )?.value,
      company_size_id: companySize?.find(
        (i: any) => i.label === profileData?.companySize
      )?.value,
    });
  }, [profile, form, cities, countries, companySize, companyTypes]);

  return (
    <div className="max-w-2xl mx-auto">
      <div>
        <Avatar
          size={100}
          src={
            <img
              src={
                profile?.logo ??
                `https://avatar.iran.liara.run/username?username=${profile?.name?.slice(
                  0
                )}+${profile?.name?.slice(1)}`
              }
              alt="avatar"
            />
          }
        />
      </div>

      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Edit Employer Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          You can correct your profile.
        </p>
      </div>

      <Form
        scrollToFirstError
        onFinish={onEdit}
        className="mt-5"
        layout="vertical"
        form={form}
      >
        <Form.Item
          required
          rules={[
            {
              required: true,
            },
          ]}
          valuePropName="about"
          label="logo"
          name="logo"
        >
          <Input type="file" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>country</Typography.Title>}
          required
          rules={[{ required: true, message: "'country' is required" }]}
          name="country_id"
        >
          <Select options={countries} placeholder="country" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>city</Typography.Title>}
          required
          rules={[{ required: true, message: "'city' is required" }]}
          name="city_id"
        >
          <Select options={cities} placeholder="city" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>address</Typography.Title>}
          required
          rules={[{ required: true }]}
          name="address"
        >
          <TextArea placeholder="address" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>company type</Typography.Title>}
          required
          rules={[{ required: true, message: "'company types' is required" }]}
          name="company_type_id"
        >
          <Select options={companyTypes} placeholder="company types" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>company size</Typography.Title>}
          required
          rules={[{ required: true, message: "'company size' is required" }]}
          name="company_size_id"
        >
          <Select options={companySize} placeholder="company size" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>name</Typography.Title>}
          required
          rules={[{ required: true }]}
          name="name"
        >
          <Input placeholder="name" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>working days</Typography.Title>}
          required
          rules={[{ required: true, message: "'working days' is required" }]}
          name="Working_days"
        >
          <Input placeholder="Working_days" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>overtime policy</Typography.Title>}
          required
          rules={[{ required: true, message: "'overtime policy' is required" }]}
          name="Overtime_policy"
        >
          <TextArea placeholder="overtime policy" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>website</Typography.Title>}
          required
          rules={[{ required: true, message: "'website' is required" }]}
          name="webstie"
        >
          <Input placeholder="website" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>facebook</Typography.Title>}
          required
          rules={[{ required: true }]}
          name="facebook"
        >
          <Input placeholder="facebook" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>description</Typography.Title>}
          required
          rules={[{ required: true }]}
          name="description"
        >
          <TextArea placeholder="description" />
        </Form.Item>

        <div className="flex gap-4 my-4 justify-center">
          <Button onClick={() => navigate(EMPLOYER_ROUTES.PROFILE)}>
            Cancel
          </Button>
          <Button htmlType="submit" className="bg-[#1677ff]" type="primary">
            Edit
          </Button>
        </div>
      </Form>
    </div>
  );
};

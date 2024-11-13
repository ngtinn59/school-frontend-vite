import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  Select,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { EMPLOYER_ROUTES } from "../../modules";
import { updateEmployerProfileApi } from "../../services/api/employerProfileApi";
import {
  getCitiesApi,
  getCompanySizesApi,
  getCompanyTypesApi,
  getCountriesApi,
  getDistrictsApi,
} from "../../services/api/publicApi";
import {
  CityType,
  CompanySizeType,
  CompanyType,
  CountryType,
  DistrictType,
  EmployerProfileType,
} from "../../utils/type";
import toast from "react-hot-toast";

interface UpdateEmployerProfileArgs {
  profile: EmployerProfileType;
  logoFileList: UploadFile[];
  bannerFileList: UploadFile[];
}

interface EmployerProfileFormValues extends EmployerProfileType {
  logoFile: any;
  bannerFile: any;
}

export const EditProfile = () => {
  const profile = useAppSelector((state) => state.employer.profile);
  const queryClient = useQueryClient();
  const [selectedCountryId, setSelectedCountryId] = useState<number>(0);
  const [logoFileList, setLogoFileList] = useState<UploadFile[]>([]);
  const [bannerFileList, setBannerFileList] = useState<UploadFile[]>([]);

  const [selectedCityId, setSelectedCityId] = useState<number>(0);

  const navigate = useNavigate();

  const [form] = useForm<EmployerProfileFormValues>();

  const { data: countryOptions } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountriesApi(),
    select: (countryData) =>
      countryData.data.map((item: CountryType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: cityOptions } = useQuery({
    queryKey: ["cities", selectedCountryId],
    queryFn: () => getCitiesApi(selectedCountryId),
    enabled: !!selectedCountryId && selectedCountryId !== 0,
    select: (cityData) =>
      cityData.data.map((item: CityType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: districtOptions } = useQuery({
    queryKey: ["districts", selectedCityId],
    queryFn: () => getDistrictsApi(selectedCityId),
    enabled: !!selectedCityId && selectedCityId !== 0,
    select: (districtData) =>
      districtData.data.map((item: DistrictType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: companyTypeOptions } = useQuery({
    queryKey: ["companyTypes"],
    queryFn: () => getCompanyTypesApi(),
    select: (data) => {
      return data.data.map((type: CompanyType) => ({
        label: type.name,
        value: type.id,
      }));
    },
  });

  const { data: companySizeOptions } = useQuery({
    queryKey: ["companySize"],
    queryFn: () => getCompanySizesApi(),
    select: (data) => {
      return data.data.map((size: CompanySizeType) => ({
        label: size.name,
        value: size.id,
      }));
    },
  });

  const handleLogoUploadChange: UploadProps["onChange"] = ({ fileList }) => {
    setLogoFileList(fileList);
  };

  const handleBannerUploadChange: UploadProps["onChange"] = ({ fileList }) => {
    setBannerFileList(fileList);
  };

  const { mutate: updateEmployerProfile, isPending: isUpdating } = useMutation({
    mutationFn: ({ profile, logoFileList, bannerFileList }: UpdateEmployerProfileArgs) =>
      updateEmployerProfileApi(profile, logoFileList, bannerFileList),
  });

  const onEdit: FormProps["onFinish"] = (values: EmployerProfileFormValues) => {
    updateEmployerProfile(
      { profile: { ...profile, ...values }, logoFileList, bannerFileList },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            predicate: (query) => {
              return query.queryKey[0] === "employer-profile";
            },
          });
          setLogoFileList([]);
          setBannerFileList([]);
          toast.success(data.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  useEffect(() => {
    if (profile) {
      if (profile?.country?.id) {
        setSelectedCountryId(profile.country.id);
      }

      const isCityExist = Boolean(
        cityOptions?.find(
          (city: { value: number; label: string }) => city.value === profile.city.id
        )
      );
      if (isCityExist) {
        setSelectedCityId(profile.city.id);
      }

      const isDistrictExist = Boolean(
        districtOptions?.find(
          (district: { value: number; label: string }) => district.value === profile.district.id
        )
      );
      form.setFieldsValue({
        ...profile,
        city: {
          ...profile.country,
          id: isCityExist ? profile.city.id : undefined,
        },
        district: {
          ...profile.city,
          id: isDistrictExist ? profile.district.id : undefined,
        },
      });
    }
  }, [profile, form, cityOptions, districtOptions]);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="relative">
        {profile?.banner && (
          <img
            src={
              bannerFileList && bannerFileList.length > 0
                ? URL.createObjectURL(bannerFileList[0].originFileObj as File)
                : profile.banner
            }
            alt="banner"
            className="w-full h-48 object-cover rounded-t-lg"
          />
        )}
        <div className="absolute top-30 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {profile && (
            <Avatar
              size={100}
              src={
                logoFileList && logoFileList.length > 0
                  ? URL.createObjectURL(logoFileList[0].originFileObj as File)
                  : profile.banner
                  ? profile.banner
                  : `https://avatar.iran.liara.run/username?username=${profile?.name?.slice(
                      0
                    )}+${profile?.name?.slice(1)}`
              }
            />
          )}
        </div>
      </div>

      {/* <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Edit Employer Profile</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          You can correct your profile.
        </p>
      </div> */}

      <Form scrollToFirstError onFinish={onEdit} className="mt-12" layout="vertical" form={form}>
        <Form.Item
          name="logoFile"
          label={<Typography.Title level={5}>Logo</Typography.Title>}
          required
          rules={[
            {
              validator: () => {
                if (logoFileList && logoFileList.length < 1) {
                  return Promise.reject(new Error("Please upload your logo"));
                }
                return Promise.resolve();
              },
            },
          ]}>
          <Upload
            maxCount={1}
            accept="images/**"
            beforeUpload={() => false}
            onChange={handleLogoUploadChange}
            onRemove={() => {
              setLogoFileList([]);
              form.setFieldsValue({ logoFile: undefined });
            }}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="bannerFile"
          label={<Typography.Title level={5}>Banner</Typography.Title>}
          required
          rules={[
            {
              validator: () => {
                if (bannerFileList && bannerFileList.length < 1) {
                  return Promise.reject(new Error("Please upload your banner"));
                }
                return Promise.resolve();
              },
            },
          ]}>
          <Upload
            maxCount={1}
            accept="images/**"
            beforeUpload={() => false}
            onChange={handleBannerUploadChange}
            onRemove={() => {
              setBannerFileList([]);
              form.setFieldsValue({ bannerFile: undefined });
            }}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Company name</Typography.Title>}
          required
          rules={[{ required: true }]}
          name="name">
          <Input placeholder="Company name" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Company email</Typography.Title>}
          required
          rules={[
            { required: true, message: "Company email is required" },
            { type: "email", message: "Invalid email" },
          ]}
          name="company_email">
          <Input placeholder="Company email" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Phone number</Typography.Title>}
          required
          rules={[{ required: true, message: "Phone number is required" }]}
          name="phone">
          <Input placeholder="Phone" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Description</Typography.Title>}
          required
          rules={[{ required: true }]}
          name="description">
          <TextArea rows={3} placeholder="Description" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Website</Typography.Title>}
          required
          rules={[{ required: true, message: "Website is required" }]}
          name="website">
          <Input placeholder="Website" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Facebook</Typography.Title>}
          name="facebook"
          required
          rules={[{ required: true, message: "Facebook is required" }]}>
          <Input placeholder="Facebook" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Youtube</Typography.Title>}
          name="youtube"
          required
          rules={[{ required: true, message: "Youtube is required" }]}>
          <Input placeholder="Youtube" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>LinkedIn</Typography.Title>}
          name="linked"
          required
          rules={[{ required: true, message: "LinkedIn is required" }]}>
          <Input placeholder="Linked" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Tax code</Typography.Title>}
          required
          rules={[{ required: true, message: "Tax code is required" }]}
          name="tax_code">
          <Input placeholder="Tax code" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Date of establishment</Typography.Title>}
          name="date_of_establishment"
          rules={[
            {
              required: true,
              message: "'Date of establishment' is required",
            },
          ]}
          getValueProps={(value: string) => ({
            value: value && dayjs(value),
          })}
          normalize={(value: Dayjs) => value && value.format("YYYY-MM-DD")}>
          <DatePicker className="w-full" format="DD/MM/YYYY" placeholder="Date of establishment" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Country</Typography.Title>}
          required
          rules={[{ required: true, message: "'country' is required" }]}
          name={["country", "id"]}>
          <Select
            options={countryOptions}
            placeholder="country"
            onChange={(value) => {
              setSelectedCountryId(value);
              form.setFieldsValue({ city: undefined });
            }}
          />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>City</Typography.Title>}
          required
          rules={[{ required: true, message: "'city' is required" }]}
          name={["city", "id"]}>
          <Select
            options={cityOptions}
            placeholder="City"
            onChange={(value) => {
              setSelectedCityId(value);
              form.setFieldsValue({ district: undefined });
            }}
          />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>District</Typography.Title>}
          required
          rules={[{ required: true, message: "'District' is required" }]}
          name={["district", "id"]}>
          <Select options={districtOptions} placeholder="District" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Address</Typography.Title>}
          required
          rules={[{ required: true }]}
          name="address">
          <TextArea placeholder="address" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Company type</Typography.Title>}
          required
          rules={[{ required: true, message: "'company types' is required" }]}
          name={["companyType", "id"]}>
          <Select options={companyTypeOptions} placeholder="Company types" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Company size</Typography.Title>}
          required
          rules={[{ required: true, message: "'company size' is required" }]}
          name={["companySize", "id"]}>
          <Select options={companySizeOptions} placeholder="Company size" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Working days</Typography.Title>}
          required
          rules={[{ required: true, message: "'working days' is required" }]}
          name="working_days">
          <Input placeholder="Working days" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Overtime policy</Typography.Title>}
          required
          rules={[{ required: true, message: "'Overtime policy' is required" }]}
          name="overtime_policy">
          <TextArea rows={6} placeholder="overtime policy" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Latitude</Typography.Title>}
          required
          name="latitude">
          <Input placeholder="Latitude" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>Longitude</Typography.Title>}
          required
          name="longitude">
          <Input placeholder="Longitude" />
        </Form.Item>

        <div className="flex gap-4 my-4 justify-center">
          <Button
            onClick={() => navigate(EMPLOYER_ROUTES.PROFILE)}
            loading={isUpdating}
            disabled={isUpdating}>
            Cancel
          </Button>
          <Button
            htmlType="submit"
            className="bg-[#1677ff]"
            type="primary"
            loading={isUpdating}
            disabled={isUpdating}>
            Edit
          </Button>
        </div>
      </Form>
    </div>
  );
};

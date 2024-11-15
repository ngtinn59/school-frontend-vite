import React, { useEffect, useState } from "react";
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import {
  getCitiesApi,
  getCountriesApi,
  getDesiredLevelsApi,
  getDistrictsApi,
  getEducationLevelsApi,
  getEmploymentTypesApi,
  getExperienceLevelsApi,
  getProfessionsApi,
  getWorkplacesApi,
} from "../../../services/api/publicApi";
import {
  CityType,
  CountryType,
  DesiredLevelType,
  DistrictType,
  EducationLevelType,
  EmploymentTypeType,
  ExperienceLevelType,
  ProfessionType,
  WorkplaceType,
} from "../../../utils/type";
import { getPostJob } from "../../../services/api/employer/managePostJob";

import dayjs from "dayjs";

interface IModalCreateEditJobPosting {
  open: boolean;
  setOpen: (value: boolean) => void;
  isEdit: boolean;
  dataDetail: any;
  setDataDetail: (value: any) => void;
  isLoading: boolean;
  handleUpdateJobPosting: (id: number, data: any) => void;
  handleCreateJobPosting: (values: any) => void;
}

export interface JobPosting {
  id: number;
  title: string;
  profession: {
    id: number;
    name: string;
  };
  desiredLevel: {
    id: number;
    name: string;
  };
  workPlace: {
    id: number;
    name: string;
  };
  employmentType: {
    id: number;
    name: string;
  };
  quantity: number;
  salary_from: number;
  salary_to: number;
  educationLevel: {
    id: number;
    name: string;
  };
  last_date: string;
  description: string;
  skill_experience: string;
  benefits: string;
  country: {
    id: number;
    name: string;
  };
  city: {
    id: number;
    name: string;
  };
  district: {
    id: number;
    name: string;
  };
  work_address: string;
  latitude: string;
  longitude: string;
  contact_name: string;
  phone: string;
  email: string;
  featured: number;
}

export const initialJobPosting: JobPosting = {
  id: 0,
  title: "",
  profession: {
    id: 0,
    name: "",
  },
  desiredLevel: {
    id: 0,
    name: "",
  },
  workPlace: {
    id: 0,
    name: "",
  },
  employmentType: {
    id: 0,
    name: "",
  },
  quantity: 0,
  salary_from: 0,
  salary_to: 0,
  educationLevel: {
    id: 0,
    name: "",
  },
  last_date: "",
  description: "",
  skill_experience: "",
  benefits: "",
  country: {
    id: 0,
    name: "",
  },
  city: {
    id: 0,
    name: "",
  },
  district: {
    id: 0,
    name: "",
  },
  work_address: "",
  latitude: "",
  longitude: "",
  contact_name: "",
  phone: "",
  email: "",
  featured: 0,
};

const ModalCreateEditJobPosting: React.FC<IModalCreateEditJobPosting> = ({
  open,
  setOpen,
  isEdit,
  dataDetail,
  isLoading,
  setDataDetail,
  handleUpdateJobPosting,
  handleCreateJobPosting,
}) => {
  // Dữ liệu test Create form, XÓA sau
  const [dataCreate, setDataCreate] = useState<any>({
    title: "Senior Software Engineer",
    profession_id: 1,
    desired_level_id: 2,
    experience_level_id: 3,
    workplace_id: 1,
    employment_type_id: 2,
    quantity: 5,
    salary_from: 60000,
    salary_to: 90000,
    education_level_id: 3,
    last_date: dayjs().add(7, "day"),
    description:
      "We are looking for a Senior Software Engineer to join our team.",
    skill_experience: "5 years of experience in software development.",
    benefits: "Health insurance, flexible working hours.",
    work_address: "123 Main St, City Center",
    longitude: 106.629658,
    latitude: -6.174465,
    contact_name: "John Doe",
    phone: "0123456789",
    email: "johndoe@example.com",
    featured: 1,
  });

  useEffect(() => {
    if (dataCreate) {
      form.setFieldsValue(dataCreate);
    }
  }, [dataCreate]);
  // Dữ liệu test Create form, XÓA SAU

  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedIdCountry, setSelectedIdCountry] = useState<number>(0);
  const [selectedIdCity, setSelectedIdCity] = useState<number>(0);
  const [dataJobPosting, setDataJobPosting] =
    useState<JobPosting>(initialJobPosting);

  useEffect(() => {
    if (!isEdit && !dataDetail) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [isEdit, dataDetail]);

  useEffect(() => {
    if (dataDetail) {
      form.setFieldsValue({
        title: dataJobPosting.title,
        profession_id: dataJobPosting.profession.id,
        desired_level_id: dataJobPosting.desiredLevel.id,
        experience_level_id: dataJobPosting.desiredLevel.id,
        workplace_id: dataJobPosting.workPlace.id,
        employment_type_id: dataJobPosting.employmentType.id,
        quantity: dataJobPosting.quantity,
        salary_from: dataJobPosting.salary_from,
        salary_to: dataJobPosting.salary_to,
        education_level_id: dataJobPosting.educationLevel.id,
        last_date: dayjs(dataJobPosting.last_date),
        description: dataJobPosting.description,
        skill_experience: dataJobPosting.skill_experience,
        benefits: dataJobPosting.benefits,
        country_id: dataJobPosting.country.id,
        city_id: dataJobPosting.city.id,
        district_id: dataJobPosting.district.id,
        work_address: dataJobPosting.work_address,
        longitude: dataJobPosting.longitude,
        latitude: dataJobPosting.latitude,
        contact_name: dataJobPosting.contact_name,
        phone: dataJobPosting.phone,
        email: dataJobPosting.email,
        featured: dataJobPosting.featured,
      });
      setSelectedIdCountry(dataJobPosting.country.id);
      setSelectedIdCity(dataJobPosting.city.id);
    }
  }, [dataJobPosting, form, dataDetail]);

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    if (!isEdit) {
      handleCreateJobPosting(values);
    }
    if (isEdit) {
      handleUpdateJobPosting(dataDetail.id, values);
    }
    form.resetFields();
    setOpen(false);
  };

  const { data: desiredLevelOptions } = useQuery({
    queryKey: ["desiredLevels"],
    queryFn: () => getDesiredLevelsApi(),
    select: (desiredLevelData) =>
      desiredLevelData.data.map((item: DesiredLevelType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: educationLevelOptions } = useQuery({
    queryKey: ["educationLevels"],
    queryFn: () => getEducationLevelsApi(),
    select: (educationLevelData) =>
      educationLevelData.data.map((item: EducationLevelType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: experienceLevelOptions } = useQuery({
    queryKey: ["experienceLevels"],
    queryFn: () => getExperienceLevelsApi(),
    select: (experienceLevelData) =>
      experienceLevelData.data.map((item: ExperienceLevelType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: professionOptions } = useQuery({
    queryKey: ["professions"],
    queryFn: () => getProfessionsApi(),
    select: (professionData) =>
      professionData.data.map((item: ProfessionType) => ({
        value: item.id,
        label: item.name,
      })),
  });

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
    queryKey: ["cities", selectedIdCountry],
    queryFn: () => getCitiesApi(selectedIdCountry),
    enabled: !!selectedIdCountry && selectedIdCountry !== 0,
    select: (cityData) =>
      cityData.data.map((item: CityType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: districtOptions } = useQuery({
    queryKey: ["districts", selectedIdCity],
    queryFn: () => getDistrictsApi(selectedIdCity),
    enabled: !!selectedIdCity && selectedIdCity !== 0,
    select: (districtData) =>
      districtData.data.map((item: DistrictType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: workplaceOptions } = useQuery({
    queryKey: ["workplaces"],
    queryFn: () => getWorkplacesApi(),
    select: (workplaceData) =>
      workplaceData.data.map((item: WorkplaceType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: employmentTypeOptions } = useQuery({
    queryKey: ["employmentTypes"],
    queryFn: () => getEmploymentTypesApi(),
    select: (employmentTypeData) =>
      employmentTypeData.data.map((item: EmploymentTypeType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const fetchInforJobPosting = async () => {
    setLoading(true);
    try {
      const res = await getPostJob(dataDetail.id);
      if (res && res.success) {
        setDataJobPosting(res.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      if (isEdit) {
        fetchInforJobPosting();
      }
    }
    if (!isOpen) {
      form.resetFields();
      setSelectedIdCountry(0);
      setSelectedIdCity(0);
      setDataJobPosting(initialJobPosting);
      setDataDetail(null);
    }
  };

  return (
    <>
      <Modal
        open={open}
        title={`${isEdit ? "Update" : "Create"} Job Posting ${
          dataDetail?.title ?? ""
        }`}
        okText={`${isEdit ? "Update" : "Create"}`}
        cancelText="Cancel"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          className: "bg-blue-500",
          loading: isLoading,
        }}
        style={{ top: 20 }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        maskClosable={false}
        width={1200}
        afterOpenChange={(isOpen) => {
          handleOpen(isOpen);
        }}
        loading={loading}
        afterClose={() => {
          form.resetFields();
          setSelectedIdCountry(0);
          setSelectedIdCity(0);
          setDataJobPosting(initialJobPosting);
          setDataDetail(null);
        }}
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="job_posting_form"
            initialValues={{ modifier: "public" }}
            onFinish={(values) => onCreate(values)}
            disabled={isLoading}
          >
            {dom}
          </Form>
        )}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                { required: true, message: "Please input the job title!" },
                {
                  type: "string",
                  max: 255,
                  message: "Title must not exceed 255 characters",
                },
              ]}
            >
              <Input placeholder="Enter job title" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="profession_id"
              label="Profession"
              rules={[
                { required: true, message: "Please select a profession!" },
              ]}
            >
              <Select
                placeholder="Select profession"
                options={professionOptions}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="desired_level_id"
              label="Desired Level"
              rules={[
                { required: true, message: "Please select a desired level!" },
              ]}
            >
              <Select
                placeholder="Select desired level"
                options={desiredLevelOptions}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="experience_level_id"
              label="Experience Level"
              rules={[
                {
                  required: true,
                  message: "Please select an experience level!",
                },
              ]}
            >
              <Select
                placeholder="Select experience level"
                options={experienceLevelOptions}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="workplace_id"
              label="Workplace"
              rules={[
                { required: true, message: "Please select a workplace!" },
              ]}
            >
              <Select
                placeholder="Select workplace"
                options={workplaceOptions}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="employment_type_id"
              label="Employment Type"
              rules={[
                { required: true, message: "Please select employment type!" },
              ]}
            >
              <Select
                placeholder="Select employment type"
                options={employmentTypeOptions}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[
                { required: true, message: "Please input the quantity!" },
              ]}
            >
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                placeholder="Enter quantity"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="education_level_id"
              label="Education Level"
              rules={[
                { required: true, message: "Please select education level!" },
              ]}
            >
              <Select
                placeholder="Select education level"
                options={educationLevelOptions}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="salary_from"
              label="Salary From"
              rules={[
                { required: true, message: "Please input salary from!" },
                {
                  type: "number",
                  message: "The starting salary must be an integer",
                },
              ]}
            >
              <InputNumber
                addonAfter="VND"
                min={0}
                style={{ width: "100%" }}
                placeholder="Enter salary from"
                formatter={(value) =>
                  value
                    ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ"
                    : "0đ"
                }
                parser={(value: string | undefined): number =>
                  value ? parseInt(value.replace(/,|đ/g, "")) : 0
                }
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="salary_to"
              label="Salary To"
              rules={[
                { required: true, message: "Please input salary to!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const salaryFrom = getFieldValue("salary_from");
                    if (value > salaryFrom) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Salary To must be greater than or equal to Salary From"
                      )
                    );
                  },
                }),
              ]}
            >
              <InputNumber
                addonAfter="VND"
                min={0}
                style={{ width: "100%" }}
                placeholder="Enter salary to"
                formatter={(value) =>
                  value
                    ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ"
                    : "0đ"
                }
                parser={(value: string | undefined): number =>
                  value ? parseInt(value.replace(/,|đ/g, "")) : 0
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="last_date"
              label="Last Date"
              rules={[
                { required: true, message: "Please select the last date!" },
              ]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                disabledDate={(current) => {
                  return current && current < dayjs().endOf("day");
                }}
                style={{ width: "100%" }}
                placeholder="Select last date"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="featured"
              label="Featured"
              rules={[
                {
                  required: true,
                  message: "Please select if this is featured!",
                },
              ]}
            >
              <Select
                placeholder="Select if featured"
                options={[
                  { value: 1, label: "Yes" },
                  { value: 0, label: "No" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Enter job description" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="skill_experience"
              label="Skill Experience"
              rules={[
                {
                  required: true,
                  message: "Please input the skill experience!",
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Enter skill experience" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="benefits"
              label="Benefits"
              rules={[
                { required: true, message: "Please input the benefits!" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Enter benefits" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="country_id"
              label="Country"
              rules={[{ required: true, message: "Please choose country!" }]}
            >
              <Select
                placeholder="Select country"
                onChange={(value: number) => {
                  setSelectedIdCountry(value);
                  setSelectedIdCity(0);
                }}
                options={countryOptions}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="city_id"
              label="City"
              initialValue={cityOptions ? dataJobPosting.city.id : null}
              rules={[{ required: true, message: "Please choose city!" }]}
            >
              <Select
                placeholder="Select city"
                onChange={(value: number) => {
                  setSelectedIdCity(value);
                  form.setFieldsValue({ district_id: undefined });
                }}
                options={cityOptions}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="district_id"
              label="District"
              initialValue={districtOptions ? dataJobPosting.district.id : null}
              rules={[{ required: true, message: "Please choose district!" }]}
            >
              <Select placeholder="Select district" options={districtOptions} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="work_address"
              label="Work Address"
              rules={[
                { required: true, message: "Please input work address!" },
              ]}
            >
              <Input placeholder="Enter work address" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="longitude"
              label="Longitude"
              rules={[{ required: true, message: "Please input longitude!" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Enter longitude"
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="latitude"
              label="Latitude"
              rules={[{ required: true, message: "Please input latitude!" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Enter latitude"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="contact_name"
              label="Contact Name"
              rules={[
                { required: true, message: "Please input contact name!" },
              ]}
            >
              <Input placeholder="Enter contact name" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Please input phone!" },
                {
                  pattern: /^0[0-9]{9}$/,
                  message: "Invalid phone number!",
                },
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input email!" },
                { type: "email", message: "Invalid email!" },
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModalCreateEditJobPosting;

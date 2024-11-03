import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import { EMPLOYER_BE_API, EMPLOYER_ROUTES } from "../../modules";
import { axiosInstance } from "../../utils/baseAxios";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export const CreateJD = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: jobTypes } = useQuery({
    queryKey: ["jobTypes"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(EMPLOYER_BE_API.JOB_TYPE);
        return response.data.data;
      } catch (error: any) {
        if (error.response.data.error) {
          Object.values(error.response.data.error).forEach((err) => {
            toast.error(err as string);
          });
        }
        throw error;
      }
    },
    select: (data) => {
      return data.map((city: { name: string; id: number }) => ({
        label: city.name,
        value: city.id,
      }));
    },
  });

  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(EMPLOYER_BE_API.CITIES);
        return response.data.data;
      } catch (error: any) {
        if (error.response.data.error) {
          Object.values(error.response.data.error).forEach((err) => {
            toast.error(err as string);
          });
        }
        throw error;
      }
    },
    select: (data) => {
      return data.map((city: { name: string; id: number }) => ({
        label: city.name,
        value: city.id,
      }));
    },
  });

  const { data: skills } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(EMPLOYER_BE_API.SKILL);
        return response.data.data;
      } catch (error: any) {
        if (error.response.data.error) {
          Object.values(error.response.data.error).forEach((err) => {
            toast.error(err as string);
          });
        }
        throw error;
      }
    },
    select: (data) => {
      return data.map((skill: { name: string; id: number }) => ({
        label: skill.name,
        value: skill.name,
      }));
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["create-jd"],
    mutationFn: async (values: any) => {
      try {
        return axiosInstance.post(EMPLOYER_BE_API.CREATE_JD, {
          ...values,
          job_skills: values.job_skills.map((job: any) => ({
            name: job,
          })),
          last_date: values.last_date.format("YYYY/MM/DD"),
          featured: 1,
          status: 1,
        });
      } catch (error: any) {
        if (error.response.data.error) {
          Object.values(error.response.data.error).forEach((err) => {
            toast.error(err as string);
          });
        }
        throw error;
      }
    },
    onSuccess: () => {
      navigate(EMPLOYER_ROUTES.LIST_JD);
      toast.success("create job description successfully");
      queryClient.invalidateQueries({
        queryKey: [EMPLOYER_BE_API.LIST_JD, "list"],
      });
    },
  });

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Create Job Description
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Please fill information for job description.
        </p>
      </div>

      <Form
        onFinish={(values: any) => {
          mutate(values);
        }}
        className="mt-8"
        layout="vertical"
        form={form}
      >
        <Form.Item
          label={<Typography.Title level={5}>title</Typography.Title>}
          name="title"
          required
          rules={[{ required: true }]}
        >
          <Input placeholder="title" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>job type</Typography.Title>}
          name="jobtype_id"
          required
          rules={[{ required: true, message: "'job type' is required" }]}
        >
          <Select options={jobTypes} placeholder="job type" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>city</Typography.Title>}
          name="city_id"
          required
          rules={[{ required: true, message: "'city' is required" }]}
        >
          <Select options={cities} placeholder="city" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>salary</Typography.Title>}
          name="salary"
          required
          rules={[{ required: true }]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) =>
              value?.replace(/\$\s?|(,*)/g, "") as unknown as number
            }
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>description</Typography.Title>}
          name="description"
          required
          rules={[{ required: true }]}
        >
          <TextArea placeholder="description" />
        </Form.Item>
        <Form.Item
          label={<Typography.Title level={5}>last date</Typography.Title>}
          name="last_date"
          required
          rules={[{ required: true, message: "'last date' is required" }]}
        >
          <DatePicker
            disabledDate={(current) => {
              return current && current < dayjs().endOf("day");
            }}
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          label={
            <Typography.Title level={5}>skill experience</Typography.Title>
          }
          name="skill_experience"
          required
          rules={[
            { required: true, message: "'skill experience' is required" },
          ]}
        >
          <Input placeholder="address" />
        </Form.Item>
        <Form.Item
          label={<Typography.Title level={5}>address</Typography.Title>}
          name="address"
          required
          rules={[{ required: true, message: "'address' is required" }]}
        >
          <Input placeholder="address" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>benefits</Typography.Title>}
          name="benefits"
          required
          rules={[{ required: true, message: "'benefits' is required" }]}
        >
          <TextArea placeholder="benefits" />
        </Form.Item>

        <Form.Item
          label={<Typography.Title level={5}>job skill</Typography.Title>}
          name="job_skills"
          required
          rules={[{ required: true, message: "'job skills' is required" }]}
        >
          <Checkbox.Group options={skills} />
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

// "jobtype_id": 1,
//     "city_id": 3,
//     "title": "Software Engineer2",
//     "salary": 60000,
//     "status": 1,
//     "featured": 1,
//     "description": "This is a description of the job.",
//     "last_date": "2024-03-31",
//      "address": "123 Main St, City, Country",
//     "skill_experience": "3+ years",
//     "benefits": "Health insurance, retirement plan",
//     "job_skills": [
//         {"name": "CSS"},
//         {"name": "HTML"},
//         {"name": "Laravel"}
//     ]

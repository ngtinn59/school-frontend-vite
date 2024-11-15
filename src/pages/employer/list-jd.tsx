import { Popconfirm, Space, Table, TableProps, Tag, Tooltip } from "antd";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import { debounce } from "lodash";
import ModalCreateEditJobPosting from "./Modal/ModalCreateEditJobPosting";
import {
  createPostJob,
  deletePostJob,
  getAllJobPosting,
  updatePostJob,
} from "../../services/api/employer/managePostJob";
import dayjs from "dayjs";
import ModalViewJobPosting from "./Modal/ModalViewJobPosting";

interface JobPostingRequest {
  title: string;
  profession_id: number;
  desired_level_id: number;
  experience_level_id: number;
  workplace_id: number;
  employment_type_id: number;
  quantity: number;
  salary_from: number;
  salary_to: number;
  education_level_id: number;
  last_date: string;
  description: string;
  skill_experience: string;
  benefits: string;
  country_id: number;
  district_id: number;
  city_id: number;
  work_address: string;
  longitude: number;
  latitude: number;
  contact_name: string;
  phone: string;
  email: string;
  featured: number;
}

export const ListJD = () => {
  const LIMIT = 10;
  const [open, setOpen] = useState<boolean>(false);
  const [isModalOpenViewJob, setIsModalOpenViewJob] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [dataDetail, setDataDetail] = useState<any | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);

  const fetchListJobPosting = async () => {
    setLoading(true);
    try {
      const res = await getAllJobPosting();
      if (res && res.success) {
        setData(res.data);
        setTotal(res.data.length);
      }
    } catch (error) {
      console.log(error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchListJobPosting();
  }, []);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const lowerSearch = value.toLowerCase();
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(lowerSearch)
      );
      setFilteredData(filtered);
      setTotal(filtered.length);
    }, 300),
    [data]
  );

  useEffect(() => {
    debouncedSearch(search);
    return debouncedSearch.cancel;
  }, [search, debouncedSearch]);

  const handleCreateJobPosting = async (values: JobPostingRequest) => {
    setLoading(true);
    console.log("create");
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "last_date") {
        formData.append(key, dayjs(values.last_date).format("YYYY/MM/DD"));
        return;
      }
      formData.append(key, (values as any)[key]);
    });
    try {
      const res = await createPostJob(formData);
      if (res && res.success) {
        fetchListJobPosting();
        toast.success(res.message || "Create job posting successfully");
      }
      if (res && !res.success) {
        toast.error(res.message || "Create job posting failed");
      }
    } catch (error) {
      toast.error("Lỗi xác thực dữ liệu");
      fetchListJobPosting();
      console.log(error);
    }
    setLoading(false);
  };

  const handleUpdateJobPosting = async (
    id: number,
    data: JobPostingRequest
  ) => {
    console.log("update");
    const { last_date } = data;
    data.last_date = dayjs(last_date).format("YYYY/MM/DD");
    setLoading(true);
    try {
      const res = await updatePostJob(id, data);
      if (res && res.success) {
        fetchListJobPosting();
        toast.success(res.message || "Update job posting successfully");
      }
      if (res && !res.success) {
        toast.error(res.message || "Update job posting failed");
      }
    } catch (error) {
      toast.error("Lỗi xác thực dữ liệu");
      console.log(error);
      fetchListJobPosting();
    }
    setLoading(false);
  };

  const handleDeleteJobPosting = async (id: number) => {
    setLoading(true);
    try {
      const res = await deletePostJob(id);
      if (res && res.success) {
        fetchListJobPosting();
        toast.success(res.message || "Delete job posting successfully");
      }
    } catch (error) {
      toast.error("Delete job posting failed");
      fetchListJobPosting();
      console.log(error);
    }
    setLoading(false);
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "No.",
      key: "No.",
      width: 50,
      align: "center",
      render: (_, __, index) => (
        <span className="font-semibold">
          {(currentPage - 1) * pageSize + index + 1}
        </span>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "20%",
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      render(featured: any) {
        return (
          <Tag color={featured === 1 ? "red" : "green"}>
            {featured === 1 ? "Hiring Urgently" : "Hiring"}
          </Tag>
        );
      },
    },
    {
      title: "Expiration Date",
      dataIndex: "last_date",
      key: "last_date",
      render(last_date: any) {
        return new Date(last_date).toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      title: "Applications Count",
      dataIndex: "applications_count",
      key: "applications_count",
    },
    {
      title: "Views Count",
      dataIndex: "views_count",
      key: "views_count",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render(value: any) {
        return (
          <Tag color={value === 1 ? "green" : "red"}>
            {value === 1 ? "Approved" : "Pending Approval"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: "center",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title={`View Job ${record?.title}`}>
            <button
              onClick={() => {
                setId(record.id);
                setIsModalOpenViewJob(true);
              }}
              className="text-xl text-blue-500"
            >
              <FaEye />
            </button>
          </Tooltip>
          <Tooltip title={`Edit Job ${record?.title}`}>
            <button
              onClick={() => {
                setDataDetail(record);
                setIsEdit(true);
                setOpen(true);
              }}
              className="text-xl text-yellow-500"
            >
              <MdEdit />
            </button>
          </Tooltip>
          <Popconfirm
            title={`Delete the job posting ${record?.title}?`}
            description="Are you sure to delete this job posting?"
            onConfirm={() => {
              handleDeleteJobPosting(record.id);
            }}
            onCancel={() => {}}
            okButtonProps={{ autoFocus: true, className: "bg-blue-500" }}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title={`Delete ${record?.title}`}>
              <button className=" text-red-500 ">
                <MdDelete className="text-2xl" />
              </button>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="m-4 p-4 min-h-screen">
      <div className="px-4 mb-5 sm:px-0 flex justify-between items-center">
        <h3 className="text-lg uppercase font-semibold leading-7 text-gray-900">
          List Job Description
        </h3>
        <div className="flex gap-1 items-center justify-center">
          <div className="relative ">
            <input
              type="text"
              value={search}
              placeholder={"Search..."}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-4.5 mr-8 w-80 rounded-md border border-solid border-gray-500 px-2 py-2 outline-none"
            />
            <button className="absolute right-0 top-0 flex h-full w-10 items-center justify-center rounded-e-md border-gray-500 bg-gray-500 text-xl text-white">
              <MdSearch />
            </button>
          </div>
          <button
            onClick={() => {
              setIsEdit(false);
              setOpen(true);
            }}
            className="bg-gray-500 hover:bg-gray-600 !text-white py-2 rounded-md px-2"
          >
            Create Job Posting
          </button>
        </div>
      </div>

      <Table<any>
        rowKey="id"
        size="middle"
        bordered
        loading={loading}
        columns={columns}
        dataSource={filteredData}
        pagination={{
          total: total,
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30"],
          onShowSizeChange(current, size) {
            setCurrentPage(1);
            setPageSize(size);
          },
          showTotal: (total) => `Total: ${total}`,
          onChange(page, pageSize) {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
      />
      <ModalCreateEditJobPosting
        isLoading={loading}
        open={open}
        setOpen={setOpen}
        dataDetail={dataDetail}
        isEdit={isEdit}
        setDataDetail={setDataDetail}
        handleUpdateJobPosting={handleUpdateJobPosting}
        handleCreateJobPosting={handleCreateJobPosting}
      />
      <ModalViewJobPosting
        id={id}
        isModalOpen={isModalOpenViewJob}
        setIsModalOpen={setIsModalOpenViewJob}
      />
    </div>
  );
};

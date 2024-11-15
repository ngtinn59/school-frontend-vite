import {
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { MdDelete, MdOutgoingMail, MdSearch } from "react-icons/md";
import {
  deleteApplication,
  IApplicant,
  IDataApplicantOfJobRes,
  initialDataApplicantOfJobRes,
  processStatusApplicant,
  showListApplications,
  statusHiring,
} from "../../../services/api/employer/manage-appicants";
import ModalSendMailApplicant from "./ModalSendMailApplicant";
import toast from "react-hot-toast";

interface ModalViewListApplicantsProps {
  idJob: number;
  setIdJob: React.Dispatch<React.SetStateAction<number>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAllJobPostings: () => void;
}

const ModalViewListApplicants: React.FC<ModalViewListApplicantsProps> = ({
  idJob,
  setIdJob,
  isModalOpen,
  setIsModalOpen,
  fetchAllJobPostings,
}) => {
  const [openModalSendMail, setOpenModalSendMail] = useState<boolean>(false);

  const LIMIT = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IApplicant[]>([]);
  const [dataJob, setDataJob] = useState<IDataApplicantOfJobRes>(
    initialDataApplicantOfJobRes
  );

  const [dataApplicant, setDataApplicant] = useState<IApplicant>({
    id: 0,
    name: "",
    email: "",
    cv: "",
    status: "",
  });

  useEffect(() => {
    if (idJob === 0) setLoading(true);
  }, [idJob]);

  const fetchDataApplicantsOfJob = async () => {
    try {
      setLoading(true);
      const response = await showListApplications(idJob);
      if (response && response.success) {
        setDataJob(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const lowerSearch = value.toLowerCase();
      const filtered = dataJob.applicants.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerSearch) ||
          item.email.toLowerCase().includes(lowerSearch)
      );
      setFilteredData(filtered);
      setTotal(filtered.length);
    }, 300),
    [dataJob]
  );

  useEffect(() => {
    debouncedSearch(search);
    return debouncedSearch.cancel;
  }, [search, debouncedSearch]);

  const handleDeleteApplicant = async (userId: number) => {
    setLoading(true);
    try {
      const res = await deleteApplication(idJob, userId);
      if (res && res.success) {
        fetchDataApplicantsOfJob();
        toast.success(res.message || "Applicant deleted successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete applicant!");
    }
    setLoading(false);
  };

  const handleProcessStatusApplicant = async (
    userId: number,
    status: string
  ) => {
    setLoading(true);
    try {
      const res = await processStatusApplicant(idJob, userId, { status });
      if (res && res.success) {
        fetchDataApplicantsOfJob();
        toast.success(res.message || "Applicant deleted successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete applicant!");
    }
    setLoading(false);
  };

  const columns: TableProps<IApplicant>["columns"] = [
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      filters: [
        { text: "HIRED", value: statusHiring.HIRED },
        { text: "NOT SELECTED", value: statusHiring.NOT_HIRED },
        { text: "TEST ROUND", value: statusHiring.TESTED },
        { text: "INTERVIEW", value: statusHiring.INTERVIEWED },
        { text: "CONTACTED", value: statusHiring.CONTACTED },
        { text: "PENDING", value: "pending" },
      ],
      onFilter: (value, record) => record.status === value,
      width: 150,
      render: (status: string) => {
        let color = "";
        switch (status) {
          case statusHiring.HIRED:
            color = "green";
            break;
          case statusHiring.NOT_HIRED:
            color = "red";
            break;
          case statusHiring.TESTED:
            color = "yellow";
            break;
          case statusHiring.INTERVIEWED:
            color = "purple";
            break;
          case statusHiring.CONTACTED:
            color = "orange";
            break;
          default:
            color = "blue";
            break;
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "CV",
      key: "cv",
      align: "center",
      width: 100,
      render: (_, record) => (
        <a
          href={record.cv}
          target="_blank"
          rel="noreferrer"
          className="text-cv_color_red hover:text-red-500"
        >
          <div className="">#View CV</div>
        </a>
      ),
    },
    {
      title: "Action Status Hiring",
      key: "cv",
      align: "center",
      width: 250,
      render: (_, record) => (
        <Select
          options={[
            { value: statusHiring.HIRED, label: "HIRED" },
            { value: statusHiring.NOT_HIRED, label: "NOT SELECTED" },
            { value: statusHiring.TESTED, label: "TEST ROUND" },
            {
              value: statusHiring.INTERVIEWED,
              label: "INTERVIEW",
            },
            { value: statusHiring.CONTACTED, label: "CONTACTED" },
          ]}
          style={{ width: 200 }}
          defaultValue={record.status === "pending" ? "" : record.status}
          onChange={(value) => {
            handleProcessStatusApplicant(record.id, value);
          }}
        ></Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      align: "center",
      render: (_: any, record: IApplicant) => (
        <Space size="middle">
          <Popconfirm
            title={`Delete the applicant ${record?.name}?`}
            description="Are you sure to delete this applicant?"
            onConfirm={() => {
              handleDeleteApplicant(record.id);
            }}
            onCancel={() => {}}
            okButtonProps={{ autoFocus: true, className: "bg-blue-500" }}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title={`Delete ${record?.name}`}>
              <button className=" text-red-500">
                <MdDelete className="text-xl" />
              </button>
            </Tooltip>
          </Popconfirm>
          <Tooltip title={`Send Mail to ${record?.name}`}>
            <button
              onClick={() => {
                setDataApplicant(record);
                setOpenModalSendMail(true);
              }}
              className="text-yellow-500 px-2 py-1 flex items-center justify-center gap-1 border border-yellow-500 rounded-md border-solid hover:text-white hover:bg-yellow-500 duration-200"
            >
              <MdOutgoingMail className="text-lg" />
              <span>Send Mail</span>
            </button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Modal
      width={1400}
      loading={loading}
      title={`View list of applicants for job posting: ${
        dataJob?.id === 0
          ? ""
          : `#${dataJob?.title} - Created_at ${dataJob?.created_at}`
      }`}
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
      okButtonProps={{ hidden: true }}
      onCancel={() => setIsModalOpen(false)}
      cancelButtonProps={{ danger: true }}
      afterOpenChange={(open) => {
        if (open) fetchDataApplicantsOfJob();
      }}
      afterClose={() => {
        setIdJob(0);
        setDataJob(initialDataApplicantOfJobRes);
        fetchAllJobPostings();
      }}
      style={{ top: 20 }}
      maskClosable={false}
    >
      <div className="flex gap-1 items-center justify-end">
        <div className="relative ">
          <input
            type="text"
            value={search}
            placeholder={"Search..."}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-4.5 mr-8 w-80 rounded-md border border-solid border-blue-500 px-2 py-2 outline-none"
          />
          <button className="absolute right-0 top-0 flex h-full w-10 items-center justify-center rounded-e-md border-blue-500 bg-blue-500 text-xl text-white">
            <MdSearch />
          </button>
        </div>
      </div>
      <Table<IApplicant>
        rowKey="id"
        size="middle"
        style={{ marginTop: 10 }}
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
      <ModalSendMailApplicant
        jobID={idJob}
        dataApplicant={dataApplicant}
        setDataApplicant={setDataApplicant}
        open={openModalSendMail}
        setOpen={setOpenModalSendMail}
      />
    </Modal>
  );
};

export default ModalViewListApplicants;

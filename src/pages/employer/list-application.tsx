import { Space, Table, TableProps, Tooltip } from "antd";
import { useCallback, useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import {
  getAllApplications,
  IJobPostingRes,
} from "../../services/api/employer/manage-appicants";
import { debounce } from "lodash";
import { FaEye } from "react-icons/fa";
import ModalViewListApplicants from "./Modal/ModalViewListApplicants";

export const ListApplication: React.FC = () => {
  const LIMIT = 10;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<IJobPostingRes[]>([]);
  const [idJob, setIdJob] = useState<number>(0);

  const fetchAllJobPostings = async () => {
    setLoading(true);
    try {
      const response = await getAllApplications();
      if (response && response.success) {
        setData(response.data);
        setTotal(response.data.length);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobPostings();
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

  const columns: TableProps<IJobPostingRes>["columns"] = [
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
      title: "Job Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Applicant Count",
      dataIndex: "applicant_count",
      key: "applicant_count",
    },
    {
      title: "Action",
      key: "action",
      width: 250,
      align: "center",
      render: (_: any, record: IJobPostingRes) => (
        <Space size="middle">
          <Tooltip title={`View list applicants ${record?.title}`}>
            <button
              onClick={() => {
                setIdJob(record.id);
                setIsOpenModal(true);
              }}
              className="text-lg text-blue-500 flex items-center justify-center gap-1 px-2 py-1 rounded-md border border-solid border-blue-500 hover:bg-blue-500 hover:text-white duration-200"
            >
              <FaEye />
              <span className="text-base">View List</span>
            </button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="m-4 p-4 min-h-screen">
      <div className="px-4 mb-5 sm:px-0 flex justify-between items-center">
        <h3 className="text-lg uppercase font-semibold leading-7 text-gray-900">
          List of Applicants
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
        </div>
      </div>

      <Table<IJobPostingRes>
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
      <ModalViewListApplicants
        idJob={idJob}
        setIdJob={setIdJob}
        isModalOpen={isOpenModal}
        setIsModalOpen={setIsOpenModal}
        fetchAllJobPostings={fetchAllJobPostings}
      />
    </div>
  );
};

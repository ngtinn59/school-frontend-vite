import { Space, Table, TableProps, Tooltip } from "antd";
import { useCallback, useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import FilterSort from "./Search/FilterSort";
import { formatCurrencyVND } from "../../utils/function/formatCurrency";
import { FaEye } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import {
  getAllProfileQuery,
  saveProfile,
  unSaveProfile,
} from "../../services/api/employer/profileSaved";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import ModalViewProfileCandidate from "./Modal/ModalViewProfileCandidate";
import { ICandidateProfileSaved } from "./profile-saved";

interface ExperienceLevel {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
}

export interface Candidate {
  id: number;
  age: number | null;
  name: string;
  desired_position: string;
  experienceLevel: ExperienceLevel;
  salary_from: number;
  salary_to: number;
  city: City;
  district: District;
  updated_at: string;
  is_saved: number;
}

const FindProfileCandidate: React.FC = () => {
  const LIMIT = 10;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(LIMIT);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filterCity, setFilterCity] = useState<number>(0);
  const [filterDesiredLevel, setFilterDesiredLevel] = useState<number>(0);
  const [filterProfession, setFilterProfession] = useState<number>(0);
  const [filterExperienceLevel, setFilterExperienceLevel] = useState<number>(0);
  const [filterEducationLevel, setFilterEducationLevel] = useState<number>(0);
  const [dataDetail, setDataDetail] = useState<ICandidateProfileSaved | null>(
    null
  );
  const [data, setData] = useState<Candidate[]>([]);

  const fetchAllProfileQuery = async () => {
    setLoading(true);
    let query = `keyword=${search}`;
    if (filterCity) {
      query += `&city_id=${filterCity}`;
    }
    if (filterDesiredLevel) {
      query += `&desired_level_id=${filterDesiredLevel}`;
    }
    if (filterProfession) {
      query += `&profession_id=${filterProfession}`;
    }
    if (filterExperienceLevel) {
      query += `&experience_level_id=${filterExperienceLevel}`;
    }
    if (filterEducationLevel) {
      query += `&education_level_id=${filterEducationLevel}`;
    }

    try {
      const res = await getAllProfileQuery(query);
      if (res && res.success) {
        setData(res.data);
        setTotal(res.total);
      }
    } catch (error) {
      console.error("Fetch all profile query error:", error);
      setData([]);
    }
    setLoading(false);
  };
  const debouncedFetchProfile = useCallback(
    debounce(() => {
      fetchAllProfileQuery();
    }, 300),
    [
      search,
      filterCity,
      filterExperienceLevel,
      filterDesiredLevel,
      filterProfession,
      filterEducationLevel,
    ]
  );

  useEffect(() => {
    debouncedFetchProfile();
    return () => {
      debouncedFetchProfile.cancel();
    };
  }, [debouncedFetchProfile]);

  const handleSaveProfile = async (id: number) => {
    try {
      const res = await saveProfile(id);
      if (res && res.success) {
        fetchAllProfileQuery();
        toast.success("Lưu hồ sơ thành công");
      }
    } catch (error) {
      toast.error("Lưu hồ sơ thất bại");
      console.error("Save profile error:", error);
      fetchAllProfileQuery();
    }
  };

  const handleUnSaveProfile = async (id: number) => {
    try {
      const res = await unSaveProfile(id);
      if (res && res.success) {
        fetchAllProfileQuery();
        toast.success("Hủy lưu hồ sơ thành công");
      }
    } catch (error) {
      toast.error("Hủy lưu hồ sơ thất bại");
      console.error("Unsave profile error:", error);
      fetchAllProfileQuery();
    }
  };

  const handleReset = () => {
    setSearch("");
    setFilterCity(0);
    setFilterDesiredLevel(0);
    setFilterProfession(0);
    setFilterExperienceLevel(0);
    setFilterEducationLevel(0);
    setCurrentPage(1);
  };

  const columns: TableProps<Candidate>["columns"] = [
    {
      title: "STT",
      key: "STT",
      width: 50,
      align: "center",
      render: (_, __, index) => (
        <span className="font-semibold">
          {(currentPage - 1) * pageSize + index + 1}
        </span>
      ),
    },
    {
      title: "Họ và tên ứng viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
      render: (age: number | null) => <span>{age ? age : "--"}</span>,
    },
    {
      title: "Vị trí mong muốn",
      dataIndex: "desired_position",
      key: "desired_position",
    },
    {
      title: "Kinh nghiệm",
      dataIndex: "experienceLevel",
      key: "experienceLevel",
      render: (experienceLevel: ExperienceLevel) => (
        <span>{experienceLevel.name}</span>
      ),
    },
    {
      title: "Mức lương",
      dataIndex: "salary_from",
      key: "salary_from",
      render: (_, record) => (
        <span>
          {formatCurrencyVND(record.salary_from)} -{" "}
          {formatCurrencyVND(record.salary_to)}
        </span>
      ),
    },
    {
      title: "Quận",
      dataIndex: "district",
      key: "district",
      render: (district: District) => <span>{district.name}</span>,
    },
    {
      title: "Thành phố",
      dataIndex: "city",
      key: "city",
      render: (city: City) => <span>{city.name}</span>,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      key: "updated_at",

      render: (updated_at: string) => (
        <span>
          {updated_at ? (
            <>
              {new Date(updated_at).toLocaleTimeString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </>
          ) : (
            "--"
          )}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 200,
      align: "center",
      render: (_, record: Candidate) => (
        <Space size="middle">
          <Tooltip title={`Xem hồ sơ ${record.name}`}>
            <button
              onClick={() => {
                setDataDetail({
                  id: record.id,
                  desired_position: record.desired_position,
                  name: record.name,
                  salary: {
                    salary_from: record.salary_from,
                    salary_to: record.salary_to,
                  },
                  experience_level: record.experienceLevel.name,
                  district: record.district.name,
                  created_at: record.updated_at,
                });
                setOpenModal(true);
              }}
              className="text-xl text-blue-500"
            >
              <FaEye />
            </button>
          </Tooltip>
          <Tooltip
            title={`${record.is_saved === 1 ? "Hủy lưu" : "Lưu"} hồ sơ ${
              record.name
            }`}
          >
            <button
              onClick={() => {
                if (record.is_saved === 0) {
                  handleSaveProfile(record?.id);
                } else {
                  handleUnSaveProfile(record?.id);
                }
              }}
              className="px-2 mb-1 text-red-500 "
            >
              {record.is_saved === 0 ? (
                <IoHeartOutline className="text-xl" />
              ) : (
                <IoHeartSharp className="text-xl" />
              )}
            </button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const renderHeader = () => {
    return (
      <div className="flex w-full items-center gap-2">
        {/* Search */}
        <div className="relative h-full">
          <input
            type="text"
            value={search}
            placeholder={"Tìm kiếm"}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-4.5 mr-8 w-80 rounded-md border border-solid border-gray-500 px-2.5 py-2 outline-none"
          />
          <button className="absolute right-0 top-0 flex h-full w-10 items-center justify-center rounded-e-md border-gray-500 bg-gray-500 text-xl text-white">
            <MdSearch />
          </button>
        </div>
        {/* Reset */}
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
          onClick={() => {
            handleReset();
          }}
        >
          Xóa lọc
        </button>
      </div>
    );
  };

  return (
    <div className="m-4 my-2 p-4 min-h-screen border border-solid border-gray-200 shadow-lg">
      <h1 className="text-xl font-semibold uppercase">Find Candidate</h1>
      {/* Filter */}
      <div className="">
        <FilterSort
          filterCity={filterCity}
          setFilterCity={setFilterCity}
          filterDesiredLevel={filterDesiredLevel}
          setFilterDesiredLevel={setFilterDesiredLevel}
          filterProfession={filterProfession}
          setFilterProfession={setFilterProfession}
          filterExperienceLevel={filterExperienceLevel}
          setFilterExperienceLevel={setFilterExperienceLevel}
          filterEducationLevel={filterEducationLevel}
          setFilterEducationLevel={setFilterEducationLevel}
        />
      </div>
      {/* Table */}
      <div className="">
        <Table<Candidate>
          title={renderHeader}
          rowKey="id"
          size="middle"
          bordered
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={{
            total: total,
            pageSize: pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "30"],
            onShowSizeChange(current, size) {
              setCurrentPage(1);
              setPageSize(size);
            },
            showTotal: (total) => `Tổng: ${total}`,
            onChange(page, pageSize) {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      </div>
      <ModalViewProfileCandidate
        open={openModal}
        setOpen={setOpenModal}
        data={dataDetail}
        setData={setDataDetail}
      />
    </div>
  );
};

export default FindProfileCandidate;

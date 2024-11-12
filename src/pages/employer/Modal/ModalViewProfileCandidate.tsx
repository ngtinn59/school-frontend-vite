import { Avatar, Modal } from "antd";
import { ICandidateProfileSaved } from "../profile-saved";
import { getInformationResume } from "../../../services/api/employer/profileSaved";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
export interface ICandidateProfile {
  id: number;
  profile: {
    id: number;
    name: string;
    title: string | null;
    phone: string | null;
    email: string;
    age: number | null;
    image_url: string | null;
    gender: string | null;
    location: string | null;
    website: string | null;
    objective: {
      desired_position: string;
      desired_level: string;
      profession: string;
      employment_type: string;
      experience_level: string;
      work_address: string;
      education_level: string;
      salary_from: number;
      salary_to: number;
      file: string;
      status: string;
      country: string;
      city: string;
      district: string;
    };
  };
  aboutme: string[];
  educations: Education[];
  skills: Skill[];
  PersonalProject: Project[];
  Certificate: Certificate[];
  WorkExperience: WorkExperience[];
  Award: Award[];
}

export interface Education {
  institution: string;
  degree: string;
  year: number;
}

export interface Skill {
  name: string;
  proficiency: string;
}

export interface Project {
  name: string;
  description: string;
}

export interface Certificate {
  name: string;
  issued_by: string;
  date: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
}

export interface Award {
  title: string;
  description: string;
  year: number;
}

interface IModalViewProfileCandidateProps {
  data: ICandidateProfileSaved | null;
  setData: (data: ICandidateProfileSaved | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalViewProfileCandidate: React.FC<IModalViewProfileCandidateProps> = ({
  data,
  setData,
  open,
  setOpen,
}) => {
  const [dataDetail, setDataDetail] = useState<ICandidateProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInforesume = async () => {
    setLoading(true);
    try {
      if (data?.id !== undefined) {
        const res = await getInformationResume(data.id);
        if (res && res.status_code === 200) {
          setDataDetail(res.data);
        }
      }
    } catch (error) {
      console.log(error);
      setDataDetail(null);
    }
    setLoading(false);
  };

  const handleOpenChange = (visible: boolean) => {
    if (visible) {
      fetchInforesume();
    }
    if (!visible) {
      setData(null);
      setDataDetail(null);
    }
  };
  return (
    <>
      <Modal
        title={`Hồ sơ ứng viên: ${data?.name}`}
        open={open}
        loading={loading}
        okButtonProps={{ style: { display: "none" } }}
        onOk={() => {
          setOpen(false);
        }}
        cancelText="Đóng"
        onCancel={() => {
          setOpen(false);
        }}
        style={{ top: 20 }}
        width={1200}
        maskClosable={false}
        afterOpenChange={handleOpenChange}
        afterClose={() => {
          setData(null);
          setDataDetail(null);
        }}
      >
        {dataDetail && (
          <div className="p-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4 mb-8">
              <Avatar size={64} icon={<UserOutlined />} />
              <div>
                <h2 className="text-2xl font-semibold">
                  {dataDetail?.profile?.name || "--"}
                </h2>
                <p className="text-gray-500">
                  {dataDetail?.profile?.objective?.desired_position || "--"}
                </p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Thông Tin Cá Nhân</h3>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {dataDetail?.profile?.email || "--"}
                </p>
                <p>
                  <span className="font-medium">Điện thoại:</span>{" "}
                  {dataDetail?.profile?.phone || "--"}
                </p>
                <p>
                  <span className="font-medium">Giới tính:</span>{" "}
                  {dataDetail?.profile?.gender || "--"}
                </p>
                <p>
                  <span className="font-medium">Tuổi:</span>{" "}
                  {dataDetail?.profile?.age || "--"}
                </p>
                <p>
                  <span className="font-medium">Địa chỉ:</span>{" "}
                  {dataDetail?.profile?.objective?.work_address || "--"}
                </p>
                <p>
                  <span className="font-medium">Quốc gia:</span>{" "}
                  {dataDetail?.profile?.objective?.country || "--"}
                </p>
                <p>
                  <span className="font-medium">Thành phố:</span>{" "}
                  {dataDetail?.profile?.objective?.city || "--"}
                </p>
                <p>
                  <span className="font-medium">Quận:</span>{" "}
                  {dataDetail?.profile?.objective?.district || "--"}
                </p>
              </div>

              {/* Career Objective */}
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Mục Tiêu Nghề Nghiệp
                </h3>
                <p>
                  <span className="font-medium">Vị trí mong muốn:</span>{" "}
                  {dataDetail?.profile?.objective?.desired_position || "--"}
                </p>
                <p>
                  <span className="font-medium">Cấp bậc mong muốn:</span>{" "}
                  {dataDetail?.profile?.objective?.desired_level || "--"}
                </p>
                <p>
                  <span className="font-medium">Ngành nghề:</span>{" "}
                  {dataDetail?.profile?.objective?.profession || "--"}
                </p>
                <p>
                  <span className="font-medium">Loại hình công việc:</span>{" "}
                  {dataDetail?.profile?.objective?.employment_type || "--"}
                </p>
                <p>
                  <span className="font-medium">Kinh nghiệm:</span>{" "}
                  {dataDetail?.profile?.objective?.experience_level || "--"}
                </p>
                <p>
                  <span className="font-medium">Trình độ học vấn:</span>{" "}
                  {dataDetail?.profile?.objective?.education_level || "--"}
                </p>
                <p>
                  <span className="font-medium">Mức lương mong muốn:</span>{" "}
                  {dataDetail?.profile?.objective?.salary_from?.toLocaleString() ||
                    "--"}{" "}
                  -{" "}
                  {dataDetail?.profile?.objective?.salary_to?.toLocaleString() ||
                    "--"}{" "}
                  VND
                </p>
              </div>
            </div>

            {/* Resume and Additional Sections */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Hồ Sơ và Tài Liệu</h3>
              <p>
                <span className="font-medium">CV:</span>
                <a
                  href={dataDetail?.profile?.objective?.file || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline ml-2"
                >
                  {dataDetail?.profile?.objective?.file ? "Tải xuống CV" : "--"}
                </a>
              </p>
            </div>

            {/* Additional Information Sections */}
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Kỹ Năng</h3>
                <p>
                  {dataDetail?.skills.length
                    ? dataDetail.skills.join(", ")
                    : "--"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Giải Thưởng</h3>
                <p>
                  {dataDetail?.Award.length
                    ? dataDetail.Award.join(", ")
                    : "--"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Dự Án Cá Nhân</h3>
                <p>
                  {dataDetail?.PersonalProject.length
                    ? dataDetail.PersonalProject.join(", ")
                    : "--"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Chứng Chỉ</h3>
                <p>
                  {dataDetail?.Certificate.length
                    ? dataDetail.Certificate.join(", ")
                    : "--"}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalViewProfileCandidate;

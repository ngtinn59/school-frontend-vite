import { Avatar, Button, Modal } from "antd";
import { ICandidateProfileSaved } from "../profile-saved";
import { getInformationResume } from "../../../services/api/employer/profileSaved";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import toast from "react-hot-toast";
interface Profile {
  id: number;
  name: string;
  title: string;
  phone: string;
  email: string;
  age: number;
  image_url: string;
  gender: number;
  location: string;
  website: string;
}

interface Objective {
  desired_position: string;
  desiredLevel: {
    id: number;
    name: string;
  };
  profession: {
    id: number;
    name: string;
  };
  employmentType: {
    id: number;
    name: string;
  };
  experienceLevel: {
    id: number;
    name: string;
  };
  work_address: string;
  educationLevel: {
    id: number;
    name: string;
  };
  salary_from: number;
  salary_to: number;
  file: string;
  status: string;
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
}

interface AboutMe {
  id: number;
  description: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  start_date: string;
  end_date: string;
  additionalDetail: string;
}

interface Skill {
  id: number;
  name: string;
  level: string;
}

interface PersonalProject {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  description: string;
}

interface Certificate {
  id: number;
  title: string;
  provider: string;
  issueDate: string;
  description: string;
  certificateUrl: string;
}

interface WorkExperience {
  id: number;
  position: string;
  company: string;
  start_date: string;
  end_date: string;
  responsibilities: string;
}

interface Award {
  id: number;
  title: string;
  provider: string;
  issueDate: string;
  description: string;
}

interface UserProfile {
  id: number;
  profile: Profile;
  objective: Objective;
  aboutme: AboutMe[];
  educations: Education[];
  skills: Skill[];
  PersonalProject: PersonalProject[];
  Certificate: Certificate[];
  WorkExperience: WorkExperience[];
  Award: Award[];
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
  const [dataDetail, setDataDetail] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInforesume = async () => {
    setLoading(true);
    try {
      if (data?.id !== undefined) {
        const res = await getInformationResume(data.id);
        if (res && res.status_code === 200) {
          setDataDetail(res.data);
        }
        if (res && res.status_code !== 200) {
          setDataDetail(null);
          toast.error(res.message);
        }
      }
    } catch (error) {
      console.log(error);
      setDataDetail(null);
    }
    setLoading(false);
  };

  const handleOpenChange = (visible: boolean) => {
    setLoading(true);
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
          <div className="profile-container p-6 bg-white">
            {/* Profile and Avatar Section */}
            <div className="flex items-center mb-6">
              <Avatar
                size={120}
                src={dataDetail.profile?.image_url || ""}
                alt="Applicant Avatar"
                className="mr-4"
                icon={<UserOutlined />}
              />
              <div className="flex justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    {dataDetail.profile?.name || "No Name"}
                  </h3>
                  <p>
                    <strong>Chức vụ:</strong>{" "}
                    {dataDetail.profile?.title || "--"}
                  </p>
                  <p>
                    <strong>Khu vực:</strong>{" "}
                    {dataDetail.profile?.location || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Thông tin liên hệ
                </h3>
                <p>
                  <strong>Số điện thoại:</strong>{" "}
                  {dataDetail.profile?.phone || "--"}
                </p>
                <p>
                  <strong>Email:</strong> {dataDetail.profile?.email || "--"}
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href={dataDetail.profile?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {dataDetail.profile?.website || "--"}
                  </a>
                </p>
                <p>
                  <strong>Tuổi:</strong> {dataDetail.profile?.age || "--"}
                </p>
                <p>
                  <strong>Giới tính:</strong>{" "}
                  {dataDetail.profile?.gender === 1 ? "Nam" : "Nữ"}
                </p>
              </div>

              {/* Career Objective */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Mục tiêu nghề nghiệp
                </h3>
                <p>
                  <strong>Vị trí mong muốn:</strong>{" "}
                  {dataDetail.objective?.desired_position || "--"}
                </p>
                <p>
                  <strong>Trình độ mong muốn:</strong>{" "}
                  {dataDetail.objective?.desiredLevel?.name || "--"}
                </p>
                <p>
                  <strong>Ngành nghề:</strong>{" "}
                  {dataDetail.objective?.profession?.name || "--"}
                </p>
                <p>
                  <strong>Hình thức làm việc:</strong>{" "}
                  {dataDetail.objective?.employmentType?.name || "--"}
                </p>
                <p>
                  <strong>Kinh nghiệm làm việc:</strong>{" "}
                  {dataDetail.objective?.experienceLevel?.name || "--"}
                </p>
                <p>
                  <strong>Nơi làm:</strong>{" "}
                  {dataDetail.objective?.work_address || "--"}
                </p>
                <p>
                  <strong>Trình độ học vấn:</strong>{" "}
                  {dataDetail.objective?.educationLevel?.name || "--"}
                </p>
                <p>
                  <strong>Quốc gia:</strong>{" "}
                  {dataDetail.objective?.country?.name || "--"}
                </p>
                <p>
                  <strong>Tỉnh/thành phố:</strong>{" "}
                  {dataDetail.objective?.city?.name || "--"}
                </p>
                <p>
                  <strong>Quận huyện:</strong>{" "}
                  {dataDetail.objective?.district?.name || "--"}
                </p>
                <p>
                  <strong>Mức lương mong muốn:</strong>{" "}
                  {dataDetail.objective?.salary_from
                    ? `${dataDetail.objective.salary_from} - ${dataDetail.objective.salary_to} VND`
                    : "--"}
                </p>
              </div>

              {/* About Me */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Giới thiệu bản thân
                </h3>
                <p>{dataDetail.aboutme?.[0]?.description || "--"}</p>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Giáo dục</h3>
                {dataDetail.educations?.map((edu, idx) => (
                  <div key={idx} className="mb-2">
                    <p>
                      <strong>Bằng cấp:</strong> {edu.degree || "--"}
                    </p>
                    <p>
                      <strong>Trường:</strong> {edu.institution || "--"}
                    </p>
                    <p>
                      <strong>Thời gian:</strong>{" "}
                      {dayjs(edu.start_date).format("DD/MM/YYYY") || "--"} -{" "}
                      {dayjs(edu.end_date).format("DD/MM/YYYY") || "--"}
                    </p>
                    <p>
                      <strong>Chi tiết bổ sung:</strong>{" "}
                      {edu.additionalDetail || "--"}
                    </p>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Kỹ năng</h3>
                {dataDetail.skills?.map((skill, idx) => (
                  <p key={idx}>
                    <strong>{skill.name}:</strong> {skill.level}
                  </p>
                ))}
              </div>

              {/* Personal Projects */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Dự án cá nhân</h3>
                {dataDetail.PersonalProject?.map((project, idx) => (
                  <div key={idx} className="mb-2">
                    <p>
                      <strong>Tên dự án:</strong> {project.title || "--"}
                    </p>
                    <p>
                      <strong>Thời gian:</strong>{" "}
                      {dayjs(project.start_date).format("DD/MM/YYYY") || "--"} -{" "}
                      {dayjs(project.end_date).format("DD/MM/YYYY") || "--"}
                    </p>
                    <p>
                      <strong>Mô tả:</strong> {project.description || "--"}
                    </p>
                  </div>
                ))}
              </div>

              {/* Certificates */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Chứng chỉ</h3>
                {dataDetail.Certificate?.map((cert, idx) => (
                  <div key={idx} className="mb-2">
                    <p>
                      <strong>Tiêu đề:</strong> {cert.title || "--"}
                    </p>
                    <p>
                      <strong>Nhà cung cấp:</strong> {cert.provider || "--"}
                    </p>
                    <p>
                      <strong>Ngày cấp:</strong>{" "}
                      {dayjs(cert.issueDate).format("DD/MM/YYYY") || "--"}
                    </p>
                    <p>
                      <strong>Mô tả:</strong> {cert.description || "--"}
                    </p>
                    <p>
                      <strong>Website:</strong>{" "}
                      <a
                        href={cert?.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {cert?.certificateUrl || "--"}
                      </a>
                    </p>
                  </div>
                ))}
              </div>

              {/* Work Experience */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Kinh nghiệm làm việc
                </h3>
                {dataDetail.WorkExperience?.map((work, idx) => (
                  <div key={idx} className="mb-2">
                    <p>
                      <strong>Vị trí:</strong> {work.position || "--"}
                    </p>
                    <p>
                      <strong>Công ty:</strong> {work.company || "--"}
                    </p>
                    <p>
                      <strong>Thời gian:</strong>{" "}
                      {dayjs(work.start_date).format("DD/MM/YYYY") || "--"} -{" "}
                      {dayjs(work.end_date).format("DD/MM/YYYY") || "--"}
                    </p>
                    <p>
                      <strong>Nhiệm vụ:</strong> {work.responsibilities || "--"}
                    </p>
                  </div>
                ))}
              </div>

              {/* Awards */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Giải thưởng</h3>
                {dataDetail.Award?.map((award, idx) => (
                  <div key={idx} className="mb-2">
                    <p>
                      <strong>Tiêu đề:</strong> {award?.title || "--"}
                    </p>
                    <p>
                      <strong>Nhà cung cấp:</strong> {award?.provider || "--"}
                    </p>
                    <p>
                      <strong>Ngày cấp:</strong>{" "}
                      {dayjs(award?.issueDate).format("DD/MM/YYYY") || "--"}
                    </p>
                    <p>
                      <strong>Mô tả:</strong> {award?.description || "--"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* CV Download Section */}
            {dataDetail.objective?.file && (
              <div className="mt-6 text-center">
                <Button
                  type="primary"
                  href={dataDetail.objective.file}
                  target="_blank"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Tải CV
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalViewProfileCandidate;

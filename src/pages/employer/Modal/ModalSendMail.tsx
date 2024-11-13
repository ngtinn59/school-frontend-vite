import { Form, Input, Modal } from "antd";
import { ICandidateProfileSaved, IMailReq } from "../profile-saved";
import { sendMailToCandidate } from "../../../services/api/employer/profileSaved";
import toast from "react-hot-toast";
import { useState } from "react";

interface IModalSendMail {
  data: ICandidateProfileSaved | null;
  setData: (data: ICandidateProfileSaved | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalSendMail: React.FC<IModalSendMail> = ({
  data,
  setData,
  open,
  setOpen,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSendMail = async (values: IMailReq) => {
    setLoading(true);
    try {
      if (!data?.id) return;
      const res = await sendMailToCandidate(data.id, values);
      console.log(res);
      if (res && res.success) {
        toast.success(res.message || "Gửi mail thành công");
        form.resetFields();
        setData(null);
        setOpen(false);
      }
    } catch (error) {
      toast.error("Gửi mail thất bại");
      console.log(error);
    }
    setLoading(false);
  };

  const onCreate = (values: IMailReq) => {
    handleSendMail(values);
  };
  return (
    <>
      <Modal
        open={open}
        title={`Gửi mail ứng viên ${data?.name}`}
        okText="Gửi"
        cancelText="Hủy"
        okButtonProps={{
          loading: loading,
          autoFocus: true,
          htmlType: "submit",
          className: "bg-blue-500",
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        maskClosable={false}
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            disabled={loading}
            name="form_send_mail"
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="subject"
          label="Tiêu đề"
          rules={[
            {
              required: true,
              message: "Tiêu đề không được để trống!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="message"
          label="Nội dung"
          rules={[
            {
              required: true,
              message: "Nội dung không được để trống!",
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalSendMail;

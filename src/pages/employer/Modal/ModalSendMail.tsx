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
        toast.success(res.message || "Email sent successfully");
        form.resetFields();
        setData(null);
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to send email");
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
        title={`Send email to candidate ${data?.name}`}
        okText="Send"
        cancelText="Cancel"
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
          label="Subject"
          rules={[
            {
              required: true,
              message: "Subject is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="message"
          label="Message"
          rules={[
            {
              required: true,
              message: "Message is required!",
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

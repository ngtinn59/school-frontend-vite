import { Form, Input, Modal } from "antd";

import toast from "react-hot-toast";
import { useState } from "react";
import {
  IApplicant,
  IDataSendMailReq,
  sendMailToApplicant,
} from "../../../services/api/employer/manage-appicants";

interface IModalSendMailApplicant {
  dataApplicant: IApplicant;
  jobID: number;
  setDataApplicant: (data: IApplicant) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalSendMailApplicant: React.FC<IModalSendMailApplicant> = ({
  jobID,
  dataApplicant,
  setDataApplicant,
  open,
  setOpen,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMail = async (values: IDataSendMailReq) => {
    setLoading(true);
    try {
      const res = await sendMailToApplicant(jobID, dataApplicant.id, values);
      if (res && res.success) {
        toast.success(res.message || "Email sent successfully!");
        setOpen(false);
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send email!");
    }
    setLoading(false);
  };

  const onCreate = (values: IDataSendMailReq) => {
    handleSendMail(values);
  };
  return (
    <>
      <Modal
        open={open}
        title={`Send email to candidate ${dataApplicant?.name}`}
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
        afterClose={() => {
          setDataApplicant({} as IApplicant);
          form.resetFields();
        }}
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
            {
              min: 5,
              message: "Subject must be at least 5 characters!",
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
            {
              min: 10,
              message: "Message must be at least 10 characters!",
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalSendMailApplicant;

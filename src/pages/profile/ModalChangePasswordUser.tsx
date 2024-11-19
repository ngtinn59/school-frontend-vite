import { Form, Input, Modal } from "antd";
import { useState } from "react";

import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL_API } from "../../utils/constants";

interface IModalChangePasswordUser {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalChangePasswordUser: React.FC<IModalChangePasswordUser> = ({
  open,
  setOpen,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const onCreate = async (values: any) => {
    console.log("values: ", values);
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL_API}/api/reset-password`,
        values,
      );
      console.log("res: ", res);
      if (res && res?.data?.message) {
        toast.success(res.data.message || "Change password successfully!");
        form.resetFields();
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error.response.data.error || "Change password failed!");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal
        open={open}
        title={`Change Password`}
        okText="Save"
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
            name="form_change_password"
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Email is required!",
            },
            {
              type: "email",
              message: "Email is not valid!",
            },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          label="OTP"
          name="token"
          rules={[
            {
              required: true,
              message: "OTP is required!",
            },
          ]}
        >
          <Input placeholder="Enter OTP" />
        </Form.Item>
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Password is required!",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters!",
            },
          ]}
        >
          <Input placeholder="Enter password" />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalChangePasswordUser;

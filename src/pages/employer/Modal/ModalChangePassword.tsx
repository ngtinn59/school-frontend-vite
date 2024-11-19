import { Form, Input, Modal } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { changePassword } from "../../../services/api/employer/profileSaved";

interface IModalChangePassword {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalChangePassword: React.FC<IModalChangePassword> = ({
  open,
  setOpen,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [openModalChangePasswordUser, setOpenModalChangePasswordUser] =
    useState(false);
  const onCreate = async (values: any) => {
    setLoading(true);
    try {
      const res = await changePassword(values);
      if (res && res.status_code === 200) {
        toast.success(res.message || "Change password successfully!");
        form.resetFields();
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error.response.data.error.current_password);
    } finally {
      setLoading(false);
      setOpen(false);
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
          name="current_password"
          label="Current Password"
          rules={[
            {
              required: true,
              message: "Current Password is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="new_password"
          label="New Password"
          rules={[
            {
              required: true,
              message: "New Password is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalChangePassword;

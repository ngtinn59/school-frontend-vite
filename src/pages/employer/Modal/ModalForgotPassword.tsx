import { Form, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL_API } from "../../../utils/constants";
import ModalChangePasswordUser from "../../profile/ModalChangePasswordUser";

interface IModalForgotPassword {
  open: boolean;
  setOpen: (open: boolean) => void;
  setIsSuccess?: (isSuccess: boolean) => void;
}

const ModalForgotPassword: React.FC<IModalForgotPassword> = ({
  open,
  setOpen,
  setIsSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);

  const onCreate = async (values: any) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL_API}/api/forgot-password`,
        values,
      );
      console.log("res: ", res);
      if (res && res?.data?.message) {
        toast.success(res.data.message || "Email is successfully!");
        form.resetFields();
        setIsSuccess && setIsSuccess(true);
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error.response.data.error || "Email is failed!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <Modal
        open={open}
        title={`Forgot Password`}
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
        <ModalChangePasswordUser
          open={openChangePassword}
          setOpen={setOpenChangePassword}
        />
      </Modal>
    </>
  );
};

export default ModalForgotPassword;

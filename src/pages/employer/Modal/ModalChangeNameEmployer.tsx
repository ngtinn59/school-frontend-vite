import { Form, Input, Modal } from "antd";
import { useState } from "react";
import { changeNameEmployer } from "../../../services/api/employer/profileSaved";
import toast from "react-hot-toast";

interface IModalChangeNameEmployer {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalChangeNameEmployer: React.FC<IModalChangeNameEmployer> = ({
  open,
  setOpen,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const onCreate = async (values: any) => {
    setLoading(true);
    try {
      const res = await changeNameEmployer(values);
      if (res && res.status_code === 200) {
        toast.success(res.message || "Change name successfully!");
        form.resetFields();
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error.response.data.error.message || "Change name failed!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <Modal
        open={open}
        title={`Change Name Employer`}
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
            name="form_change_name_employer"
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="new_name"
          label="New Name"
          rules={[
            {
              required: true,
              message: "Name is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Modal>
    </>
  );
};

export default ModalChangeNameEmployer;

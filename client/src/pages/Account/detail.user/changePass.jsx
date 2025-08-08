import React from "react";
import { Form, Input, Button, message } from "antd";
import "./changePass.scss";
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from "../../../reduxs/auth.thunk";
import { useAlert } from "../../../components/alert";

function ChangePass() {


  const dispatch = useDispatch();
  const { loading, error, message: stateMessage } = useSelector(state => state.auth);
  const [form] = Form.useForm();

  const { showSuccess, showError } = useAlert();

  const onFinish = async (values) => {
    console.log("Form values:", values);

    try {
      const result = await dispatch(changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      }));

      if (changePassword.fulfilled.match(result)) {
        showSuccess('Đổi mật khẩu thành công');
        form.resetFields();
      } else {
        showError(result.payload || 'Đổi mật khẩu thất bại');
      }
    } catch (error) {
      showError('Có lỗi xảy ra');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="change-pass-container">
      <h2>Đổi mật khẩu</h2>
      <Form
        form={form}
        layout="vertical"
        name="changePass"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Mật khẩu cũ"
          name="currentPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu cũ" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu xác nhận không khớp"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu mới" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChangePass;

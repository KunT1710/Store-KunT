import React from "react";
import { Modal, Button, Input, Typography, Space } from "antd";
import { useForm, Controller } from "react-hook-form";

const { Text } = Typography;

const pinkMain = "#ec407a";
const pinkBg = "#fff0f6";

const RegisterConfirmModal = ({ open, onClose, onConfirm, onResend, email }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Gọi onConfirm(data.code) nếu muốn
    if (onConfirm) onConfirm(data.code);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      title={
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <Text strong style={{ fontSize: 20, color: pinkMain }}>
            Xác thực tài khoản
          </Text>
        </div>
      }
      bodyStyle={{
        padding: "32px 24px 24px 24px",
        background: pinkBg,
        borderRadius: 16,
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }} size={20}>
        <div style={{ textAlign: "center", color: pinkMain }}>
          Mã xác thực đã được gửi tới Gmail: <b>{email || "your@email.com"}</b>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="code"
            control={control}
            rules={{ required: "Vui lòng nhập mã xác thực" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập mã xác thực"
                size="large"
                style={{ borderRadius: 8, border: errors.code ? "1px solid #ff4d4f" : undefined }}
              />
            )}
          />
          {errors.code && (
            <div style={{ color: pinkMain, marginTop: 4, fontSize: 13 }}>
              {errors.code.message}
            </div>
          )}
          <Button
            block
            type="primary"
            htmlType="submit"
            size="large"
            style={{
              marginTop: 16,
              background: pinkMain,
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              transition: "background 0.3s",
            }}
          >
            Xác thực
          </Button>
        </form>
        <Button
          type="link"
          style={{ color: pinkMain, fontWeight: 500, marginTop: 0 }}
          onClick={onResend} // Nếu muốn thêm chức năng gửi lại mã
        >
          Gửi lại mã xác thực
        </Button>
      </Space>
    </Modal>
  );
};

export default RegisterConfirmModal;
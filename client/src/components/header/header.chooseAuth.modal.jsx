import React from "react";
import { Modal, Button, Space, Typography } from "antd";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";

const { Text } = Typography;

const ChooseAuthModal = ({ open, onClose, onLogin, onRegister }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      title={
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <Text strong style={{ fontSize: 20, color: "#ec407a" }}>
            Bạn muốn tiếp tục với?
          </Text>
        </div>
      }
      styles={{
        body: {
          padding: "32px 24px 24px 24px",
          background: "#fff0f6",
          borderRadius: 16,
        }
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }} size={20}>
        <Button
          block
          type="primary"
          icon={<UserOutlined />}
          onClick={onLogin}
          style={{
            background: "#ec407a",
            borderColor: "#ec407a",
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 8,
            boxShadow: "0 2px 8px 0 rgba(236, 64, 122, 0.10)",
          }}
          size="large"
        >
          Đăng Nhập
        </Button>
        <Button
          block
          icon={<UserAddOutlined />}
          onClick={onRegister}
          style={{
            background: "#f8bbd0",
            color: "#ad1457",
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            boxShadow: "0 2px 8px 0 rgba(236, 64, 122, 0.10)",
          }}
          size="large"
        >
          Đăng Ký
        </Button>
      </Space>
    </Modal>
  );
};

export default ChooseAuthModal;
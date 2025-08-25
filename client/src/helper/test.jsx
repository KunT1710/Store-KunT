import { Col } from "antd";
import {
  NotificationOutlined,
  UserOutlined,
  ProfileOutlined,
  BankOutlined,
  HomeOutlined,
  LockOutlined,
  SettingOutlined,
  SafetyOutlined,
  ShoppingOutlined,
  GiftOutlined,
  EditOutlined,
} from "@ant-design/icons";

const SidebarAccount = () => {
  return (
    <Col span={4} style={{ padding: "16px", background: "#fff" }}>
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <img
          src="https://via.placeholder.com/60"
          alt="avatar"
          style={{ borderRadius: "50%", marginBottom: "8px" }}
        />
        <div style={{ fontWeight: "bold" }}>thinbophm156</div>
        <div style={{ color: "#1890ff", cursor: "pointer", fontSize: "12px" }}>
          <EditOutlined /> Sửa Hồ Sơ
        </div>
      </div>

      <div style={{ marginBottom: "8px", color: "#f5222d" }}>
        <NotificationOutlined /> Thông Báo
      </div>

      <div style={{ marginBottom: "8px" }}>
        <UserOutlined /> Tài Khoản Của Tôi
      </div>

      <div style={{ marginLeft: "16px", marginBottom: "4px", color: "#f5222d" }}>
        <ProfileOutlined /> Hồ Sơ
      </div>

      <div style={{ marginLeft: "16px", marginBottom: "4px" }}>
        <BankOutlined /> Ngân Hàng
      </div>

      <div style={{ marginLeft: "16px", marginBottom: "4px" }}>
        <HomeOutlined /> Địa Chỉ
      </div>

      <div style={{ marginLeft: "16px", marginBottom: "4px" }}>
        <LockOutlined /> Đổi Mật Khẩu
      </div>

      <div style={{ marginLeft: "16px", marginBottom: "4px" }}>
        <SettingOutlined /> Cài Đặt Thông Báo
      </div>

      <div style={{ marginLeft: "16px", marginBottom: "8px" }}>
        <SafetyOutlined /> Những Thiết Lập Riêng Tư
      </div>

      <div style={{ marginBottom: "8px" }}>
        <ShoppingOutlined /> Đơn Mua
      </div>

      <div style={{ marginBottom: "8px" }}>
        <GiftOutlined /> Kho Voucher
      </div>
    </Col>
  );
};

export default SidebarAccount;

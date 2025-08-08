import React from "react";
import { Form, Input, Button } from "antd";
import AddressFields from "./address.user";
import AccountHeader from "../components/account.header";
import Footer from "../../../components/footer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../../../reduxs/auth.thunk";

const pinkBg = "#fce4ec";
const pinkMain = "#ec407a";
const pinkMainHover = "#e91e63";
const cardShadow = "0 4px 24px rgba(236, 64, 122, 0.15)";

const DetailUser = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onFinish = (values) => {
    dispatch(updateUserInfo(values, navigate));
    // console.log(values);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: pinkBg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AccountHeader title="Thay đổi thông tin" />

      <h2
        style={{
          textAlign: "center",
          margin: "32px 0 24px 0",
          color: pinkMain,
          fontWeight: 700,
        }}
      >
        Thông tin người dùng
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          maxWidth: 650,
          margin: "0 auto",
          background: "#fff",
          padding: "32px 24px 24px 24px",
          borderRadius: 24,
          boxShadow: cardShadow,
          marginBottom: 16,
          width: "100%",
        }}
      >
        <Form.Item
          label={
            <span style={{ fontWeight: 600, color: pinkMain }}>
              Họ và Tên
            </span>
          }
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập Họ và Tên" }]}
        >
          <Input
            placeholder="Nguyễn Văn A"
            style={{
              background: pinkBg,
              border: "none",
              borderRadius: 8,
            }}
          />
        </Form.Item>

        <Form.Item
          label={
            <span style={{ fontWeight: 600, color: pinkMain }}>
              Số điện thoại
            </span>
          }
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            { pattern: /^[0-9]{9,11}$/, message: "SĐT không hợp lệ" },
          ]}
        >
          <Input
            placeholder="0123456789"
            style={{
              background: pinkBg,
              border: "none",
              borderRadius: 8,
            }}
          />
        </Form.Item>

        {/* Nhúng các trường địa chỉ */}
        <AddressFields />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              background: pinkMain,
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = pinkMainHover)
            }
            onMouseOut={(e) => (e.currentTarget.style.background = pinkMain)}
          >
            Lưu thông tin
          </Button>
        </Form.Item>
      </Form>

      <div style={{ marginTop: "auto" }}>
        <Footer />
      </div>
    </div>
  );
};

export default DetailUser;

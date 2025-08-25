import React, { useState } from "react";
import Footer from "../../../components/footer";
import AccountHeader from "../components/account.header";
import { Row, Col, Menu } from "antd";
import { UserOutlined, BellOutlined, ShoppingOutlined, GiftOutlined, LogoutOutlined, } from "@ant-design/icons";
import UserProfile from "./user.profile";
import AddressList from "./address.list";
import ChangePass from "./changePass";
import PrivacySettings from "./privacySettings";
import OrderUpdate from "./order.update";
import ReviewUser from "./review.user";
import ShopsFeedback from "./shops.feedback";
import OrderList from "./order.list";
import VoucherUser from "./voucher.user";
import Logout from "./logout.user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../../reduxs/auth.thunk";
import "./detail.user.scss";

function DetailInfo() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  // const user = useSelector(state => state.auth.user);
  // console.log(user);

  const [selectedKey, setSelectedKey] = useState("user-1");


  const items = [
    {
      key: "user",
      icon: <UserOutlined />,
      label: "Hồ sơ của tôi",
      children: [
        { key: "user-1", label: "Thông tin cá nhân" },
        { key: "user-2", label: "Địa chỉ" },
        { key: "user-3", label: "Đổi mật khẩu" },
        { key: "user-4", label: "Thiết lập riêng tư" },
      ],
    },
    {
      key: "notification",
      icon: <BellOutlined />,
      label: "Thông báo",
      children: [
        { key: "noti-1", label: "Cập nhật đơn hàng" },
        { key: "noti-2", label: "Các đánh giá sản phẩm" },
        { key: "noti-3", label: "Phản hồi từ cửa hàng" },
      ],
    },
    {
      key: "order",
      icon: <ShoppingOutlined />,
      label: "Đơn hàng đã mua",
    },
    {
      key: "voucher",
      icon: <GiftOutlined />,
      label: "Voucher của tôi",
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: "Đăng xuất"
    }
  ];

  const renderContent = (key) => {
    switch (key) {
      case "user-1":
        return <UserProfile />;
      case "user-2":
        return <AddressList />;
      case "user-3":
        return <ChangePass />;
      case "user-4":
        return <PrivacySettings />;
      case "noti-1":
        return <OrderUpdate />;
      case "noti-2":
        return <ReviewUser />;
      case "noti-3":
        return <ShopsFeedback />;
      case "order":
        return <OrderList />;
      case "voucher":
        return <VoucherUser />;
      case "logout":
        return <Logout />
      default:
        return <div>Chọn mục cần hiển thị</div>;
    }
  };

  return (
    <>
      <AccountHeader title={"Thông tin người dùng"} />

      <Row gutter={[4, 8]} style={{ background: "#f0f2f5", padding: "16px" }}>
        <Col span={4}></Col>

        <Col span={4}>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => setSelectedKey(e.key)}
            style={{ width: "100%" }}
            items={items}
          />
        </Col>

        <Col span={12}>
          <div
            style={{
              background: "white",
              minHeight: "200px",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            {renderContent(selectedKey)}
          </div>
        </Col>

        <Col span={4}></Col>
      </Row>

      <Footer />
    </>
  );
}

export default DetailInfo;

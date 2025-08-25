import React, { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from "../../../reduxs/auth.slice";
import { useNavigate } from 'react-router-dom';
import { useAlert } from "../../../components/alert";
import "./logout.user.scss";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccess } = useAlert();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');

    // Dispatch action logout để clear state
    dispatch(logout());

    // Hiển thị thông báo
    showSuccess('Đăng xuất thành công');

    // Chuyển về trang chủ
    navigate('/');
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    handleLogout();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="container-logout">
        <div className="header-logout">
          <h2>Đăng xuất</h2>
        </div>

        <div className="logout-action">
          <button className="btn-logout" onClick={showModal}>
            <LogoutOutlined />
            <span>Đăng xuất khỏi tài khoản</span>
          </button>
        </div>
      </div>

      <Modal
        title="Xác nhận đăng xuất"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Đăng xuất"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?</p>
      </Modal>
    </>
  );
}

export default Logout;

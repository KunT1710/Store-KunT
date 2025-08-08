import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./address.list.scss";
import { useSelector, useDispatch } from "react-redux";
import AddressFields from "./address.user";
import { Form, Modal, message } from "antd";
import { updateUserInfo, deleteUserAddress } from "../../../reduxs/auth.thunk";
import { useAlert } from "../../../components/alert";

function AddressList() {
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.auth.user);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const addresses = user?.address || [];
  const { showSuccess, showError } = useAlert();

  const handleAddAddress = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.submit();
  };

  const onFinish = (values) => {
    dispatch(updateUserInfo(values)).then(() => {
      setOpen(false);
      form.resetFields();
      showSuccess("Thêm địa chỉ thành công !!!");
    });
  };

  const handleDelete = (addressId) => {
    // console.log(addressId);
    dispatch(deleteUserAddress(addressId))
      .then(() => showSuccess('Xóa địa chỉ thành công!'))
      .catch(() => showError('Xóa địa chỉ thất bại!'));
  }

  return (
    <div className="address-container">
      <div className="address-header">
        <h2>Địa chỉ của tôi</h2>
        <button className="add-address-new" onClick={handleAddAddress}>
          <FontAwesomeIcon icon={faPlus} />
          Thêm địa chỉ mới
        </button>
        <Modal
          title="Thêm địa chỉ mới"
          open={open}
          onCancel={handleCancel}
          onOk={handleOk}
          okText="Lưu"
          cancelText="Huỷ"
          className="custom-modal"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <AddressFields />
          </Form>
        </Modal>
      </div>

      {addresses.length === 0 ? (
        <div className="address-empty">
          <div className="empty-icon">
            <FontAwesomeIcon icon={faPlus} size="3x" color="#ccc" />
          </div>
          <p>Bạn chưa có địa chỉ.</p>
        </div>
      ) : (
        <div className="address-list">
          {addresses.map((addr) => {
            // console.log(addr);
            // console.log(index); // Thêm dòng này để kiểm tra giá trị addr
            return addr ? (
              <div key={addr._id} className="address-item">
                <div className="address-text">
                  <b>Địa chỉ:</b> {addr.street}, {addr.ward}, {addr.district}, {addr.province}
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(addr._id)}
                  title="Xoá"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}

export default AddressList;

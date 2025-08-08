import React from 'react';
import { Modal, Button, List, Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAddress } from '../../reduxs/payment.slice';
import { useNavigate } from 'react-router-dom';

const ModalChangeAddress = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Chọn địa chỉ có sẵn
  const handleAddressSelect = (address) => {
    dispatch(setSelectedAddress(address));
    onClose();
  };

  // Chuyển đến trang quản lý địa chỉ
  const handleManageAddresses = () => {
    navigate('/info-user');
    onClose();
  };

  // Danh sách địa chỉ
  const renderAddressList = () => (
    <List
      dataSource={user?.address || []}
      renderItem={(address) => (
        <List.Item
          onClick={() => handleAddressSelect(address)}
          style={{
            cursor: 'pointer',
            padding: '12px',
            border: '1px solid #eee',
            marginBottom: '8px',
            borderRadius: '4px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.borderColor = '#ec407a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = '#eee';
          }}
        >
          <div style={{ width: '100%' }}>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>
              <strong>{user?.fullName || 'Chưa có tên'}</strong> {user?.phone || 'Chưa có SĐT'}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>
              {address.street}, {address.ward}, {address.district}, {address.province}
            </div>
          </div>
        </List.Item>
      )}
    />
  );

  // Không có địa chỉ
  const renderNoAddress = () => (
    <Empty description="Bạn chưa có địa chỉ nào" style={{ padding: '20px' }} />
  );

  return (
    <Modal
      title="Chọn Địa Chỉ"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>
      ]}
      width={600}
      destroyOnHidden
    >
      {user?.address && user.address.length > 0 ? (
        <>
          {renderAddressList()}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Button type="link"
            onClick={handleManageAddresses}>
              Quản lý địa chỉ
            </Button>
          </div>
        </>
      ) : (
        renderNoAddress()
      )}
    </Modal>
  );
};

export default ModalChangeAddress;

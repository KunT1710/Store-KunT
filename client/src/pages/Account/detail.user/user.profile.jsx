import React, { useEffect } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo_2 } from '../../../reduxs/auth.thunk';

const { Text } = Typography;

const UserProfile = () => {

  const user = useSelector(state => state.auth.user);
  // console.log(user);
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user, form]);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(updateUserInfo_2(values));
    // console.log('Dữ liệu gửi đi:', values);
  };

  // Màu chủ đạo
  const mainPink = '#ec407a';
  const mainPinkHover = '#d8376c';

  return (
    <div
      style={{
        maxWidth: 500,
        margin: '0 auto',
        padding: 24,
        borderRadius: 8,
      }}
    >
      <h2 style={{ color: mainPink, fontWeight: 600, marginBottom: 8 }}>
        Hồ Sơ Của Tôi
      </h2>
      <Text type="secondary" style={{ color: '#666', fontSize: 14 }}>
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </Text>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: 24 }}
      >
        <Form.Item
          label={
            <span style={{ color: '#333', fontWeight: 500 }}>Họ và Tên</span>
          }
          name="fullName"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
        >
          <Input
            placeholder="Nhập họ và tên"
            style={{ borderRadius: 4 }}
            onFocus={(e) =>
              (e.target.style.boxShadow = `0 0 0 2px rgba(236, 64, 122, 0.2)`)
            }
            onBlur={(e) => (e.target.style.boxShadow = 'none')}
          />
        </Form.Item>

        <Form.Item
          label={
            <span style={{ color: '#333', fontWeight: 500 }}>Gmail</span>
          }
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Email không hợp lệ' },
          ]}
        >
          <Input
            placeholder="Nhập email"
            style={{ borderRadius: 4 }}
            onFocus={(e) =>
              (e.target.style.boxShadow = `0 0 0 2px rgba(236, 64, 122, 0.2)`)
            }
            onBlur={(e) => (e.target.style.boxShadow = 'none')}
          />
        </Form.Item>

        <Form.Item
          label={
            <span style={{ color: '#333', fontWeight: 500 }}>
              Số điện thoại
            </span>
          }
          name="phone"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại' },
            {
              pattern: /^[0-9]{10,11}$/,
              message: 'Số điện thoại không hợp lệ',
            },
          ]}
        >
          <Input
            placeholder="Nhập số điện thoại"
            style={{ borderRadius: 4 }}
            onFocus={(e) =>
              (e.target.style.boxShadow = `0 0 0 2px rgba(236, 64, 122, 0.2)`)
            }
            onBlur={(e) => (e.target.style.boxShadow = 'none')}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: 100,
              backgroundColor: mainPink,
              borderColor: mainPink,
              fontWeight: 500,
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = mainPinkHover;
              e.target.style.borderColor = mainPinkHover;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = mainPink;
              e.target.style.borderColor = mainPink;
            }}
          >
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfile;

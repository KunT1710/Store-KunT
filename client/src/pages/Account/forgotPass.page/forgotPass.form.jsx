import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Typography, Card } from 'antd';
import StoreLogo from '../../../assets/img/StoreLogo.png'; // Đổi lại đường dẫn nếu cần

const { Title } = Typography;

const pinkBg = '#fce4ec';
const pinkMain = '#ec407a';
const pinkMainHover = '#e91e63';
const cardShadow = '0 4px 24px rgba(236, 64, 122, 0.15)';

const validateEmail = (value) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!value) return "Vui lòng nhập Gmail";
  if (!isEmail) return "Gmail không hợp lệ";
  return true;
};

const ForgotPasswordForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Forgot password data:', data);
    // Gửi yêu cầu quên mật khẩu tại đây
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: pinkBg,
      transition: 'background 0.3s',
    }}>
      <Card style={{
        width: 400,
        padding: '32px 24px 24px 24px',
        borderRadius: 24,
        boxShadow: cardShadow,
        border: 'none',
        background: '#fff',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <img src={StoreLogo} alt="Logo" style={{ width: 64, height: 64, objectFit: 'contain' }} />
        </div>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 32, color: pinkMain, fontWeight: 700 }}>
          Quên mật khẩu
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: 16 }}>
            <Controller
              name="email"
              control={control}
              rules={{ validate: validateEmail }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập Gmail của bạn"
                  size="large"
                  style={{ background: pinkBg, border: 'none', borderRadius: 8 }}
                />
              )}
            />
            {errors.email && (
              <div style={{ color: pinkMain, marginTop: 4, fontSize: 13 }}>
                {errors.email.message}
              </div>
            )}
          </div>
          <Button
            block
            type="primary"
            htmlType="submit"
            size="large"
            style={{
              marginBottom: 16,
              background: pinkMain,
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              transition: 'background 0.3s',
            }}
            onMouseOver={e => e.currentTarget.style.background = pinkMainHover}
            onMouseOut={e => e.currentTarget.style.background = pinkMain}
          >
            Gửi yêu cầu lấy lại mật khẩu
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
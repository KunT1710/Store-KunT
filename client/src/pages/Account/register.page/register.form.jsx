import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Typography, Card } from 'antd';
import StoreLogo from '../../../assets/img/StoreLogo.png';
import RegisterConfirmModal from './register.confirm.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, verifyOtp, resendOtp } from '../../../reduxs/auth.thunk';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const pinkBg = '#fce4ec';
const pinkMain = '#ec407a';
const pinkMainHover = '#e91e63';
const cardShadow = '0 4px 24px rgba(236, 64, 122, 0.15)';

const validateUsername = (value) => {
  const isUsername = /^[a-zA-Z0-9_]{3,30}$/.test(value);
  if (!value) return "Vui lòng nhập Tên tài khoản";
  if (!isUsername) return "Tên người dùng phải từ 3 đến 30 ký tự và chỉ được chứa chữ cái, số hoặc dấu gạch dưới (_)";
  return true;
};

const validateEmail = (value) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!value) return "Vui lòng nhập Gmail";
  if (!isEmail) return "Gmail không hợp lệ";
  return true;
};



const RegisterForm = () => {
  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: { agree: false }
  });

  const dispatch = useDispatch();
  const { loading, error, message, pendingEmail } = useSelector(state => state.auth);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (pendingEmail) {
      setEmail(pendingEmail);
      setIsModalOpen(true);
    }
  }, [pendingEmail]);

  const navigate = useNavigate();

  const handleConfirm = (code) => {
    dispatch(verifyOtp({ email, otpCode: code }, navigate));
  };
  const handleResend = () => {
    if (email) {
      dispatch(resendOtp(email));
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');

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
          Đăng ký Tài Khoản
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div style={{ marginBottom: 16 }}>
            <Controller
              name="username"
              control={control}
              rules={{ validate: validateUsername }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Tên tài khoản"
                  size="large"
                  style={{ background: pinkBg, border: 'none', borderRadius: 8 }}
                />
              )}
            />
            {errors.username && (
              <div style={{ color: pinkMain, marginTop: 4, fontSize: 13 }}>
                {errors.username.message}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: 16 }}>
            <Controller
              name="email"
              control={control}
              rules={{ validate: validateEmail }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Gmail"
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

          {/* Password Field */}
          <div style={{ marginBottom: 16 }}>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Vui lòng nhập mật khẩu" }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Mật khẩu"
                  size="large"
                  style={{ background: pinkBg, border: 'none', borderRadius: 8 }}
                />
              )}
            />
            {errors.password && (
              <div style={{ color: pinkMain, marginTop: 4, fontSize: 13 }}>
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div style={{ marginBottom: 16 }}>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Vui lòng nhập mật khẩu xác nhận",
                validate: value =>
                  value === getValues("password") || "Mật khẩu không khớp"
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Xác nhận mật khẩu"
                  size="large"
                  style={{ background: pinkBg, border: 'none', borderRadius: 8 }}
                />
              )}
            />
            {errors.confirmPassword && (
              <div style={{ color: pinkMain, marginTop: 4, fontSize: 13 }}>
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          {/* Agree Terms */}
          <div style={{ marginBottom: 16 }}>
            <Controller
              name="agree"
              control={control}
              rules={{ required: "Bạn phải đồng ý với điều khoản sử dụng dịch vụ" }}
              render={({ field }) => (
                <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    {...field}
                    checked={field.value}
                    style={{ marginRight: 8, width: 18, height: 18 }}
                  />
                  <span>
                    Tôi đồng ý với <a href="/dieu-khoan-dich-vu" target="_blank" rel="noopener noreferrer" style={{ color: pinkMain, textDecoration: "underline" }}>điều khoản sử dụng dịch vụ</a>
                  </span>
                </label>
              )}
            />
            {errors.agree && (
              <div style={{ color: pinkMain, marginTop: 4, fontSize: 13 }}>
                {errors.agree.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            block
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            disabled={loading}
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
            Đăng ký
          </Button>
        </form>
      </Card>
      <RegisterConfirmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        onResend={handleResend}
        email={email}
      />
    </div>
  );
};

export default RegisterForm;

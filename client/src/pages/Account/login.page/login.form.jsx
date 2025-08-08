import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Typography, Card, Flex, Alert } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import StoreLogo from '../../../assets/img/StoreLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../reduxs/auth.thunk';
import { useAlert } from '../../../components/alert';

const { Title } = Typography;

const pinkBg = '#fce4ec';
const pinkMain = '#ec407a';
const pinkMainHover = '#e91e63';
const pinkIconBg = '#f8bbd0';
const pinkIcon = '#ad1457';
const cardShadow = '0 4px 24px rgba(236, 64, 122, 0.15)';

const validateAccount = (value) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/.test(value);
  const isUsername = /^[a-zA-Z0-9_]{3,30}$/.test(value);

  if (!value) return "Vui lòng nhập Gmail, SĐT hoặc Tên tài khoản";
  if (!isEmail && !isPhone && !isUsername)
    return "Phải là Gmail, SĐT hoặc Tên tài khoản";
  return true;
};

const LoginForm = () => {
  const {showSuccess} = useAlert();
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { remember: true }
  });

  const { loading, error, isAuthenticated, user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  //  Xử lý đăng nhập
  const onSubmit = (data) => {
    dispatch(loginUser(data.account, data.password));
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === 'user') {
      showSuccess('Đăng nhập thành công!');
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

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
          Store KunT
        </Title>

        {error && (
          <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: 16 }}>
            <Controller
              name="account"
              control={control}
              rules={{ validate: validateAccount }}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<UserOutlined style={{ color: pinkMain }} />}
                  placeholder="Gmail, SĐT hoặc Tên tài khoản"
                  style={{ background: pinkBg, border: 'none', borderRadius: 8 }}
                  size="large"
                />
              )}
            />
            {errors.account && (
              <div style={{ color: pinkMain, marginTop: 4, fontSize: 13 }}>
                {errors.account.message}
              </div>
            )}
          </div>
          <div style={{ marginBottom: 16 }}>
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Vui lòng nhập mật khẩu' }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined style={{ color: pinkMain }} />}
                  placeholder="Mật khẩu"
                  style={{ background: pinkBg, border: 'none', borderRadius: 8 }}
                  size="large"
                />
              )}
            />
            {errors.password && (
              <div style={{ color: pinkMain, marginTop: 4, fontSize: 13 }}>
                {errors.password.message}
              </div>
            )}
          </div>
          <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  style={{ color: pinkMain, marginRight: 6 }}
                >
                  Ghi nhớ đăng nhập
                </Checkbox>
              )}
            />
            <a href="/forgotpass" style={{ color: pinkMain, fontWeight: 500 }}>Quên mật khẩu?</a>
          </Flex>
          <Button
            block
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
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
            Đăng nhập
          </Button>
          <div style={{ textAlign: 'center', color: '#888', fontWeight: 500 }}>
            Chưa có tài khoản? <a href="/register" style={{ color: pinkMain, fontWeight: 600 }}>Đăng ký ngay</a>
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <div style={{ marginBottom: 12, fontWeight: 500, color: pinkMain }}>
              hoặc đăng nhập với:
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
              <a
                href="#"
                style={{
                  background: pinkIconBg,
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: pinkIcon,
                  fontSize: 20,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px 0 rgba(236, 64, 122, 0.10)',
                  transition: 'background 0.3s, color 0.3s',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = pinkMain;
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = pinkIconBg;
                  e.currentTarget.style.color = pinkIcon;
                }}
              >
                <FontAwesomeIcon icon={faGoogle} />
              </a>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;

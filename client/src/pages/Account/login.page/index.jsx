import React from 'react';
import LoginForm from './login.form';
import AccountHeader from '../components/account.header';
import Footer from '../../../components/footer';

function LoginPage() {
  return (
    <>
      <AccountHeader title ="Đăng Nhập"/>
      <LoginForm />
      <Footer />
    </>
  );
};

export default LoginPage;
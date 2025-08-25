import Footer from "../../../components/footer";
import AccountHeader from "../components/account.header";
import RegisterForm from "./register.form";

function RegisterPage(){
  return(
    <>
      <AccountHeader title="Đăng Ký"/>
      <RegisterForm/>
      <Footer/>
    </>
  );
}

export default RegisterPage;
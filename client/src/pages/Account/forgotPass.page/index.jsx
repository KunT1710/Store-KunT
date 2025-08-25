import Footer from "../../../components/footer";
import AccountHeader from "../components/account.header";
import ForgotPasswordForm from "./forgotPass.form";

function ForgotPassPage() {
  return (
    <>
      <AccountHeader title="Quên Mật Khẩu" />
      <ForgotPasswordForm/>
      <Footer/>
    </>
  );
}

export default ForgotPassPage;
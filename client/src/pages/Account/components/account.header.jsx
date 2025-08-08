import { Row, Col } from "antd";
import Logo1 from "../../../assets/img/Logo1.svg";
import "./account.header.scss";
import { useNavigate } from "react-router-dom";


function AccountHeader({ title }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="center" className="login-header">
        <Col xs={0} md={2} lg={3}></Col>

        <Col xs={24} md={20} lg={18}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={17}>
              <div className="login-header" >
                <div className="login-header__left" onClick={() => handleClick()}>
                  <img src={Logo1} alt="logo" className="logo" />
                  <div className="store-title-group">
                    <p className="nameStore">Cửa hàng</p>
                    <p className="nameStore nameStore--kunt">KunT</p>
                  </div>
                </div>

              </div>
            </Col>
            <Col xs={24} md={7}>
              <div className="login-header__right">
                <span>{title}</span>
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs={0} md={2} lg={3}></Col>
      </Row>
    </>
  );
}

export default AccountHeader;
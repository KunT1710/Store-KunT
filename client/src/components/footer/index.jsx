import logo_footer from "../../assets/img/Logo_3.svg";
import LastFooter from "./last.footer";
import LeftFooter from "./left.footer";
import RightFooter from "./right.footer";
import { Row, Col } from "antd";

function Footer() {
  const logo = logo_footer;
  const nameStore = "KunT";

  const footerContainerStyle = {
    background: "#c2a7a7",
    minHeight: "220px",
    padding: 0,
    display: "flex",
    overflow: "hidden",
    width: "100%",
  };

  return (
    <>
      <div style={footerContainerStyle}>
        <Row gutter={0} style={{ width: "100%" }}>
          <Col
            className="footer-left"
            xs={24}
            sm={24}
            md={12}
            span={12}
            style={{
              borderRight: "2px solid black",
              padding: "16px",
              minHeight: "200px",
            }}
          >
            <LeftFooter logo={logo} nameStore={nameStore} />
          </Col>
          <Col className="footer-right" span={12} xs={24} sm={24} md={12}>
            <RightFooter />
          </Col>
        </Row>
      </div>
      <LastFooter />
    </>
  );
}
export default Footer;

import { Row, Col } from "antd";
import LeftBanner1 from "./left.banner_1.container";
import RightBanner1 from "./right.banner_1";
import "./style.scss";

function Banner1() {
  return (
    <>
      <Row gutter={[16, 16]} justify="center" className="banner1-container">
        <Col xs={0} md={2} lg={3}></Col>

        <Col xs={24} md={20} lg={18}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={17}>
              <div>
                <LeftBanner1 />
              </div>
            </Col>
            <Col xs={24} md={7}>
              <div>
                <RightBanner1 />
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs={0} md={2} lg={3}></Col>
      </Row>
    </>
  );
}

export default Banner1;
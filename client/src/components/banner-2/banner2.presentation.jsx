import { Row, Col } from "antd";

function Banner2Presentation({ bannerUrl, onClick }) {
  return (
    <Row gutter={[16, 16]} justify="center">
      {/* Bên trái trống */}
      <Col xs={0} md={2} lg={3}></Col>

      {/* Nội dung chính */}
      <Col xs={24} md={20} lg={18}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <div className="banner2-image-wrapper" onClick={onClick}>
              <img
                src={bannerUrl}
                alt="Ảnh quảng cáo"
                className="banner2-image"
              />
            </div>
          </Col>
        </Row>
      </Col>

      {/* Bên phải trống */}
      <Col xs={0} md={2} lg={3}></Col>
    </Row>
  );
}

export default Banner2Presentation;

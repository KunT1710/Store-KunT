import "./style.scss";
import { Row, Col } from "antd";

function Banner3({ images = [] }) {
  const handleClick = (imgSrc, idx) => {
    console.log("Click banner3: ", idx);
  };
  return (
    <Row gutter={[16, 16]} justify="center">
      {/* Bên trái trống */}
      <Col xs={0} md={2} lg={3}></Col>

      {/* Nội dung chính */}
      <Col xs={24} md={20} lg={18}>
        <Row gutter={[16, 16]}>
          {images.map((imgSrc, idx) => (
            <Col xs={24} sm={12} md={8} key={idx}>
              <div className="banner3-image-wrapper"
                onClick={() => handleClick(imgSrc, idx)}
              >
                <img src={imgSrc} alt={`Quảng cáo ${idx + 1}`} />
              </div>
            </Col>
          ))}
        </Row>
      </Col>

      {/* Bên phải trống */}
      <Col xs={0} md={2} lg={3}></Col>
    </Row>
  );
}

export default Banner3;

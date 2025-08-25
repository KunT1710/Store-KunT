import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Row, Col } from "antd";
import "./right.footer.scss";

function RightFooter() {
  
  const handleClick = (target) => {
    return () => {
      switch (target) {
        case "orderTracking":
          window.open("/kiem-tra-don-hang", "_blank");
          break;
        case "productSearch":
          window.open("/tim-kiem-san-pham", "_blank");
          break;
        case "shoppingGuide":
          window.open("/huong-dan-mua-hang", "_blank");
          break;
        case "returnPolicy":
          window.open("/chinh-sach-doi-tra", "_blank");
          break;
        case "paymentPolicy":
          window.open("/phuong-thuc-thanh-toan", "_blank");
          break;
        case "privacyPolicy":
          window.open("/chinh-sach-bao-mat", "_blank");
          break;
        case "facebook":
          window.open("https://www.facebook.com/kunt1710", "_blank");
          break;
        case "instagram":
          window.open("https://www.instagram.com", "_blank");
          break;
        case "twitter":
          window.open("https://www.twitter.com", "_blank");
          break;
        case "youtube":
          window.open("https://www.youtube.com", "_blank");
          break;
        default:
          console.log("Unknown target clicked");
          break;
      }
    };
  };

  return (
    <>
      <Row gutter={0} className="right-footer">
        <Col span={12}>
          <h2>Hướng dẫn</h2>
          <ul>
            <li onClick={handleClick("orderTracking")}>Kiểm tra đơn hàng</li>
            <li onClick={handleClick("productSearch")}>Tìm kiếm sản phẩm</li>
            <li onClick={handleClick("shoppingGuide")}>Hướng dẫn mua hàng</li>
          </ul>
          <div className="footer-divider"></div>
        </Col>
        <Col span={12}>
          <h2>Chính sách</h2>
          <ul>
            <li onClick={handleClick("returnPolicy")}>Chính sách đổi trả</li>
            <li onClick={handleClick("paymentPolicy")}>
              Chính sách thanh toán
            </li>
            <li onClick={handleClick("privacyPolicy")}>Chính sách bảo mật</li>
          </ul>
          <div className="footer-divider"></div>
          <div className="ion-gr">
            <FontAwesomeIcon
              icon={faFacebook}
              onClick={handleClick("facebook")}
            />
            <FontAwesomeIcon
              icon={faInstagram}
              onClick={handleClick("instagram")}
            />
            <FontAwesomeIcon
              icon={faTwitter}
              onClick={handleClick("twitter")}
            />
            <FontAwesomeIcon
              icon={faYoutube}
              onClick={handleClick("youtube")}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default RightFooter;

import { Row, Col } from "antd";
import "./style.scss";

function OrderTrackingPage() {
  return (
    <>
      <Row gutter={[16, 16]} justify="center" className="order-tracking-container">
        <Col xs={0} md={2} lg={3}></Col>

        <Col xs={24} md={20} lg={18}>
          <h1>Hướng dẫn kiểm tra đơn hàng Store KunT</h1>

          <h2>1. Đăng nhập tài khoản</h2>
          <p>
            Vui lòng đăng nhập vào tài khoản Store KunT đã sử dụng để đặt hàng.
          </p>

          <h2>2. Truy cập mục “Đơn hàng của tôi”</h2>
          <p>
            Tại giao diện chính, chọn mục <strong>Đơn hàng của tôi</strong> để xem danh sách đơn hàng đã đặt.
          </p>

          <h2>3. Xem chi tiết đơn hàng</h2>
          <ul>
            <li>Xem thông tin sản phẩm, số lượng, tổng giá trị đơn.</li>
            <li>Kiểm tra trạng thái xử lý: <strong>Đang xử lý, Đang giao, Đã giao</strong>.</li>
            <li>Click vào mã đơn hàng để xem chi tiết lộ trình giao hàng.</li>
          </ul>

          <h2>4. Hỗ trợ thêm</h2>
          <p>
            Nếu cần hỗ trợ nhanh, vui lòng liên hệ CSKH qua Hotline <strong>0123456789</strong> hoặc email <a href="mailto:hotro@storekunt.com">hotro@storekunt.com</a>.
          </p>
        </Col>

        <Col xs={0} md={2} lg={3}></Col>
      </Row>
    </>
  );
}

export default OrderTrackingPage;

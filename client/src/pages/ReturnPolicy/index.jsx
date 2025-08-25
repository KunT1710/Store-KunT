import { Row, Col } from "antd";
import "./style.scss";

function ReturnPolicyPage() {
  return (
    <>
      <Row gutter={[16, 16]} justify="center" className="return-policy-container">
        <Col xs={0} md={2} lg={3}></Col>

        <Col xs={24} md={20} lg={18}>
          <h1>Chính sách đổi trả Store KunT</h1>

          <h2>1. Thời gian đổi trả</h2>
          <p>
            Khách hàng có thể thực hiện đổi trả sản phẩm trong vòng <strong>7 ngày</strong> kể từ ngày nhận hàng.
          </p>

          <h2>2. Điều kiện đổi trả</h2>
          <ul>
            <li>Sản phẩm còn nguyên tem, nhãn mác, chưa qua sử dụng.</li>
            <li>Có hóa đơn mua hàng hoặc mã đơn hàng xác nhận.</li>
            <li>Không áp dụng đổi trả với các sản phẩm giảm giá thanh lý, hàng tươi sống đã qua chế biến.</li>
          </ul>

          <h2>3. Quy trình đổi trả</h2>
          <ol>
            <li>Liên hệ Bộ phận CSKH qua Hotline <strong>0123456789</strong> hoặc email <a href="mailto:hotro@storekunt.com">hotro@storekunt.com</a> để đăng ký đổi trả.</li>
            <li>Chuẩn bị sản phẩm đầy đủ bao bì, phụ kiện (nếu có) và gửi về địa chỉ kho của Store KunT.</li>
            <li>Sau khi kiểm tra, Store KunT sẽ liên hệ để thực hiện đổi sản phẩm mới hoặc hoàn tiền theo thỏa thuận.</li>
          </ol>

          <h2>4. Lưu ý</h2>
          <ul>
            <li>Chi phí vận chuyển phát sinh (nếu có) sẽ được thông báo khi đăng ký đổi trả.</li>
            <li>Store KunT có quyền từ chối đổi trả nếu sản phẩm không đáp ứng đủ điều kiện trên.</li>
          </ul>
        </Col>

        <Col xs={0} md={2} lg={3}></Col>
      </Row>
    </>
  );
}

export default ReturnPolicyPage;

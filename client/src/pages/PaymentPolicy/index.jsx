import { Row, Col } from "antd";
import "./style.scss";

function PaymentPolicyPage() {
  return (
    <>
      <Row
        gutter={[16, 16]}
        justify="center"
        className="payment-policy-container"
      >
        <Col xs={0} md={2} lg={3}></Col>

        <Col xs={24} md={20} lg={18}>
          <h1>Chính sách thanh toán Store KunT</h1>

          <h2>1. Phương thức thanh toán</h2>
          <ul>
            <li>
              <strong>Thanh toán khi nhận hàng (COD):</strong> Khách hàng thanh
              toán trực tiếp cho nhân viên giao hàng khi nhận đủ sản phẩm.
            </li>
            <li>
              <strong>Chuyển khoản ngân hàng:</strong> Thực hiện thanh toán vào
              tài khoản được Store KunT cung cấp trong quá trình đặt hàng.
            </li>
            <li>
              <strong>Thanh toán qua ví điện tử:</strong> Hỗ trợ các ví Momo,
              ZaloPay, VNPay… theo hướng dẫn trên website hoặc app Store KunT.
            </li>
          </ul>

          <h2>2. Bảo mật thanh toán</h2>
          <p>
            Store KunT cam kết bảo mật toàn bộ thông tin thanh toán của khách
            hàng bằng công nghệ mã hóa SSL và không lưu trữ thông tin thẻ trên
            hệ thống.
          </p>

          <h2>3. Lưu ý</h2>
          <ul>
            <li>
              Trong trường hợp giao dịch không thành công nhưng bị trừ tiền,
              Store KunT sẽ phối hợp với ngân hàng hoặc ví điện tử để hoàn tiền
              trong vòng 5-7 ngày làm việc.
            </li>
            <li>
              Nếu có bất kỳ thắc mắc về thanh toán, vui lòng liên hệ CSKH qua
              Hotline <strong>0123456789</strong>.
            </li>
          </ul>
        </Col>

        <Col xs={0} md={2} lg={3}></Col>
      </Row>
    </>
  );
}

export default PaymentPolicyPage;

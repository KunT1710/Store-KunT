import { Row, Col } from "antd";
import "./style.scss";

function PrivacyPolicyPage() {
  return (
    <>
      <Row gutter={[16, 16]} justify="center" className="privacy-policy-container">
        <Col xs={0} md={2} lg={3}></Col>

        <Col xs={24} md={20} lg={18}>
          <h1>Chính sách bảo mật Store KunT</h1>

          <h2>1. Mục đích thu thập thông tin</h2>
          <p>
            Store KunT thu thập thông tin cá nhân của khách hàng nhằm mục đích:
          </p>
          <ul>
            <li>Xử lý đơn hàng và giao hàng đúng địa chỉ.</li>
            <li>Liên hệ, chăm sóc khách hàng, giải quyết khiếu nại.</li>
            <li>Gửi thông tin khuyến mãi, ưu đãi (nếu khách hàng đồng ý).</li>
          </ul>

          <h2>2. Phạm vi thông tin thu thập</h2>
          <ul>
            <li>Họ tên, số điện thoại, địa chỉ giao hàng.</li>
            <li>Email, thông tin tài khoản đăng nhập.</li>
            <li>Lịch sử mua hàng, phản hồi, đánh giá.</li>
          </ul>

          <h2>3. Bảo vệ thông tin khách hàng</h2>
          <ul>
            <li>Store KunT cam kết không chia sẻ thông tin khách hàng cho bên thứ ba nếu không có sự đồng ý của khách hàng, trừ trường hợp pháp luật yêu cầu.</li>
            <li>Dữ liệu được lưu trữ và bảo mật trên hệ thống server đạt chuẩn bảo mật SSL.</li>
          </ul>

          <h2>4. Quyền của khách hàng</h2>
          <ul>
            <li>Khách hàng có quyền chỉnh sửa, cập nhật thông tin bất kỳ lúc nào.</li>
            <li>Có thể yêu cầu xóa thông tin cá nhân khi không còn sử dụng dịch vụ.</li>
          </ul>

          <h2>5. Liên hệ</h2>
          <p>
            Mọi thắc mắc về Chính sách bảo mật, vui lòng liên hệ:<br />
            Hotline: <strong>0123456789</strong><br />
            Email: <a href="mailto:hotro@storekunt.com">hotro@storekunt.com</a>
          </p>
        </Col>

        <Col xs={0} md={2} lg={3}></Col>
      </Row>
    </>
  );
}

export default PrivacyPolicyPage;

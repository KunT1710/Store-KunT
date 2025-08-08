import { Row, Col } from "antd";
import "./style.scss";

function AboutPage() {
  return (
    <>
      <Row gutter={[16, 16]} justify="center" className="about-container">
        <Col xs={0} md={2} lg={3}></Col>

        <Col xs={24} md={20} lg={18}>
          <h1>Giới Thiệu về Cửa hàng KunT</h1>
          <p>
            Cửa hàng KunT là hệ thống tạp hóa hiện đại cung cấp đa dạng các sản phẩm thiết yếu phục vụ đời sống hằng ngày. Chúng tôi luôn đặt sự tiện lợi, chất lượng sản phẩm và sự hài lòng của khách hàng lên hàng đầu.
          </p>

          <h2>Sứ mệnh của KunT</h2>
          <p>
            KunT không chỉ đơn thuần là nơi mua sắm, mà còn là người bạn đồng hành tin cậy của mọi gia đình. Chúng tôi cam kết mang đến những sản phẩm an toàn, chất lượng cùng dịch vụ thân thiện, chuyên nghiệp.
          </p>

          <h2>Tầm nhìn</h2>
          <p>
            Trở thành chuỗi cửa hàng tạp hóa hiện đại, uy tín, phục vụ tốt nhất cho cộng đồng, góp phần nâng cao chất lượng cuộc sống và thúc đẩy tiêu dùng bền vững tại địa phương.
          </p>

          <h3>Với Khách hàng:</h3>
          <ul>
            <li>
              Tại cửa hàng: Không gian sạch sẽ, thoáng mát; trưng bày sản phẩm khoa học, dễ tìm kiếm; đa dạng mặt hàng từ thực phẩm, đồ gia dụng, sản phẩm chăm sóc cá nhân; giá cả minh bạch, thanh toán nhanh chóng; đội ngũ nhân viên nhiệt tình, thân thiện.
            </li>
            <li>
              Mua sắm online: Hệ thống website và ứng dụng Store KunT tiện lợi, dễ sử dụng; đặt hàng nhanh chóng; đa dạng hình thức thanh toán; giao hàng tận nơi đúng thời gian cam kết; chính sách đổi trả rõ ràng.
            </li>
          </ul>

          <h3>Với Nhà cung cấp:</h3>
          <ul>
            <li>
              Hợp tác minh bạch, đôi bên cùng phát triển.
            </li>
            <li>
              Ưu tiên các sản phẩm từ nhà sản xuất uy tín, hàng hóa có nguồn gốc rõ ràng.
            </li>
            <li>
              Hỗ trợ tiêu thụ sản phẩm của các hộ nông dân, cơ sở sản xuất địa phương, góp phần thúc đẩy kinh tế cộng đồng.
            </li>
          </ul>

          <h3>Với Nhân viên:</h3>
          <ul>
            <li>
              Môi trường làm việc thân thiện, chuyên nghiệp, có cơ hội phát triển nghề nghiệp.
            </li>
            <li>
              Chế độ đãi ngộ rõ ràng, minh bạch.
            </li>
            <li>
              KunT đề cao tinh thần đoàn kết, cùng nhau xây dựng môi trường làm việc tử tế, vui vẻ và đầy tự hào.
            </li>
          </ul>

          <h2>Giá trị cốt lõi</h2>
          <ul>
            <li>Uy tín - Chất lượng - Tận tâm</li>
            <li>Đặt khách hàng làm trung tâm</li>
            <li>Không ngừng đổi mới và hoàn thiện</li>
            <li>Đồng hành cùng cộng đồng</li>
          </ul>

        </Col>

        <Col xs={0} md={2} lg={3}></Col>
      </Row>
    </>
  );
}

export default AboutPage;

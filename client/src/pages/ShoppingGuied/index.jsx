import { Row, Col } from "antd";
// import "./style.scss";

function ShoppingGuidePage() {
  return (
    <>
      <Row gutter={[16, 16]} justify="center" className="shopping-guide-container">
        <Col xs={0} md={2} lg={3}></Col>

        <Col xs={24} md={20} lg={18}>
          <h1>Hướng dẫn mua hàng Store KunT</h1>

          <h2>1. Đăng nhập hoặc đăng ký tài khoản</h2>
          <p>
            Đăng nhập tài khoản Store KunT để thuận tiện trong việc đặt hàng, kiểm tra đơn và nhận ưu đãi.
          </p>

          <h2>2. Tìm kiếm sản phẩm</h2>
          <p>
            Sử dụng thanh tìm kiếm hoặc danh mục sản phẩm để chọn sản phẩm bạn cần.
          </p>

          <h2>3. Thêm sản phẩm vào giỏ hàng</h2>
          <p>
            Chọn số lượng, sau đó click <strong>Thêm vào giỏ hàng</strong>.
          </p>

          <h2>4. Kiểm tra giỏ hàng</h2>
          <p>
            Vào mục <strong>Giỏ hàng</strong>, kiểm tra sản phẩm, số lượng và tổng giá trị đơn.
          </p>

          <h2>5. Tiến hành thanh toán</h2>
          <ol>
            <li>Click <strong>Thanh toán</strong>.</li>
            <li>Điền đầy đủ thông tin giao hàng.</li>
            <li>Chọn phương thức thanh toán phù hợp (COD, chuyển khoản, ví điện tử).</li>
            <li>Xác nhận đơn hàng và hoàn tất.</li>
          </ol>

          <h2>6. Nhận hàng</h2>
          <p>
            Store KunT sẽ giao hàng đến địa chỉ bạn đã đăng ký trong thời gian sớm nhất.
          </p>
        </Col>

        <Col xs={0} md={2} lg={3}></Col>
      </Row>
    </>
  );
}

export default ShoppingGuidePage;

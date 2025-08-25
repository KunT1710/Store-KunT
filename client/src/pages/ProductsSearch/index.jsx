import { Row, Col } from "antd";
import "./style.scss";

function ProductSearchGuidePage() {
  return (
    <>
      <Row gutter={[16, 16]} justify="center" className="product-search-guide-container">
        <Col xs={0} md={2} lg={3}></Col>

        <Col xs={24} md={20} lg={18}>
          <h1>Hướng dẫn tìm kiếm sản phẩm Store KunT</h1>

          <h2>1. Sử dụng thanh tìm kiếm</h2>
          <p>
            Trên đầu trang website hoặc ứng dụng, nhập <strong>tên sản phẩm, từ khóa hoặc mã sản phẩm</strong> bạn muốn tìm.
          </p>

          <h2>2. Sử dụng bộ lọc</h2>
          <p>
            Sử dụng các bộ lọc theo <strong>danh mục, giá, thương hiệu</strong> để thu hẹp kết quả và tìm nhanh hơn.
          </p>

          <h2>3. Xem chi tiết sản phẩm</h2>
          <p>
            Click vào tên hoặc hình ảnh sản phẩm để xem thông tin chi tiết, giá, khuyến mãi và hướng dẫn sử dụng.
          </p>

          <h2>4. Thêm vào giỏ hàng</h2>
          <p>
            Sau khi tìm được sản phẩm ưng ý, chọn <strong>Thêm vào giỏ hàng</strong> để tiến hành mua sắm.
          </p>
        </Col>

        <Col xs={0} md={2} lg={3}></Col>
      </Row>
    </>
  );
}

export default ProductSearchGuidePage;

import { Row, Col } from "antd";
import { ProductSelection } from "../category.selections/product.selection";
import "./product.grid.scss";

function ProductGrid({ products }) {
  // Hiển thị tối đa 8 sản phẩm
  const displayProducts = products;
  // console.log(products);

  return (
    <Row gutter={[16, 16]}>
      {displayProducts &&
        displayProducts.map((product, idx) => (
          <Col xs={12} md={6} key={product._id || idx}>
            <ProductSelection product={product} />
          </Col>
        ))}
    </Row>
  );
}

export default ProductGrid;

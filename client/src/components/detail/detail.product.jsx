import { Row, Col } from "antd";
import ProductImageSlider from "./detail.product.imageSlider";
import ProductInfo from "./detail.product.info";
import ProductReview from "./detail.product.review";
import ProductPurchaseActions from "./detail.product.actions";
import CategorySeclection from "../category.selections";
import "./detail.product.scss";

function DetailProduct({ listProducts }) {

  const product = listProducts.product;
  const products = listProducts.relatedProducts;
  // console.log("DetailProduct listProducts:", listProducts);
  // console.log("DetailProduct product:", product);
  // console.log("DetailProduct product.categoryImage:", product.categoryImages);
  return (
    <>
      <Row gutter={[12, 12]} style={{ background: "#f0f2f5", padding: "16px" }}>
        <Col xs={1} xl={2} xxl={4}>
          {/* Khoảng trống */}
        </Col>
        <Col xs={14} xl={12} xxl={10}>
          {/* Ảnh categoryImage */}
          <ProductImageSlider images={product.categoryImages} />
          {/* Các sp liên quan */}
          <h2 className="related-products-title">Sản phẩm liên quan</h2>
          <CategorySeclection categoryName={""} products={products} showMore={false} showTitle={false} />
          {/* Thông tin sản phẩm (có mô tả có bảng có cột)*/}
          <ProductInfo specifications={product.specifications} />
          {/* Đánh giá sản phẩm */}
          <ProductReview />
        </Col>
        <Col xs={8} xl={8} xxl={6} className="sticky-buy-column">
          <ProductPurchaseActions product={ product } />
        </Col>
        <Col xs={1} xl={2} xxl={4}>
          {/* Khoảng trống */}
        </Col>
      </Row>
    </>
  );
}

export default DetailProduct;

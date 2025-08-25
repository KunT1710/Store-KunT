import { ProductSelection } from "./product.selection";
import "./style.scss";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import toSlug from "../../helper/toSlug";

function CategorySeclection({categoryName, products, showMore = true, showTitle = true }) {
  
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate(`/category/${toSlug(categoryName)}`);
  };
  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={0} md={2} lg={3}></Col>
        <Col xs={24} md={20} lg={18}>
          <div className={`section-container ${!showMore ? "detail" : ""} ${!showTitle ? "detail_product" : ""}`}>
            {showTitle && (
              <div className="section-header">
                <span className="section-title">{categoryName}</span>
              </div>
            )}
            <Row gutter={[16, 16]}>
              {products?.slice(0, 4).map((product, idx) => (
                <Col xs={12} sm={12} md={6} lg={6} key={product._id || idx}>
                  <ProductSelection product={product} />
                </Col>
              ))}
            </Row>
            {showMore && (
              <div className="other" onClick={handleShowMore}>
                <span>Xem thêm {categoryName}</span>
              </div>
            )}
          </div>
        </Col>
        <Col xs={0} md={2} lg={3}></Col>
      </Row>
    </>
  );
}

export default CategorySeclection;

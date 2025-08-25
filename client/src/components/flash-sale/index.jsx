import ProductGrid from "./product.grid";
import SelectionSale from "./selection.sale";
import "./style.scss";
import { Row, Col } from "antd";

function FlashSale({
  products,
  flashProducts,
  selectedTab,
  onChangeTab,
  currentMarketLabel,
  currentFlashLabel,
  loading,
  onFlashSaleEnd,
}) {
  let content = null;
  if (selectedTab === "market") {
    content = <ProductGrid products={products} />;
  } else if (selectedTab === "flash") {
    content = <ProductGrid products={flashProducts} />;
  } else if (selectedTab === "all") {
    content = (
      <div className="all-sale-grid">
        <ProductGrid products={products.slice(0, 4)} />
        <ProductGrid products={flashProducts.slice(0, 4)} />
      </div>
    );
  }

  return (
    <Row gutter={[16, 16]} justify="center" className="flash-sale">
      <Col xs={0} md={2} lg={3}></Col>
      <Col xs={24} md={20} lg={18}>
        <div className="container--flash-sale">
          <div className="flash-sale-header">
            <span className="header-title">FLASH SALE</span>
            <div className="lightning-bolt header-bolt"></div>
          </div>
          <SelectionSale
            selectedTab={selectedTab}
            onChangeTab={onChangeTab}
            currentMarketLabel={currentMarketLabel}
            currentFlashLabel={currentFlashLabel}
            onFlashSaleEnd={onFlashSaleEnd}
          />
          {loading ? <div>Đang tải dữ liệu...</div> : content}
          <div className="view-all">
            <span>Xem tất cả</span>
          </div>
        </div>
      </Col>
      <Col xs={0} md={2} lg={3}></Col>
    </Row>
  );
}

export default FlashSale;
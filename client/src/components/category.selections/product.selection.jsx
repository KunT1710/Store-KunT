import "./product.selection.scss";
import { useNavigate } from "react-router-dom";

export function ProductSelection({ product }) {
  const { price, salePrice } = product;
  const navigate = useNavigate();
  const discountPercent = Math.round(((price - salePrice) / price) * 100);
  const discountPercent_FlashSale = Math.round(((product.originalPrice - salePrice) / product.originalPrice) * 100);
  return (
      <div className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
      <div className="product-image">
        <img
          src={product.coverImage || product.imageCover}
          alt={product.name}
          title={product.name}
        />
      </div>

      <div className="product-info">
        <p className="product-title">{product.name}</p>

        <div className="price-wrapper">
          <span className="price-current">{salePrice.toLocaleString()}đ</span>
          <span className="price-old">
            {product.originalPrice?.toLocaleString() ||
              price?.toLocaleString() ||
              ""}
            đ
          </span>
          {salePrice < price && (
            <span className="discount-badge">-{discountPercent}%</span>
          )}
          {salePrice < product.originalPrice && (
            <span className="discount-badge">-{discountPercent_FlashSale}%</span>
          )}
        </div>
      </div>
      <button className="buy-button">MUA</button>
    </div>
  );
}

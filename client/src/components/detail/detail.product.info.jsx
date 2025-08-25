import React from "react";
import "./detail.product.info.scss";

function ProductInfo({ specifications }) {
  return (
    <>
      <div className="product-info-box">
        <h2 className="title">Thông tin sản phẩm</h2>

        <p className="description">
          {specifications.description || "Không có mô tả sản phẩm."}
        </p>
        <table className="product-table">
          <tbody>
            {Object.entries(specifications)
              .filter(([key]) => key !== "description")
              .map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductInfo;

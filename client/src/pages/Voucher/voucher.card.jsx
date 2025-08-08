import React from "react";
import { Button, Tag, Progress, Tooltip } from "antd";

const VoucherCard = ({ voucher, onApply, isApplied = false }) => {
  const {
    code,
    type,
    discount,
    isPercent,
    quantity,
    usedCount,
    expirationDate,
    minOrderValue,
    maxDiscountValue,
    description,
    calculatedDiscount
  } = voucher;

  const percentUsed = quantity > 0 ? Math.floor((usedCount / quantity) * 100) : 0;
  const remaining = quantity - usedCount;
  const isExpired = expirationDate && new Date(expirationDate) < new Date();
  const isOutOfStock = quantity > 0 && usedCount >= quantity;
  const isDisabled = isExpired || isOutOfStock || isApplied;

  // Format discount display
  const formatDiscount = () => {
    if (isPercent) {
      return `${discount}%`;
    } else {
      return `₫${discount.toLocaleString()}`;
    }
  };

  // Get voucher type display
  const getTypeDisplay = () => {
    switch (type) {
      case 'global': return 'Toàn bộ';
      case 'product': return 'Sản phẩm';
      case 'category': return 'Danh mục';
      case 'user': return 'Cá nhân';
      default: return 'Khác';
    }
  };

  return (
    <div className="voucher-card">
      {/* Bên trái */}
      <div className="voucher-left">
        <Tag color="red" className="corner-tag">Hot</Tag>
        <div className="discount-text">
          {formatDiscount()}
        </div>
        <div className="discount-type">
          {isPercent ? 'Giảm giá' : 'Giảm tiền'}
        </div>
        <div className="voucher-type">
          {getTypeDisplay()}
        </div>
      </div>

      {/* Bên phải */}
      <div className="voucher-right">
        <div className="voucher-header">
          <Tag color="red" className="limited-tag">
            <span style={{ fontWeight: 'bold' }}>
              ⚡ {quantity > 0 ? `Còn ${remaining} lượt` : 'Không giới hạn'}
            </span>
          </Tag>
          <span className="voucher-code">
            Mã: <span className="code-text">{code}</span>
          </span>
        </div>

        {description && (
          <div className="voucher-description">
            {description}
          </div>
        )}

        {minOrderValue > 0 && (
          <div className="voucher-conditions">
            Đơn tối thiểu: ₫{minOrderValue.toLocaleString()}
          </div>
        )}

        {calculatedDiscount && (
          <div className="voucher-savings">
            Tiết kiệm: ₫{calculatedDiscount.toLocaleString()}
          </div>
        )}

        {/* Tiến trình sử dụng */}
        {quantity > 0 && (
          <Progress percent={percentUsed} showInfo={false} strokeColor="#f5222d" style={{ margin: "8px 0" }} />
        )}

        <div className={`voucher-status ${isDisabled ? 'expired' : isApplied ? 'applied' : 'available'}`}>
          {isExpired
            ? "Hết hạn"
            : isOutOfStock
              ? "Hết lượt sử dụng"
              : isApplied
                ? "Đã áp dụng"
                : percentUsed > 80
                  ? "Sắp hết, nhanh tay!"
                  : "Sẵn sàng sử dụng"}
        </div>
      </div>

      {/* Nút lưu */}
      <div className="voucher-button">
        <Tooltip title={
          isExpired ? "Voucher đã hết hạn" :
            isOutOfStock ? "Voucher đã hết lượt sử dụng" :
              isApplied ? "Voucher đã được áp dụng" :
                "Áp dụng mã này"
        }>
          <Button
            type="primary"
            disabled={isDisabled}
            className={`apply-button ${isApplied ? 'applied' : isDisabled ? 'disabled' : 'available'}`}
            onClick={() => onApply?.(voucher)}
          >
            {isExpired ? "Hết hạn" :
              isOutOfStock ? "Hết lượt" :
                isApplied ? "Đã áp dụng" : "Áp dụng"}
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};



export default VoucherCard;

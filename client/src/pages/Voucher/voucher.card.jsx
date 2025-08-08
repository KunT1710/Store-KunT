import React from "react";
import { Tag, Progress, Button, Tooltip } from "antd";
import { CarOutlined } from "@ant-design/icons";

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
    calculatedDiscount,
    isActive
  } = voucher;

  const percentUsed = quantity > 0 ? Math.floor((usedCount / quantity) * 100) : 0;
  const remaining = quantity - usedCount;
  const isExpired = expirationDate && new Date(expirationDate) < new Date();
  const isOutOfStock = quantity > 0 && usedCount >= quantity;

  // Format discount display
  const formatDiscount = () => {
    if (isPercent) {
      return `${discount}%`;
    } else {
      return `${discount.toLocaleString()}₫`;
    }
  };

  // Chỉ render voucher còn sử dụng được
  if (isExpired || isOutOfStock || !isActive) {
    return null;
  }

  return (
    <div style={styles.card}>
      {/* Bên trái */}
      <div style={styles.left}>
        <Tag color="blue" style={styles.cornerTag}>Freeship</Tag>
        <div style={styles.iconWrapper}>
          <CarOutlined style={styles.icon} />
        </div>
        <div style={styles.platformLabel}>KUNT</div>
      </div>

      {/* Bên phải */}
      <div style={styles.right}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Tag color="blue" style={styles.flashTag}>
            ⚡ {quantity > 0 ? `Còn ${remaining} lượt` : 'Không giới hạn'}
          </Tag>
          <span style={{ fontWeight: "bold", fontSize: 16 }}>
            Giảm <span style={{ fontSize: 18 }}>{formatDiscount()}</span>
          </span>
        </div>

        {description && (
          <div style={{ margin: "6px 0", fontSize: 14, color: "#666" }}>
            {description}
          </div>
        )}

        {minOrderValue > 0 && (
          <div style={{ margin: "6px 0", fontSize: 14 }}>
            Đơn Tối Thiểu {minOrderValue.toLocaleString()}₫
          </div>
        )}

        {calculatedDiscount && (
          <div style={{ margin: "6px 0", fontSize: 14, color: "#1890ff", fontWeight: "bold" }}>
            Tiết kiệm: {calculatedDiscount.toLocaleString()}₫
          </div>
        )}

        {/* Tiến trình sử dụng */}
        {quantity > 0 && (
          <Progress percent={percentUsed} showInfo={false} strokeColor="#1890ff" style={{ margin: "8px 0" }} />
        )}

        <div style={{ fontSize: 13, color: "#1890ff" }}>
          {percentUsed > 80 ? "Đang hết nhanh" : "Sẵn sàng sử dụng"}
        </div>
      </div>

      {/* Nút lưu */}
      <div style={styles.buttonWrapper}>
        <Tooltip title={
          isApplied ? "Voucher đã được lưu" : "Lưu mã này"
        }>
          <Button
            type="primary"
            style={styles.saveButton}
            disabled={isApplied}
            onClick={() => onApply?.(voucher)}
          >
            {isApplied ? "Đã lưu" : "Lưu"}
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    border: "1px solid #e6f7ff",
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(24,144,255,0.1)",
    position: "relative",
    width: 600,
    margin: "20px auto",
    background: "#fff"
  },
  left: {
    backgroundColor: "#1890ff",
    color: "#fff",
    padding: "16px 8px",
    width: 130,
    textAlign: "center",
    position: "relative"
  },
  iconWrapper: {
    padding: "12px",
    fontSize: 36,
    marginBottom: 4
  },
  icon: {
    fontSize: 40,
    color: "#fff"
  },
  platformLabel: {
    fontSize: 14,
    fontWeight: "bold"
  },
  cornerTag: {
    position: "absolute",
    top: 4,
    left: -4,
    fontSize: 12,
    zIndex: 1
  },
  right: {
    flex: 1,
    padding: "12px 16px"
  },
  flashTag: {
    fontSize: 12,
    backgroundColor: "#40a9ff",
    color: "#fff",
    border: "none"
  },
  buttonWrapper: {
    padding: "12px 16px",
    display: "flex",
    alignItems: "center"
  },
  saveButton: {
    backgroundColor: "#1890ff",
    border: "none"
  }
};

export default VoucherCard;

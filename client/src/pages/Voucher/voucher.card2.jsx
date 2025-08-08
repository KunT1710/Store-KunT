import React from "react";
import { Tag, Progress, Button } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";

const VoucherCard2 = ({
  isExpired = false,
  isOutOfStock = false,
  discount = 60000,
  minOrder = 0,
  progressPercent = 50,
  isNewCustomer = true,
  platform = "KUNT",
  showHot = true
}) => {
  // Nếu hết hạn hoặc hết hàng thì không render
  if (isExpired || isOutOfStock) {
    return null;
  }

  return (
    <div style={styles.card}>
      {/* Bên trái */}
      <div style={styles.left}>
        {showHot && <Tag color="red" style={styles.cornerTag}>Hot</Tag>}
        <div style={styles.iconWrapper}>
          <ShoppingOutlined style={styles.icon} />
        </div>
        <div style={styles.platformLabel}>{platform}</div>
      </div>

      {/* Bên phải */}
      <div style={styles.right}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Tag color="red" style={styles.flashTag}>⚡ Số lượng có hạn</Tag>
          <span style={{ fontWeight: "bold", fontSize: 16 }}>
            Giảm <span style={{ fontSize: 18 }}>₫{discount.toLocaleString()}</span>
          </span>
        </div>

        <div style={{ margin: "6px 0", fontSize: 14 }}>
          Đơn Tối Thiểu ₫{minOrder.toLocaleString()}
        </div>

        {isNewCustomer && (
          <div style={{ marginBottom: 8 }}>
            <Tag style={styles.customerTag} bordered={true}>Dành cho bạn mới</Tag>
          </div>
        )}

        <Progress percent={progressPercent} showInfo={false} strokeColor="#f5222d" />

        <div style={{ fontSize: 13, color: "#f5222d" }}>
          Đang hết nhanh
        </div>
      </div>

      {/* Nút lưu */}
      <div style={styles.buttonWrapper}>
        <Button type="primary" style={styles.saveButton}>Lưu</Button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    border: "1px solid #eee",
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    position: "relative",
    width: 600,
    margin: "20px auto",
    background: "#fff"
  },
  left: {
    backgroundColor: "#f53d2d",
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
    backgroundColor: "#fa541c",
    color: "#fff",
    border: "none"
  },
  customerTag: {
    borderColor: "#f53d2d",
    color: "#f53d2d",
    fontWeight: 500,
    fontSize: 13
  },
  buttonWrapper: {
    padding: "12px 16px",
    display: "flex",
    alignItems: "center"
  },
  saveButton: {
    backgroundColor: "#f53d2d",
    border: "none"
  }
};

export default VoucherCard2;

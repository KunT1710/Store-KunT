import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCart } from "../../reduxs/cart.thunk";
import { setSelectedCartItems } from "../../reduxs/payment.slice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Lấy giỏ hàng khi user đã đăng nhập
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart(user._id));
    }
  }, [dispatch, user]);

  // Chọn/bỏ chọn sản phẩm
  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Chọn tất cả sản phẩm
  const handleSelectAll = () => {
    if (selectedProducts.length === items.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(items.map(item => item.product._id));
    }
  };

  // Tăng số lượng
  const handleIncrease = (productId) => {
    if (!user?._id) return;
    const newItems = items.map((item) =>
      item.product._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    dispatch(updateCart({ userId: user._id, items: newItems }));
  };

  // Giảm số lượng
  const handleDecrease = (productId) => {
    if (!user?._id) return;
    const newItems = items.map((item) =>
      item.product._id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    dispatch(updateCart({ userId: user._id, items: newItems }));
  };

  // Xóa sản phẩm khỏi giỏ
  const handleRemove = (productId) => {
    if (!user?._id) return;
    const newItems = items.filter((item) => item.product._id !== productId);
    dispatch(updateCart({ userId: user._id, items: newItems }));
  };

  // Tính tổng tiền các sản phẩm đã chọn
  const totalPrice = items.reduce((sum, item) => {
    if (selectedProducts.includes(item.product._id)) {
      return sum + item.product.price * item.quantity;
    }
    return sum;
  }, 0);

  return (
    <div
      className="container-cart"
      style={{
        background: "#fff",
        borderRadius: 4,
        padding: "12px 16px",
        margin: "16px auto",
        maxWidth: 1000,
      }}
    >
      <div
        className="header-cart"
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          paddingBottom: 8,
        }}
      >
        <div style={{ flex: 3, display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={selectedProducts.length === items.length && items.length > 0}
            onChange={handleSelectAll}
            style={{
              accentColor: "#ec407a",
              width: 16,
              height: 16,
              marginRight: 8,
            }}
          />
          <span style={{ fontWeight: 500 }}>
            {selectedProducts.length === items.length && items.length > 0 ? "Sản phẩm" : "Sản phẩm"}
          </span>
        </div>
        <span style={{ flex: 1, textAlign: "center", color: "#666" }}>
          Đơn Giá
        </span>
        <span style={{ flex: 1, textAlign: "center", color: "#666" }}>
          Số Lượng
        </span>
        <span style={{ flex: 1, textAlign: "center", color: "#666" }}>
          Số Tiền
        </span>
        <span style={{ flex: 1, textAlign: "center", color: "#666" }}>
          Thao Tác
        </span>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>Đang tải...</div>
      ) : error ? (
        <div style={{ textAlign: "center", color: "red", padding: "40px 0" }}>{error}</div>
      ) : !items || items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <p>Chưa có sản phẩm nào trong giỏ hàng</p>
          <button
            style={{
              background: "#ec407a",
              color: "#fff",
              border: "none",
              padding: "8px 24px",
              fontSize: 16,
              borderRadius: 4,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Mua Ngay
          </button>
        </div>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.product._id}
              className="cart-item"
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #eee",
                padding: "12px 0",
              }}
            >
              <input
                type="checkbox"
                checked={selectedProducts.includes(item.product._id)}
                onChange={() => handleSelectProduct(item.product._id)}
                style={{
                  accentColor: "#ec407a",
                  width: 16,
                  height: 16,
                  marginRight: 8,
                }}
              />
              <div style={{ flex: 3, display: "flex", alignItems: "center" }}>
                <img
                  src={item.product.coverImage}
                  alt={item.product.name}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    marginRight: 12,
                  }}
                />
                <span>{item.product.name}</span>
              </div>
              <span style={{ flex: 1, textAlign: "center", color: "#333" }}>
                {item.product.price?.toLocaleString()}₫
              </span>
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: "#333",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => handleDecrease(item.product._id)}
                  style={{
                    border: "1px solid #ccc",
                    background: "#fff",
                    width: 24,
                    height: 24,
                    cursor: "pointer",
                  }}
                >
                  -
                </button>
                <span style={{ margin: "0 8px" }}>{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(item.product._id)}
                  style={{
                    border: "1px solid #ccc",
                    background: "#fff",
                    width: 24,
                    height: 24,
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
              <span
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: "#ec407a",
                  fontWeight: 600,
                }}
              >
                {(item.product.price * item.quantity).toLocaleString()}₫
              </span>
              <span
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: "#ec407a",
                  cursor: "pointer",
                }}
                onClick={() => handleRemove(item.product._id)}
              >
                Xóa
              </span>
            </div>
          ))}
          <div
            className="cart-footer"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              background: "#fff",
              padding: "12px 16px",
              borderTop: "1px solid #eee",
              marginTop: 16,
            }}
          >
            <div
              style={{
                marginRight: 16,
                fontSize: 16,
              }}
            >
              Tổng cộng (
              <span style={{ fontWeight: 500 }}>
                {selectedProducts.length} Sản phẩm đã chọn
              </span>
              ): {" "}
              <span
                style={{
                  color: "#ec407a",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {totalPrice.toLocaleString()}₫
              </span>
            </div>
            <button
              style={{
                background: selectedProducts.length > 0 ? "#ec407a" : "#ccc",
                color: "#fff",
                border: "none",
                padding: "8px 24px",
                fontSize: 16,
                borderRadius: 4,
                cursor: selectedProducts.length > 0 ? "pointer" : "not-allowed",
              }}
              disabled={selectedProducts.length === 0}
              onClick={() => {
                if (!user?._id) {
                  alert("Vui lòng đăng nhập để mua hàng");
                  navigate("/login");
                  return;
                }

                if (selectedProducts.length > 0) {
                  // Lưu danh sách sản phẩm đã chọn vào payment state
                  dispatch(setSelectedCartItems(selectedProducts));
                  navigate("/payment");
                } else {
                  alert("Vui lòng chọn ít nhất một sản phẩm để mua hàng");
                }
              }}
            >
              {selectedProducts.length > 0 ? "Mua Hàng" : "Chọn sản phẩm"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

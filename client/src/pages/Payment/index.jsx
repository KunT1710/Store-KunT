import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  setSelectedAddress,
  setSelectedPaymentMethod,
  setSelectedVoucher,
} from "../../reduxs/payment.slice";
import { clearCart } from "../../reduxs/cart.slice";
import { createOrder, calculateShippingFee } from "../../reduxs/payment.thunk";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../helper/formatCurrency";
import Loading from "../../components/loading";
import ModalChangeAddress from "./modal.change.address";
import "./style.scss";

function PayMent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy data từ Redux store
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const {
    selectedAddress,
    selectedPaymentMethod,
    selectedVoucher,
    shippingFee,
    loading,
    error,
    selectedCartItems // Thêm selectedCartItems từ payment state
  } = useSelector((state) => state.payment);

  // State local
  const [vouchers, setVouchers] = useState([]);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Lọc sản phẩm đã chọn từ cart
  const selectedItems = selectedCartItems && selectedCartItems.length > 0
    ? items.filter(item => selectedCartItems.includes(item.product._id))
    : items; // Fallback: hiển thị tất cả nếu chưa có selectedCartItems

  // Tính toán tổng tiền
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const voucherDiscount = selectedVoucher ? selectedVoucher.discount || 0 : 0;
  const total = subtotal + shippingFee - voucherDiscount;



  // Xử lý khi chọn địa chỉ
  const handleAddressChange = () => {
    setShowAddressModal(true);
  };

  // Xử lý khi chọn phương thức thanh toán
  const handlePaymentMethodChange = (method) => {
    dispatch(setSelectedPaymentMethod(method));
  };

  // Xử lý khi chọn voucher
  const handleVoucherSelect = (voucher) => {
    dispatch(setSelectedVoucher(voucher));
    setShowVoucherModal(false);
  };

  // Xử lý đặt hàng
  const handlePlaceOrder = async () => {
    // Validation
    if (!user?._id) {
      alert("Vui lòng đăng nhập để đặt hàng");
      return;
    }

    if (!selectedItems || selectedItems.length === 0) {
      alert("Không có sản phẩm nào được chọn, vui lòng quay lại giỏ hàng");
      return;
    }

    if (!selectedAddress) {
      alert("Vui lòng chọn địa chỉ nhận hàng");
      return;
    }

    if (!selectedPaymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán");
      return;
    }

    // Kiểm tra số lượng sản phẩm
    const invalidItems = selectedItems.filter(item => item.quantity <= 0);
    if (invalidItems.length > 0) {
      alert("Số lượng sản phẩm phải lớn hơn 0");
      return;
    }

    const orderData = {
      user: user._id,
      items: selectedItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        unitPrice: item.product.price
      })),
      shippingAddress: selectedAddress,
      appliedCoupons: selectedVoucher ? [selectedVoucher._id] : [],
      subtotal,
      discount: voucherDiscount,
      total,
      paymentMethod: selectedPaymentMethod
    };

    try {
      console.log("Đang tạo đơn hàng:", orderData);
      const result = await dispatch(createOrder(orderData)).unwrap();
      console.log("Đơn hàng đã tạo:", result);

      // Clear cart sau khi đặt hàng thành công
      dispatch(clearCart());

      alert("Đặt hàng thành công! Đơn hàng của bạn đã được xử lý.");
      navigate("/order-tracking");
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert(`Có lỗi xảy ra khi đặt hàng: ${error}`);
    }
  };

  // Tính phí vận chuyển khi địa chỉ thay đổi
  useEffect(() => {
    if (selectedAddress) {
      dispatch(calculateShippingFee(selectedAddress));
    }
  }, [selectedAddress, dispatch]);

  // Lấy địa chỉ mặc định từ user
  useEffect(() => {
    // console.log("Test địa chỉ",user.address[0]);

    if (user && user.address && user.address.length > 0) {
      dispatch(setSelectedAddress(user.address[0]));
    }
  }, [user, dispatch]);

  return (
    <div className="container-payment">

      {/* Địa chỉ nhận hàng */}
      <div className="address-nhanHang">
        <div className="address_2-header">
          <FontAwesomeIcon icon={faLocationDot} className="icon" />
          <span>Địa chỉ nhận hàng</span>
        </div>
        <div className="address-info">
          <div>
            {selectedAddress ? (
              <>
                <div>
                  <strong>{user?.fullName || "Chưa có tên"}</strong> {user?.phone || "Chưa có SĐT"}
                </div>
                <div>
                  {selectedAddress.street}, {selectedAddress.ward}, {selectedAddress.district}, {selectedAddress.province}
                </div>
              </>
            ) : (
              <div>Chưa có địa chỉ</div>
            )}
          </div>
          <button onClick={handleAddressChange}>Thay đổi</button>
        </div>
      </div>

      {/* Sản phẩm */}
      <div className="product-payment">
        <div className="product-header">
          <span>Sản Phẩm</span>
          <span>Đơn Giá</span>
          <span>Số Lượng</span>
          <span>Thành tiền</span>
        </div>
        {selectedItems && selectedItems.length > 0 ? (
          selectedItems.map((item, index) => (
            <div key={index} className="product-item">
              <div className="product-info">
                <img src={item.product.coverImage} alt={item.product.name} />
                <span>{item.product.name}</span>
              </div>
              <span>{formatCurrency(item.product.price)}</span>
              <span>{item.quantity}</span>
              <span>{formatCurrency(item.product.price * item.quantity)}</span>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            <p>Không có sản phẩm nào được chọn</p>
            <button
              onClick={() => navigate("/cart")}
              style={{
                background: "#ec407a",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              Quay lại giỏ hàng
            </button>
          </div>
        )}
      </div>

      {/* Voucher */}
      <div className="voucher-payment">
        <div className="voucher-header">
          <span>Voucher của bạn</span>
          <button onClick={() => setShowVoucherModal(true)}>Chọn voucher</button>
        </div>
        <div className="list-voucher">
          {selectedVoucher ? (
            <div>
              <strong>{selectedVoucher.name}</strong> - Giảm {formatCurrency(selectedVoucher.discount)}
            </div>
          ) : (
            "Chưa chọn voucher"
          )}
        </div>
      </div>

      {/* Phương thức thanh toán */}
      <div className="pt-payment">
        <span>Phương thức thanh toán</span>
        <div className="pt-option">
          <input
            type="radio"
            name="payment"
            id="cod"
            checked={selectedPaymentMethod === "cod"}
            onChange={() => handlePaymentMethodChange("cod")}
          />
          <label htmlFor="cod">Thanh toán khi nhận hàng</label>
          <br />
          <input
            type="radio"
            name="payment"
            id="momo"
            checked={selectedPaymentMethod === "momo"}
            onChange={() => handlePaymentMethodChange("momo")}
          />
          <label htmlFor="momo">Chuyển khoản Momo</label>
          <br />
          <input
            type="radio"
            name="payment"
            id="vnpay"
            checked={selectedPaymentMethod === "vnpay"}
            onChange={() => handlePaymentMethodChange("vnpay")}
          />
          <label htmlFor="vnpay">Chuyển khoản Ví VNPay</label>
        </div>
      </div>

      {/* Tổng kết */}
      <div className="conclusion">
        <div>Tổng tiền hàng: <span>{formatCurrency(subtotal)}</span></div>
        <div>Tiền phí vận chuyển: <span>{formatCurrency(shippingFee)}</span></div>
        <div>Tổng voucher: <span> {formatCurrency(voucherDiscount)}</span></div>
        <div className="total">Tổng thanh toán: {formatCurrency(total)}</div>
      </div>

      {/* Button đặt hàng */}
      <div className="buy-payment">
        <button
          onClick={handlePlaceOrder}
          disabled={loading || !selectedAddress || !selectedPaymentMethod || !selectedItems || selectedItems.length === 0}
        >
          {loading ? "Đang xử lý..." : "Đặt Hàng"}
        </button>
        {(!selectedItems || selectedItems.length === 0) && (
          <p style={{ color: "#666", fontSize: "12px", marginTop: "8px", textAlign: "center" }}>
            Vui lòng chọn sản phẩm trong giỏ hàng trước khi đặt hàng
          </p>
        )}
      </div>

      {/* Modal chọn voucher */}
      {showVoucherModal && (
        <div className="voucher-modal">
          <div className="modal-content">
            <h3>Chọn Voucher</h3>
            <div className="voucher-list">
              {vouchers.map((voucher, index) => (
                <div
                  key={index}
                  className="voucher-item"
                  onClick={() => handleVoucherSelect(voucher)}
                >
                  <strong>{voucher.name}</strong>
                  <span>Giảm {formatCurrency(voucher.discount)}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setShowVoucherModal(false)}>Đóng</button>
          </div>
        </div>
      )}

      {/* Modal chọn địa chỉ */}
      <ModalChangeAddress
        visible={showAddressModal}
        onClose={() => setShowAddressModal(false)}
      />

      {/* Hiển thị lỗi */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}

export default PayMent;

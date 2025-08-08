import { Spin, Alert, Empty } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VoucherCard from "./voucher.card";
import { fetchVouchers, applyVoucher } from "../../reduxs/voucher.thunk";
import "./style.scss";

function Voucher() {
  const dispatch = useDispatch();
  const { vouchers, loading, error, appliedVouchers } = useSelector((state) => state.voucher);

  useEffect(() => {
    dispatch(fetchVouchers());
  }, [dispatch]);

  const handleApplyVoucher = async (voucher) => {
    try {
      await dispatch(applyVoucher({
        voucherId: voucher._id,
        orderData: { orderValue: 1000000 } // Mock order data
      })).unwrap();

      // Show success message
      console.log("Áp dụng voucher thành công:", voucher.code);
    } catch (error) {
      console.error("Lỗi khi áp dụng voucher:", error.message);
    }
  };

  const renderVoucherContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <Spin size="large" />
          <p className="loading-text">Đang tải voucher...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <Alert
            message="Lỗi"
            description={error}
            type="error"
            showIcon
          />
        </div>
      );
    }

    if (!vouchers || vouchers.length === 0) {
      return (
        <div className="empty-container">
          <Empty
            description="Không có voucher nào khả dụng"
          />
        </div>
      );
    }

    return (
      <div className="voucher-list">
        {vouchers.map((voucher) => (
          <VoucherCard
            key={voucher._id}
            voucher={voucher}
            onApply={handleApplyVoucher}
            isApplied={appliedVouchers.some(v => v._id === voucher._id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="voucher-page">
      <div className="voucher-container">
        <div className="header_voucher">
          <h1>Voucher</h1>
          <p>Chọn voucher phù hợp với bạn</p>
        </div>

        {renderVoucherContent()}
      </div>
    </div>
  );
}

export default Voucher;

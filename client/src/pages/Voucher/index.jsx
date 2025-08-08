import { Spin, Alert, Empty } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VoucherCard from "./voucher.card";
import { fetchVouchers, applyVoucher } from "../../reduxs/voucher.thunk";
import "./style.scss";
import VoucherCard2 from "./voucher.card2";

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
        orderData: { orderValue: 1000000 }
      })).unwrap();

      // Show success message
      console.log("Áp dụng voucher thành công:", voucher.code);
    } catch (error) {
      console.error("Lỗi khi áp dụng voucher:", error.message);
    }
  };

  // Phân loại voucher
  const categorizeVouchers = () => {
    if (!vouchers || vouchers.length === 0) return { freeship: [], others: [] };

    return vouchers.reduce((acc, voucher) => {
      // Kiểm tra voucher có phải freeship không
      const isFreeship =
        // Kiểm tra theo _id
        voucher._id && voucher._id.includes('freeship') ||
        // Kiểm tra theo code
        voucher.code && voucher.code.toLowerCase().includes('freeship') ||
        // Kiểm tra theo description
        voucher.description && voucher.description.toLowerCase().includes('phí vận chuyển');

      if (isFreeship) {
        acc.freeship.push(voucher);
      } else {
        acc.others.push(voucher);
      }
      return acc;
    }, { freeship: [], others: [] });
  };

  const { freeship, others } = categorizeVouchers();

  const renderVoucherSection = (title, vouchers, CardComponent) => {
    if (!vouchers || vouchers.length === 0) return null;

    return (
      <div style={sectionStyles.container}>
        <h2 style={sectionStyles.title}>{title}</h2>
        <div style={sectionStyles.grid}>
          {vouchers.map((voucher, index) => (
            <CardComponent
              key={voucher._id || `voucher-${index}`}
              voucher={voucher}
              onApply={handleApplyVoucher}
              isApplied={appliedVouchers.some(v => v._id === voucher._id)}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderVoucherContent = () => {

    if (loading) {
      return (
        <div style={loadingStyles.container}>
          <Spin size="large" />
          <p style={loadingStyles.text}>Đang tải voucher...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div style={errorStyles.container}>
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
        <div style={emptyStyles.container}>
          <Empty
            description="Không có voucher nào khả dụng"
          />
        </div>
      );
    }

    return (
      <div style={contentStyles.container}>
        {/* Voucher Freeship */}
        {renderVoucherSection("🚚 Voucher Freeship", freeship, VoucherCard)}

        {/* Voucher Khác */}
        {renderVoucherSection("🎁 Voucher Khuyến Mãi", others, VoucherCard2)}
      </div>
    );
  };

  return (
    <div className="voucher-page">
      <div className="voucher-container">
        <div style={headerStyles.container}>
          <div style={headerStyles.content}>
            <div style={headerStyles.iconWrapper}>
              <span style={headerStyles.icon}>🎫</span>
            </div>
            <div style={headerStyles.textContent}>
              <h1 style={headerStyles.title}>Voucher & Khuyến Mãi</h1>
              <p style={headerStyles.subtitle}>Chọn voucher phù hợp và tiết kiệm chi phí mua sắm</p>
            </div>
            <div style={headerStyles.stats}>
              <div style={headerStyles.statItem}>
                <span style={headerStyles.statNumber}>{freeship.length}</span>
                <span style={headerStyles.statLabel}>Freeship</span>
              </div>
              <div style={headerStyles.statItem}>
                <span style={headerStyles.statNumber}>{others.length}</span>
                <span style={headerStyles.statLabel}>Khuyến mãi</span>
              </div>
              <div style={headerStyles.statItem}>
                <span style={headerStyles.statNumber}>{appliedVouchers.length}</span>
                <span style={headerStyles.statLabel}>Đã lưu</span>
              </div>
            </div>
          </div>
          <div style={headerStyles.decoration}>
            <div style={headerStyles.circle1}></div>
            <div style={headerStyles.circle2}></div>
            <div style={headerStyles.circle3}></div>
          </div>
        </div>

        {renderVoucherContent()}
      </div>
    </div>
  );
}

const contentStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  }
};

const sectionStyles = {
  container: {
    marginBottom: '32px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    margin: '0 0 20px 0',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
    gap: '20px',
    justifyContent: 'center'
  }
};

const loadingStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center'
  },
  text: {
    marginTop: '16px',
    fontSize: '16px',
    color: '#666'
  }
};

const errorStyles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto'
  }
};

const emptyStyles = {
  container: {
    padding: '60px 20px',
    textAlign: 'center'
  }
};

const headerStyles = {
  container: {
    position: 'relative',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    padding: '32px 24px',
    marginBottom: '32px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2)',
    color: '#fff'
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 2
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '80px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    marginRight: '24px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },
  icon: {
    fontSize: '36px',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
  },
  textContent: {
    flex: 1
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 8px 0',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '16px',
    margin: '0',
    opacity: '0.9',
    fontWeight: '400',
    lineHeight: '1.5'
  },
  stats: {
    display: 'flex',
    gap: '24px',
    marginLeft: '24px'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '4px',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  statLabel: {
    fontSize: '12px',
    opacity: '0.8',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  decoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    pointerEvents: 'none'
  },
  circle1: {
    position: 'absolute',
    top: '-20px',
    right: '-20px',
    width: '120px',
    height: '120px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    animation: 'float 6s ease-in-out infinite'
  },
  circle2: {
    position: 'absolute',
    bottom: '-30px',
    left: '10%',
    width: '80px',
    height: '80px',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '50%',
    animation: 'float 8s ease-in-out infinite reverse'
  },
  circle3: {
    position: 'absolute',
    top: '50%',
    right: '15%',
    width: '60px',
    height: '60px',
    background: 'rgba(255, 255, 255, 0.06)',
    borderRadius: '50%',
    animation: 'float 10s ease-in-out infinite'
  }
};

// Thêm CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;
document.head.appendChild(style);

export default Voucher;

import { useAlert } from "../../../components/alert";

function VoucherUser() {
  const { showSuccess } = useAlert();
  
  const handleTest = () => {
    console.log('Button clicked!'); // Kiểm tra button có click không
    showSuccess('Test Thành công!');
  };

  return (
    <>
      <div className="container-voucheruser">
        <div className="header-voucheruser" style={{ borderBottom: "1px solid #e0e0e0" }}>
          <h2>Voucher của tôi</h2>
        </div>
        <div className="content-voucheruser">
          <p>Danh sách voucher sẽ được hiển thị tại đây.</p>
          <button onClick={handleTest}>Test Alert</button>
        </div>
      </div>
    </>
  );
}

export default VoucherUser;
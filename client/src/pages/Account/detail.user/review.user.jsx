function ReviewUser() {
  return (
    <>
      <div className="container-reviewUser">
        <div
          className="header-reviewUser"
          style={{
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <h2>Các đánh giá sản phẩm</h2>
        </div>
        <div className="content-reviewUser">
          <p>Các thông báo về phần về đánh giá sản phẩm sẽ ở đây</p>
          {/* Bạn có thể thêm các thành phần khác như form, bảng, v.v. */}
        </div>
      </div>
    </>
  );
}
export default ReviewUser;

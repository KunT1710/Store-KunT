import img_store from '../../assets/img/Store.png'

function RightBanner1() {
  return (
    <>
      <img src={img_store} alt="Right Banner" onClick={() => window.open("/gioi-thieu", "_blank")} style={{
        cursor: 'pointer',
        width: '80%',
        height: 'auto',
        padding: '0',
        borderRadius: '12px',
      }} title='Giới thiệu cửa hàng'/>
    </>
  );
}
export default RightBanner1;
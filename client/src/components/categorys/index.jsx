import { Row, Col } from "antd";
import './style.scss';

const categories = [
  { title: "Đặc sản", img: "https://res.cloudinary.com/kunt/image/upload/v1750236472/specialty_kgi1za.svg" },
  { title: "Ưu đãi thành viên", img: "https://res.cloudinary.com/kunt/image/upload/v1750236473/diamond_egpn2d.svg" },
  { title: "Hàng nhập khẩu", img: "https://res.cloudinary.com/kunt/image/upload/v1750252156/Blue_Minimalist_Globe_Plane_Logo_Design_jm7yua.png" },
  { title: "SALE", img: "https://res.cloudinary.com/kunt/image/upload/v1750236474/flashsale_smavwh.svg" },
  { title: "Đơn hàng từ 500k", img: "https://res.cloudinary.com/kunt/image/upload/v1750252112/Purple_Simple_Free_Delivery_Post_Template_ztatul.png" },
  { title: "Dịch vụ & Tiện ích", img: "https://res.cloudinary.com/kunt/image/upload/v1750252122/Pastel_Green_and_Pink_Feminine_Flat_Illustrative_Phone_Line_Drawing_Social_Media_Marketing_Service_Logo_eomszw.png" },
  { title: "Đối tác", img: "https://res.cloudinary.com/kunt/image/upload/v1750252156/24Sep24_Simon_Pro_Upload_iw4qfp.png" },
  { title: "Chuyên sỉ & lẻ", img: "https://res.cloudinary.com/kunt/image/upload/v1750251924/Peach_and_Brown_Cute_Illustrated_Baby_Kids_Retail_Shop_Logo_x5gpjj.png" },
];


function Category() {
  const handleClick = (item) => {
    return console.log("Click ", item.title);
  }
  return (
    <>
      <Row gutter={[16, 16]} justify="center" className="category">
        {/* Bên trái trống */}
        <Col xs={0} md={2} lg={3}></Col>

        <Col xs={24} md={20} lg={18}>
          <Row gutter={[16, 16]} justify="center">
            {categories.map((item, idx) => (
              <Col xs={6} sm={6} md={3} lg={3} key={idx}>
                <div className="category-item"
                  onClick={
                    () => handleClick(item)
                  }>
                  <img src={item.img} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Bên phải trống */}
        <Col xs={0} md={2} lg={3}></Col>
      </Row>
    </>
  );
}

export default Category;
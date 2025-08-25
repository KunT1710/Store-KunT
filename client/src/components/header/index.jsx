import { Row, Col, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./style.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChooseAuthModal from "./header.chooseAuth.modal";
import CategoryDropdown from "./header.menu";
import Logo1 from "../../assets/img/Logo1.svg";
import { useSelector } from "react-redux";

const handleChange_sreach = (e) => {
  console.log(e.target.value);
};

function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    setIsAuthModalOpen(false);
  };

  const { isAuthenticated, user } = useSelector(state => state.auth);

  const handleRegister = () => {
    navigate("/register");
    setIsAuthModalOpen(false);
  };
  const handleUserClick = () =>{
    if(!isAuthenticated){
      setIsAuthModalOpen(true);
    }else{
      navigate("/info-user");
    }
  }
  const handleClick = (target) => {
    return () => {
      switch (target) {
        case "store":
          navigate("/");
          break;
        case "food":
          navigate("/category/thuc-pham");
          break;
        case "utensil":
          navigate("/category/o-dung-gia-inh");
          break;
        case "beverage":
          navigate("/category/nuoc-ngot-nuoc-giai-khat");
          break;
        case "spice":
          navigate("/category/dau-an-nuoc-cham-gia-vi");
          break;
        case "pastFood":
          navigate("/category/o-an-nhanh");
          break;
        case "other":
          navigate("/category/cham-soc-ca-nhan");
          break;
        case "btnSearch":
          console.log("Search button clicked");
          break;
        case "cart":
          navigate("/cart");
          // console.log("Navigate to cart");
          break;
        default:
          console.log("Unknown target clicked");
          break;
      }
    };
  };

  return (
    <>
      <div className="header">
        <Row gutter={8} justify="space-between" align="middle">
          <Col span={4} className="logo-name" onClick={handleClick("store")}>
            <img src={Logo1} alt="logo" className="logo" />
            <div className="store-title-group">
              <p className="nameStore">Cửa hàng</p>
              <p className="nameStore nameStore--kunt">KunT</p>
            </div>
          </Col>

          <Col span={16} className="category-search">
            <Row gutter={16} className="category-row">
              <Col span={4} className="category">
                <CategoryDropdown
                  categories={[
                    { id: "bia-nuoc-uong-co-con", name: "Bia, Nước uống có cồn" },
                    { id: "mi-mien-chao-pho", name: "Mì, Miến, Cháo Phở" },
                    { id: "banh-keo-cac-loai", name: "Bánh kẹo các loại" },
                    { id: "sua-tuoi-sua-ca-cao", name: "Sữa tươi, sữa ca cao" },
                    { id: "kem-sua-chua", name: "Kem, sữa chua" },
                    { id: "gao-o-kho", name: "Gạo, đồ khô" },
                  ]}
                  onSelectCategory={(id) => {
                    navigate(`/category/${id}`);
                  }}
                />

                <p className="name-tp" onClick={handleClick("food")}>
                  Thực phẩm
                </p>
              </Col>
              <Col span={4} className="category">
                <p onClick={handleClick("utensil")}>Đồ dùng</p>
              </Col>
              <Col span={4} className="category">
                <p onClick={handleClick("beverage")}>Đồ uống</p>
              </Col>
              <Col span={4} className="category">
                <p onClick={handleClick("spice")}>Gia vị & Chế biến</p>
              </Col>
              <Col span={4} className="category">
                <p onClick={handleClick("pastFood")}>Đồ ăn nhanh</p>
              </Col>
              <Col span={4} className="category">
                <p onClick={handleClick("other")}>Chăm sóc cá nhân</p>
              </Col>
            </Row>

            <div className="search-line">
              <Input
                allowClear
                placeholder="Tìm kiếm sản phẩm..."
                className="input-search"
                onChange={handleChange_sreach}
              ></Input>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                iconPosition="end"
                className="btn-search"
                onClick={handleClick("btnSearch")}
              >
                Tìm kiếm
              </Button>
            </div>
          </Col>

          <Col
            span={2}
            className="user"
            onClick={handleUserClick}
          >
            <i className="iconfont icon-user"></i>
            <span className="user-name">
              {isAuthenticated && user
                ? user.fullName || user.username || user.email 
                : 'Tài khoản'}
            </span>
          </Col>

          <ChooseAuthModal
            open={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onLogin={handleLogin}
            onRegister={handleRegister}
          />

          <Col span={2} className="cart" onClick={handleClick("cart")}>
            <i className="iconfont icon-cart"></i>
            <span className="cart-name">Giỏ hàng</span>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Header;

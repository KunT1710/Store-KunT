import "./left.footer.scss";
import { useNavigate } from "react-router-dom";

function LeftFooter(props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">

        <div className="store" onClick={() => navigate("/")}>
          <img src={props.logo} alt="logo" className="logo" />
          <span className="store-name">{props.nameStore}</span>
        </div>

        <div className="info-store">
          <i className="iconfont icon-home"></i>
          <div className="info-texts">
            <span>Chuỗi Tạp Hóa KunT</span>
            <span className="address">
              Địa chỉ: KTX Khu B, Dĩ An - Bình Dương
            </span>
          </div>
        </div>

        <div className="contact-row">
          <i className="iconfont icon-call"></i>
          <span className="phone">SĐT: 0357896084</span>
          <span className="divider">|</span>
          <i className="iconfont icon-mail"></i>
          <span className="email">Email: kunt.hcmus@gmail.com</span>
        </div>
        <div className="work-row">
          <i className="iconfont icon-a-workhours"></i>
          <span className="worktime">Làm việc từ: 8:00 - 22:00 (T2 - CN)</span>
        </div>
      </div>
    </>
  );
}
export default LeftFooter;

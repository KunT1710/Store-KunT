import Banner2Presentation from "./banner2.presentation";
import "./style.scss";
function Banner2Container({ bannerUrl }) {
  
  const handleClick = () => {
    console.log("Click banner2");
    // Sau này có thể thêm logic khác ở đây
  };

  return (
    <Banner2Presentation bannerUrl={bannerUrl} onClick={handleClick} />
  );
}

export default Banner2Container;

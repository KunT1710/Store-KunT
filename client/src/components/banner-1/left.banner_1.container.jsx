import React from "react";
import { useFetch } from "../../hooks/useFetch.hooks";
import LeftBanner1Presentation from "./left.banner_1.presentation";
import "./left.banner_1.scss";

function LeftBanner1Container() {
  const {
    data: banners,
    loading,
    err,
  } = useFetch("http://localhost:5000/api/banners/main");

  // console.log("Container banners:", banners);

  const handleClick = (banner) => {
    console.log(`Click banner: ${banner.name}`);
  };

  if (err) {
    console.error("Lỗi khi fetch banner:", err);
    return <div>Lỗi khi tải banner</div>;
  }

  if (loading) return <div>Đang tải...</div>;

  return (
    <LeftBanner1Presentation banners={banners} onBannerClick={handleClick} />
  );
}

export default LeftBanner1Container;

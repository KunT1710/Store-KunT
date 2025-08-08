import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function LeftBanner1Presentation({ banners, onBannerClick }) {

  // console.log("Presentation banners:", banners); 

  if (!Array.isArray(banners) || banners.length === 0) {
    return <div>Không có banner nào</div>;
  }

  return (
    <div className="left-banner1">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={banners.length > 1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <img
              className="left-banner1__img"
              src={banner.image}
              alt={banner.name}
              onClick={() => onBannerClick(banner)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default LeftBanner1Presentation;

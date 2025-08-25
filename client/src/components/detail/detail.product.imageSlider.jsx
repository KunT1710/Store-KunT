import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductImageSlider({ images }) {
  // dùng để quản lý hai slider: một cho ảnh chính và một cho thumbnail
  // nav1 là slider chính, nav2 là slider thumbnail
  // được liên kết với nhau thông qua props `asNavFor`
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const mainSettings = {
    asNavFor: nav2,
    ref: (slider) => setNav1(slider),
    arrows: false,
  };

  const thumbSettings = {
    asNavFor: nav1,
    ref: (slider) => setNav2(slider),
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
  };
  return (
    <>
      <div style={{ width: "100%",height: "auto", margin: "0 auto", position: "relative" }}>
        {/* Ảnh chính */}
        <Slider {...mainSettings}>
          {images.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Ảnh ${index + 1}`}
                style={{ width: "100%", display: "block" }}
              />
            </div>
          ))}
        </Slider>

        {/* Thumbnail nằm trong ảnh chính */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            background: "rgba(255,255,255,0.6)",
            padding: "5px",
            borderRadius: "8px",
            border: "1px solid #2C313C",
          }}
        >
          {/* Slider cho thumbnail */}
          <Slider {...thumbSettings}>
            {images.map((src, index) => (
              <div key={index} style={{ padding: "1px" }}>
                <img
                  src={src}
                  alt={`Thumb ${index + 1}`}
                  style={{
                    width: "100%",
                    opacity: 0.8,
                    borderLeft: "1px solid #2C313C",
                    borderRight: "1px solid #2C313C",
                    cursor: "pointer",
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default ProductImageSlider;

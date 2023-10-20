import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import galleryImg from "../images/gallery-img.png";

const Gallery = () => {
  const sliderRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <div className="gallery">
      <div className="gallery__top">
        <h4 className="gallery__subtitle">Галерея</h4>
        <div className="gallery__navigation">
          <button
            className="gallery__btn nav-btn nav-btn_prev"
            onClick={handlePrev}
          ></button>
          <button
            className="gallery__btn nav-btn nav-btn_next"
            onClick={handleNext}
          ></button>
        </div>
      </div>
      <Swiper
        ref={sliderRef}
        slidesPerView={"auto"}
        spaceBetween={16}
        grabCursor={true}
        className="gallery__swiper"
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
      >
        <SwiperSlide className="gallery__slide">
          <img src={galleryImg} alt="Фото события" className="gallery__img" />
        </SwiperSlide>
        <SwiperSlide className="gallery__slide">
          <img src={galleryImg} alt="Фото события" className="gallery__img" />
        </SwiperSlide>
        <SwiperSlide className="gallery__slide">
          <img src={galleryImg} alt="Фото события" className="gallery__img" />
        </SwiperSlide>
        <SwiperSlide className="gallery__slide">
          <img src={galleryImg} alt="Фото события" className="gallery__img" />
        </SwiperSlide>
        <SwiperSlide className="gallery__slide">
          <img src={galleryImg} alt="Фото события" className="gallery__img" />
        </SwiperSlide>
        <SwiperSlide className="gallery__slide">
          <img src={galleryImg} alt="Фото события" className="gallery__img" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Gallery;

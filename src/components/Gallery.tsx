import React, { FC, useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { TEventPhotos } from "../utils/types";
import { BASE_URL } from "../utils/contstants";

type TGallery = {
  photos?: TEventPhotos[];
};

const Gallery: FC<TGallery> = ({ photos }) => {
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
        {photos && photos.length > 0 ? (
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
        ) : null}
      </div>
      {photos && photos.length > 0 ? (
        <Swiper
          ref={sliderRef}
          slidesPerView={"auto"}
          spaceBetween={16}
          grabCursor={true}
          className="gallery__swiper"
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
        >
          {photos
            ? photos.map((item) => (
                <SwiperSlide className="gallery__slide" key={item.id}>
                  <img
                    src={`${BASE_URL.slice(0, -4)}${item.url}`}
                    alt="Фото события"
                    className="gallery__img"
                  />
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      ) : (
        <p className="gallery__empty">У события нет фотографий</p>
      )}
    </div>
  );
};

export default Gallery;

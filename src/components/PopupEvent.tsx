import React, { FC, useCallback, useRef } from "react";
import Popup from "./Popup";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Participant from "./Participant";
import moment from "moment";
import { weekdays } from "../utils/contstants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import participantImg from "../images/user-avatar-default.png";
import galleryImg from "../images/gallery-img.png";

const PopupEvent: FC = () => {
  const event = useSelector((state: RootState) => state.event);
  const isEventPopupOpened = useSelector(
    (state: RootState) => state.popups.isEventPopupOpened
  );

  const date = moment(event.dateStart);
  const day = date.date();
  const dayOfWeek = date.weekday();
  const hour = date.hour();
  const minutes = date.minutes();

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
    <Popup isOpened={isEventPopupOpened} isLarge={true}>
      <h3 className="popup__title">{event.title}</h3>
      <div className="event">
        <div className="event__box">
          <div className="event__date">
            <p className="event__txt-bold">{weekdays[dayOfWeek]}</p>
            <p className="event__txt-bold">{day} октября</p>
            <p className="event__txt-bold">
              {hour < 10 ? "0" + hour : hour}:
              {minutes < 10 ? "0" + minutes : minutes}
            </p>
          </div>
          <p className="event__address">{event.location}</p>
        </div>
        <p className="event__description">{event.description}</p>
      </div>
      <div className="participants">
        <h4 className="participants__subtitle">Участники</h4>
        <div className="participants__content">
          <ul className="participants__list">
            {event.participants?.map((user) => (
              <Participant
                key={user.id}
                name={user.username}
                img={participantImg}
                isOrganizer={true}
              />
            ))}
          </ul>
        </div>
      </div>
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
          modules={[Navigation]}
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
        </Swiper>
      </div>
    </Popup>
  );
};

export default PopupEvent;

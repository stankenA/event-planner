import React from "react";
import Popup from "./Popup";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import participantImg from "../images/participant-img.png";

const PopupEvent = () => {
  const isEventPopupOpened = useSelector(
    (state: RootState) => state.popups.isEventPopupOpened
  );

  return (
    <Popup isOpened={isEventPopupOpened} isLarge={true}>
      <h3 className="popup__title">Фестиваль «Будущее»</h3>
      <div className="event">
        <div className="event__box">
          <div className="event__date">
            <p className="event__txt-bold">пятница</p>
            <p className="event__txt-bold">21 сентября</p>
            <p className="event__txt-bold">12:00</p>
          </div>
          <p className="event__address">
            г. Москва, Ленинградский проспект, 80
          </p>
        </div>
        <p className="event__description">
          Это независимый музыкальный фестиваль талантливых артистов, которые
          уже собирают крупнейшие залы поклонников по всей России или только
          начинают свой творческий путь. Главное, что объединяет участников
          фестиваля — эмоции, которые они передают слушателям, погружая их в
          особенную атмосферу своего выступления.
        </p>
      </div>
      <div className="participants">
        <h4 className="participants__subtitle">Участники</h4>
        <div className="participants__content">
          <ul className="participants__list">
            <li className="participants__item">
              <img
                src={participantImg}
                alt="Фото участника"
                className="participants__img"
              />
              <div className="participants__container">
                <p className="participants__txt">Илья</p>
                <span className="participants__organizer">Организатор</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Popup>
  );
};

export default PopupEvent;

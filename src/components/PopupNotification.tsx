import React, { FC } from "react";
import Popup from "./Popup";
import Button from "./ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { closeAllPopups } from "../redux/popups/slice";
import { RootState } from "../redux/store";
import handImg from "../images/hand-img.png";

const PopupNotification: FC = () => {
  const dispatch = useDispatch();
  const isNotificationPopupOpened = useSelector(
    (state: RootState) => state.popups.isNotificationPopupOpened
  );

  function handleAwesomeClick() {
    dispatch(closeAllPopups());
  }
  return (
    <Popup isOpened={isNotificationPopupOpened} isMedium={true}>
      <h3 className="popup__notification-title">Поздравляем!</h3>
      <div className="popup__notification-container">
        <p className="popup__notification-txt">Вы теперь участник события:</p>
        <p className="popup__notification-txt popup__notification-txt_red">
          Фестиваль «Будущее»
        </p>
      </div>
      <div className="popup__notification-info">
        <div className="popup__notification-info-top">
          <p className="popup__notification-txt">пятница</p>
          <span className="popup__separator"></span>
          <p className="popup__notification-txt">21 сентября</p>
          <span className="popup__separator"></span>
          <p className="popup__notification-txt">12:00</p>
        </div>
        <p className="popup__notification-address">
          г. Москва, Ленинградский проспект, 80
        </p>
      </div>
      <Button type="button" handleClick={handleAwesomeClick}>
        Отлично
      </Button>
      <img src={handImg} alt="Рука" className="popup__img" />
    </Popup>
  );
};

export default PopupNotification;

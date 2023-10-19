import React, { FC } from "react";
import Button from "./ui/Button";
import handImg from "../images/hand-img.png";
import moment from "moment";
import { eventMonths, weekdays } from "../utils/contstants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { closeAllPopups } from "../redux/popups/slice";

const NotificationSuccess: FC = () => {
  const dispatch = useDispatch();
  const event = useSelector((state: RootState) => state.event);

  function handleBtnClick() {
    dispatch(closeAllPopups());
  }

  // TODO: есть ли смысл создавать отдельное состояние чтобы тащить уже высчитанную
  // в попапе ивента инфорацию ниже, или просто оставить дублирование
  const date = moment(event.dateStart);
  const day = date.date();
  const dayOfWeek = weekdays[date.weekday()];
  const month = eventMonths[date.month()];
  const hour = date.hour();
  const minutes = date.minutes();

  return (
    <>
      <h2 className="notification__title">Поздравляем!</h2>
      <div className="notification__container">
        <p className="notification__txt">Вы теперь участник события:</p>
        <p className="notification__txt notification__txt_red">{event.title}</p>
      </div>
      <div className="notification__info">
        <div className="notification__info-top">
          <p className="notification__txt">{dayOfWeek}</p>
          <span className="notification__separator"></span>
          <p className="notification__txt">
            {day} {month}
          </p>
          <span className="notification__separator"></span>
          <p className="notification__txt">
            {hour < 10 ? "0" + hour : hour}:
            {minutes < 10 ? "0" + minutes : minutes}
          </p>
        </div>
        <p className="notification__address">{event.location}</p>
      </div>
      <Button
        type="button"
        handleClick={handleBtnClick}
        className="notification__btn"
      >
        Отлично
      </Button>
      <img src={handImg} alt="Рука" className="notification__img" />
    </>
  );
};

export default NotificationSuccess;

import React, { FC } from "react";
import Button from "./ui/Button";
import handImg from "../images/hand-img.png";
import moment from "moment";
import { eventMonths, weekdays } from "../utils/contstants";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type TSuccessProps = {
  handleBtnClick: () => void;
};

const PopupNotificationSuccess: FC<TSuccessProps> = ({ handleBtnClick }) => {
  const event = useSelector((state: RootState) => state.event);

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
      <h3 className="popup__notification-title">Поздравляем!</h3>
      <div className="popup__notification-container">
        <p className="popup__notification-txt">Вы теперь участник события:</p>
        <p className="popup__notification-txt popup__notification-txt_red">
          {event.title}
        </p>
      </div>
      <div className="popup__notification-info">
        <div className="popup__notification-info-top">
          <p className="popup__notification-txt">{dayOfWeek}</p>
          <span className="popup__separator"></span>
          <p className="popup__notification-txt">
            {day} {month}
          </p>
          <span className="popup__separator"></span>
          <p className="popup__notification-txt">
            {hour < 10 ? "0" + hour : hour}:
            {minutes < 10 ? "0" + minutes : minutes}
          </p>
        </div>
        <p className="popup__notification-address">{event.location}</p>
      </div>
      <Button type="button" handleClick={handleBtnClick}>
        Отлично
      </Button>
      <img src={handImg} alt="Рука" className="popup__img" />
    </>
  );
};

export default PopupNotificationSuccess;

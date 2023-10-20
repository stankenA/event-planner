import React, { FC } from "react";
import Button from "./ui/Button";
import handImg from "../images/hand-img.png";
import unicornImg from "../images/unicorn-img.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { closeAllPopups } from "../redux/popups/slice";

const NotificationSuccess: FC = () => {
  const dispatch = useDispatch();
  const notification = useSelector(
    (state: RootState) => state.notification.message
  );

  function handleBtnClick() {
    dispatch(closeAllPopups());
  }

  return (
    <>
      <h2 className="notification__title">{notification.heading}</h2>
      <div className="notification__container">
        <p className="notification__txt">{notification.case}</p>
        <p className="notification__txt notification__txt_red">
          {notification.title}
        </p>
      </div>
      <div className="notification__info">
        <div className="notification__info-top">
          <p className="notification__txt">{notification.dayOfWeek}</p>
          <span className="notification__separator"></span>
          <p className="notification__txt">
            {notification.day} {notification.month}
          </p>
          <span className="notification__separator"></span>
          <p className="notification__txt">{notification.time}</p>
        </div>
        <p className="notification__address">{notification.location}</p>
      </div>
      <Button
        type="button"
        handleClick={handleBtnClick}
        className="notification__btn"
      >
        Отлично
      </Button>
      <img
        src={notification.isUnicorn ? unicornImg : handImg}
        alt={`${notification.isUnicorn ? "Единорог" : "Рука"}`}
        className={`notification__img ${
          notification.isUnicorn ? "notification__img_unicorn" : ""
        }`}
      />
    </>
  );
};

export default NotificationSuccess;

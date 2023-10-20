import React, { FC } from "react";
import Button from "./ui/Button";
import pigeonImg from "../images/pigeon-img.png";
import { useDispatch } from "react-redux";
import { closeAllPopups } from "../redux/popups/slice";
const NotificationFailed: FC = () => {
  const dispatch = useDispatch();

  function handleBtnClick() {
    dispatch(closeAllPopups());
  }

  return (
    <>
      <h2 className="notification__title">Что-то пошло не так</h2>
      <div className="notification__container">
        <p className="notification__txt notification__txt_red">
          Попробуйте позже
        </p>
      </div>

      <Button
        type="button"
        handleClick={handleBtnClick}
        className="notification__btn"
      >
        Хорошо
      </Button>
      <img
        src={pigeonImg}
        alt="Рука"
        className="notification__img notification__img_pigeon"
      />
    </>
  );
};

export default NotificationFailed;

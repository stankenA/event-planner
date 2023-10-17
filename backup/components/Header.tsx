import React, { FC } from "react";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import { months } from "../utils/contstants";

import userAvatar from "../images/user-avatar-default.png";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthPopupOpened } from "../redux/authPopup/slice";
import { RootState } from "../redux/store";
import { THeaderProps } from "../utils/types";
import {
  decreaseMonthOverlap,
  increaseMonthOverlap,
} from "../redux/dates/slice";

const Header: FC<THeaderProps> = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const month = useSelector((state: RootState) => state.dates.month);
  const year = useSelector((state: RootState) => state.dates.year);

  function openAuthPopup() {
    dispatch(setIsAuthPopupOpened(true));
  }

  function clickPrevMonth() {
    dispatch(decreaseMonthOverlap());
  }

  function clickNextMonth() {
    dispatch(increaseMonthOverlap());
  }

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__left">
          <a
            href="https://redcollar.ru/"
            target="_blank"
            rel="noreferrer"
            className="header__logo-link"
          >
            <Logo />
            red collar
          </a>
          <h1 className="header__title">
            planner <span className="header__title-accent">event</span>
          </h1>
        </div>
        <div className="header__right">
          <p className="header__date">
            {months[month]}
            {year !== new Date().getFullYear() ? ` ${year}` : ""}
          </p>
          <div className="header__nav">
            <button
              type="button"
              className="header__nav-btn header__nav-btn_prev"
              onClick={clickPrevMonth}
            ></button>
            <button
              type="button"
              className="header__nav-btn header__nav-btn_next"
              onClick={clickNextMonth}
            ></button>
          </div>
          {user.id ? (
            <div className="header__user-info">
              <Button type="button" handleClick={() => console.log("boop")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 1L9 1V9.00001L1.00001 9.00001L1.00001 13L9 13V21L13 21L13 13L21 13L21 9.00001L13 9.00001L13 1Z"
                    fill="white"
                  />
                </svg>
              </Button>
              <div className="header__user-img-container">
                <img
                  src={userAvatar}
                  alt="Аватар пользователя"
                  className="header__user-img"
                />
              </div>
            </div>
          ) : (
            <Button type="button" handleClick={openAuthPopup}>
              Войти
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

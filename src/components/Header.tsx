import React, { FC } from "react";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import { months } from "../utils/contstants";

import userAvatar from "../images/user-avatar-default.png";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthPopupOpened } from "../redux/popups/slice";
import {
  decreaseMonthOverlap,
  increaseMonthOverlap,
} from "../redux/dates/slice";
import { RootState } from "../redux/store";
import { logoutUser } from "../redux/user/slice";

type THeaderProps = {};

const Header: FC<THeaderProps> = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const month = useSelector((state: RootState) => state.dates.month);
  const year = useSelector((state: RootState) => state.dates.year);

  function openAuthPopup() {
    dispatch(setIsAuthPopupOpened(true));
  }

  function onPrevMonth() {
    dispatch(decreaseMonthOverlap());
  }

  function onNextMonth() {
    dispatch(increaseMonthOverlap());
  }

  function handleLogOut() {
    dispatch(logoutUser());
    localStorage.removeItem("jwt");
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
              onClick={onPrevMonth}
            ></button>
            <button
              type="button"
              className="header__nav-btn header__nav-btn_next"
              onClick={onNextMonth}
            ></button>
          </div>
          {user.isAuth ? (
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
              <Button type="button" handleClick={handleLogOut}>
                Выйти
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#fff"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.177 7.323a.5.5 0 0 1 .707 0l4.323 4.323a.5.5 0 0 1 0 .708l-4.323 4.323a.5.5 0 0 1-.707 0l-.354-.354a.5.5 0 0 1 0-.707l2.866-2.866H4.5a.5.5 0 0 1-.5-.5v-.5a.5.5 0 0 1 .5-.5h9.19l-2.867-2.866a.5.5 0 0 1 0-.707l.354-.354Z"
                    clipRule="evenodd"
                  />
                  <mask id="a" fill="#fff">
                    <path d="M18 3.5H6a.5.5 0 0 0-.5.5v3.5A.5.5 0 0 1 5 8h-.5a.5.5 0 0 1-.5-.5V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3.5a.5.5 0 0 1 .5-.5H5a.5.5 0 0 1 .5.5V20a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5Z" />
                  </mask>
                  <path
                    d="M6 5h12V2H6v3Zm1-1a1 1 0 0 1-1 1V2a2 2 0 0 0-2 2h3ZM6 19a1 1 0 0 1 1 1H4a2 2 0 0 0 2 2v-3Zm12 0H6v3h12v-3Zm-1 1a1 1 0 0 1 1-1v3a2 2 0 0 0 2-2h-3Zm0-16v16h3V4h-3Zm1 1a1 1 0 0 1-1-1h3a2 2 0 0 0-2-2v3ZM5.5 4a.5.5 0 0 1 .5-.5v-3A3.5 3.5 0 0 0 2.5 4h3ZM6 20.5a.5.5 0 0 1-.5-.5h-3A3.5 3.5 0 0 0 6 23.5v-3Zm12 0H6v3h12v-3Zm.5-.5a.5.5 0 0 1-.5.5v3a3.5 3.5 0 0 0 3.5-3.5h-3Zm0-16v16h3V4h-3Zm-.5-.5a.5.5 0 0 1 .5.5h3A3.5 3.5 0 0 0 18 .5v3Zm-12 0h12v-3H6v3Zm-.5 4V4h-3v3.5h3Zm1.5 0V4H4v3.5h3Zm-2.5 2H5v-3h-.5v3ZM7 20v-3.5H4V20h3Zm-1.5 0v-3.5h-3V20h3ZM5 14.5h-.5v3H5v-3Zm.5 2a1 1 0 0 1-1 1v-3a2 2 0 0 0-2 2h3Zm1.5 0a2 2 0 0 0-2-2v3a1 1 0 0 1-1-1h3Zm-3-9a1 1 0 0 1 1-1v3a2 2 0 0 0 2-2H4Zm-1.5 0a2 2 0 0 0 2 2v-3a1 1 0 0 1 1 1h-3Z"
                    mask="url(#a)"
                  />
                </svg>
              </Button>
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

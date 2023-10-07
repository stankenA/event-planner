import React, { FC } from "react";
import Logo from "./ui/Logo";
import Button from "./ui/Button";

const Header: FC = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__left">
          <a href="#" className="header__logo-link">
            <Logo />
            red collar
          </a>
          <h1 className="header__title">
            planner <span className="header__title-accent">event</span>
          </h1>
        </div>
        <div className="header__right">
          <p className="header__date">Сентябрь</p>
          <div className="header__nav">
            <button
              type="button"
              className="header__nav-btn header__nav-btn_prev"
            ></button>
            <button
              type="button"
              className="header__nav-btn header__nav-btn_next"
            ></button>
          </div>
          <Button txt={"Войти"} handleClick={() => console.log("boop")} />
        </div>
      </div>
    </header>
  );
};

export default Header;

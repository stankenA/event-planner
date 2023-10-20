import React, { FC, PropsWithChildren, useEffect } from "react";
import { TPopupProps } from "../utils/types";

const Popup: FC<TPopupProps> = ({
  children,
  isOpened,
  isLarge,
  isMedium,
  isSmall,
  handleClose,
}) => {
  function closeOnBg(evt: any) {
    if ((evt.target as Element).classList.contains("popup_opened")) {
      handleClose();
    }
  }

  useEffect(() => {
    function closeOnEsc(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        handleClose();
      }
    }

    if (isOpened) {
      document.addEventListener("keydown", closeOnEsc);
    }

    return () => document.removeEventListener("keydown", closeOnEsc);
  }, [isOpened]);

  return (
    <div
      className={`popup 
      ${isOpened ? "popup_opened" : ""}`}
      onMouseDown={closeOnBg}
    >
      <div
        className={`popup__wrapper ${isLarge ? "popup__wrapper_large" : ""} ${
          isMedium ? "popup__wrapper_medium" : ""
        } ${isSmall ? "popup__wrapper_small" : ""}`}
      >
        <button
          type="button"
          className="popup__close"
          onClick={handleClose}
        ></button>
        {children}
      </div>
    </div>
  );
};

export default Popup;

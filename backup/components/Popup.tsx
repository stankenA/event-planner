import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsAuthPopupOpened } from "../redux/authPopup/slice";
import { TPopupProps } from "../utils/types";

const Popup: FC<TPopupProps> = ({ isOpened, children }) => {
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(setIsAuthPopupOpened(false));
  }

  function closeOnBg(evt: any) {
    if ((evt.target as Element).classList.contains("popup_opened")) {
      closeModal();
    }
  }

  useEffect(() => {
    function closeOnEsc(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        closeModal();
      }
    }

    if (isOpened) {
      document.addEventListener("keydown", closeOnEsc);
    }

    return () => document.removeEventListener("keydown", closeOnEsc);
  }, [isOpened]);

  return (
    <div
      className={`popup ${isOpened ? "popup_opened" : ""}`}
      onMouseDown={closeOnBg}
    >
      <div className="popup__wrapper">
        <button
          type="button"
          className="popup__close"
          onClick={closeModal}
        ></button>
        {children}
      </div>
    </div>
  );
};

export default Popup;

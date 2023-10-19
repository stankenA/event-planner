import React, {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { closeAllPopups } from "../redux/popups/slice";

type TPopupProps = PropsWithChildren & {
  isOpened: boolean;
  isLarge?: boolean;
  isMedium?: boolean;
  isSmall?: boolean;
};

const Popup: FC<TPopupProps> = ({
  children,
  isOpened,
  isLarge,
  isMedium,
  isSmall,
}) => {
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(closeAllPopups());
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
          onClick={closeModal}
        ></button>
        {children}
      </div>
    </div>
  );
};

export default Popup;

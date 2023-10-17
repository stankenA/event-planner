import React, {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setIsAuthPopupOpened } from "../redux/authPopup/slice";

const Popup: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const isPopupOpened = useSelector(
    (state: RootState) => state.authPopup.isAuthPopupOpened
  );

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

    if (isPopupOpened) {
      document.addEventListener("keydown", closeOnEsc);
    }

    return () => document.removeEventListener("keydown", closeOnEsc);
  }, [isPopupOpened]);

  return (
    <div
      className={`popup ${isPopupOpened ? "popup_opened" : ""}`}
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

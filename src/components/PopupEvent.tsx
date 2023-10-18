import React from "react";
import Popup from "./Popup";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PopupEvent = () => {
  const isEventPopupOpened = useSelector(
    (state: RootState) => state.popups.isEventPopupOpened
  );

  return (
    <Popup isOpened={isEventPopupOpened}>
      <div className="popup__wrapper popup__wrapper_large"></div>
    </Popup>
  );
};

export default PopupEvent;

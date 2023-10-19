import React, { FC } from "react";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { closeAllPopups } from "../redux/popups/slice";
import { RootState } from "../redux/store";
import PopupNotificationSuccess from "./PopupNotificationSuccess";

const PopupNotification: FC = () => {
  const dispatch = useDispatch();
  const isNotificationPopupOpened = useSelector(
    (state: RootState) => state.popups.isNotificationPopupOpened
  );

  function handleBtnClick() {
    dispatch(closeAllPopups());
  }

  return (
    <Popup isOpened={isNotificationPopupOpened} isMedium={true}>
      <PopupNotificationSuccess handleBtnClick={handleBtnClick} />
    </Popup>
  );
};

export default PopupNotification;

import React, { FC } from "react";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import NotificationSuccess from "./NotificationSuccess";
import NotificationFailed from "./NotificationFailed";
import { setIsNotificationPopupOpened } from "../redux/popups/slice";

const PopupNotification: FC = () => {
  const dispatch = useDispatch();
  const isNotificationPopupOpened = useSelector(
    (state: RootState) => state.popups.isNotificationPopupOpened
  );
  const isSuccessful = useSelector(
    (state: RootState) => state.notification.isSuccessful
  );

  function handleClosePopup() {
    dispatch(setIsNotificationPopupOpened(false));
  }

  return (
    <Popup
      isOpened={isNotificationPopupOpened}
      isMedium={true}
      handleClose={handleClosePopup}
    >
      <div className="notification">
        {isSuccessful ? <NotificationSuccess /> : <NotificationFailed />}
      </div>
    </Popup>
  );
};

export default PopupNotification;

import React, { FC } from "react";
import Popup from "./Popup";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import NotificationSuccess from "./NotificationSuccess";
import NotificationFailed from "./NotificationFailed";

const PopupNotification: FC = () => {
  const isNotificationPopupOpened = useSelector(
    (state: RootState) => state.popups.isNotificationPopupOpened
  );
  const isSuccessful = useSelector(
    (state: RootState) => state.notification.isSuccessful
  );

  return (
    <Popup isOpened={isNotificationPopupOpened} isMedium={true}>
      <div className="notification">
        {isSuccessful ? <NotificationSuccess /> : <NotificationFailed />}
      </div>
    </Popup>
  );
};

export default PopupNotification;

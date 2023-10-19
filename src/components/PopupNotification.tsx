import React, { FC } from "react";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { closeAllPopups } from "../redux/popups/slice";
import { RootState } from "../redux/store";
import NotificationSuccess from "./NotificationSuccess";

const PopupNotification: FC = () => {
  const dispatch = useDispatch();
  const isNotificationPopupOpened = useSelector(
    (state: RootState) => state.popups.isNotificationPopupOpened
  );
  const isSuccessful = useSelector(
    (state: RootState) => state.notification.isSuccessful
  );

  function handleBtnClick() {
    dispatch(closeAllPopups());
  }

  return (
    <Popup isOpened={isNotificationPopupOpened} isMedium={true}>
      <div className="notification">
        {isSuccessful ? (
          <NotificationSuccess handleBtnClick={handleBtnClick} />
        ) : null}
      </div>
    </Popup>
  );
};

export default PopupNotification;

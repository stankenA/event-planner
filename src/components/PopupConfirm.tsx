import React from "react";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Button from "./ui/Button";
import { closeAllPopups, setIsConfirmPopupOpened } from "../redux/popups/slice";
import { api } from "../utils/api";
import { triggerFlag } from "../redux/flag/slice";

const PopupConfirm = () => {
  const dispatch = useDispatch();
  const isConfirmPopupOpened = useSelector(
    (state: RootState) => state.popups.isConfirmPopupOpened
  );
  const eventId = useSelector((state: RootState) => state.event.id);

  async function handleLeaveEvent() {
    try {
      const response = await api.leaveEvent(
        localStorage.getItem("jwt")!,
        eventId
      );
      dispatch(triggerFlag());
      dispatch(closeAllPopups());
    } catch (error) {
      console.log(error);
    }
  }

  function handleClosePopup() {
    dispatch(setIsConfirmPopupOpened(false));
  }

  return (
    <Popup
      isOpened={isConfirmPopupOpened}
      isSmall={true}
      handleClose={handleClosePopup}
    >
      <h2 className="popup__confirm-title">
        Вы действительно хотите отменить участие?
      </h2>
      <div className="popup__confirm-btns">
        <Button type="button" handleClick={handleClosePopup} isSecondary={true}>
          Нет
        </Button>
        <Button type="submit" handleClick={handleLeaveEvent}>
          Да
        </Button>
      </div>
    </Popup>
  );
};

export default PopupConfirm;

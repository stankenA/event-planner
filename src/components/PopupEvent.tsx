import React, { FC, useEffect, useState } from "react";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Participant from "./Participant";
import moment from "moment";
import { eventMonths, weekdays } from "../utils/contstants";

import participantImg from "../images/user-avatar-default.png";
import Gallery from "./Gallery";
import {
  closeAllPopups,
  setIsAuthPopupOpened,
  setIsConfirmPopupOpened,
  setIsNotificationPopupOpened,
} from "../redux/popups/slice";
import Button from "./ui/Button";
import { api } from "../utils/api";
import { setIsNotificationSuccessful } from "../redux/notification/slice";

const PopupEvent: FC = () => {
  const dispatch = useDispatch();
  const event = useSelector((state: RootState) => state.event);
  const user = useSelector((state: RootState) => state.user);
  const isEventPopupOpened = useSelector(
    (state: RootState) => state.popups.isEventPopupOpened
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const isParticipating = event.participants?.some((person) => {
    return person.id === user.id;
  });

  const date = moment(event.dateStart);
  const day = date.date();
  const dayOfWeek = weekdays[date.weekday()];
  const month = eventMonths[date.month()];
  const hour = date.hour();
  const minutes = date.minutes();

  function handleLoginClick() {
    dispatch(closeAllPopups());
    dispatch(setIsAuthPopupOpened(true));
  }

  function handleLeaveClick() {
    dispatch(setIsConfirmPopupOpened(true));
  }

  async function handleJoinEvent() {
    setIsButtonDisabled(true);
    try {
      const response = await api.joinEvent(
        localStorage.getItem("jwt"),
        event.id
      );
      console.log(response);
      dispatch(closeAllPopups());
      dispatch(setIsNotificationSuccessful(true));
      dispatch(setIsNotificationPopupOpened(true));
    } catch (error) {
      dispatch(closeAllPopups());
      dispatch(setIsNotificationSuccessful(false));
      dispatch(setIsNotificationPopupOpened(true));
    } finally {
      setIsButtonDisabled(false);
    }
  }

  return (
    <Popup isOpened={isEventPopupOpened} isLarge={true}>
      <h3 className="popup__title">{event.title}</h3>
      <div className="event">
        <div className="event__box">
          <div className="event__date">
            <p className="event__txt-bold">{dayOfWeek}</p>
            <p className="event__txt-bold">
              {day} {month}
            </p>
            <p className="event__txt-bold">
              {hour < 10 ? "0" + hour : hour}:
              {minutes < 10 ? "0" + minutes : minutes}
            </p>
          </div>
          <p className="event__address">{event.location}</p>
        </div>
        <p className="event__description">{event.description}</p>
      </div>
      <div className="participants">
        <h4 className="participants__subtitle">Участники</h4>
        <div className="participants__content">
          <ul className="participants__list">
            {event.participants?.map((user) => (
              <Participant
                key={user.id}
                name={user.username}
                img={participantImg}
                isOrganizer={true}
              />
            ))}
          </ul>
        </div>
      </div>
      <Gallery />
      {!user.isAuth ? (
        <p className="popup__bottom-txt">
          <button
            type="button"
            className="popup__bottom-btn"
            onClick={handleLoginClick}
          >
            Войдите
          </button>
          , чтобы присоединиться к событию
        </p>
      ) : !isParticipating ? (
        <Button
          type="button"
          handleClick={handleJoinEvent}
          isDisabled={isButtonDisabled}
        >
          Присоединиться к событию
        </Button>
      ) : (
        <p className="popup__bottom-txt">
          Вы присоединились к событию. Если передумали, можете{" "}
          <button
            type="button"
            className="popup__bottom-btn"
            onClick={handleLeaveClick}
          >
            отменить участие
          </button>
          .
        </p>
      )}
    </Popup>
  );
};

export default PopupEvent;

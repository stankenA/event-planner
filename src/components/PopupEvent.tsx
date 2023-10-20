import React, { FC, useState } from "react";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Participant from "./Participant";
import moment from "moment";
import { eventMonths, weekdays } from "../utils/contstants";
import infoIcon from "../images/info-icon.svg";

import participantImg from "../images/user-avatar-default.png";
import Gallery from "./Gallery";
import {
  closeAllPopups,
  setIsAuthPopupOpened,
  setIsConfirmPopupOpened,
  setIsEventPopupOpened,
  setIsNotificationPopupOpened,
} from "../redux/popups/slice";
import Button from "./ui/Button";
import { api } from "../utils/api";
import {
  setIsNotificationSuccessful,
  setNotificationMessage,
} from "../redux/notification/slice";
import { triggerFlag } from "../redux/flag/slice";

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
  const time = `${hour < 10 ? "0" + hour : hour}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  const isManyParticipants = event.participants
    ? event.participants.length > 5
    : false;

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
      dispatch(
        setNotificationMessage({
          heading: "Поздравляем!",
          case: "Вы теперь участник события:",
          title: event.title,
          dayOfWeek: dayOfWeek,
          day: day,
          month: month,
          time: time,
          location: event.location,
          isUnicorn: false,
        })
      );
      dispatch(closeAllPopups());
      dispatch(setIsNotificationSuccessful(true));
      dispatch(setIsNotificationPopupOpened(true));
      dispatch(triggerFlag());
    } catch (error) {
      dispatch(closeAllPopups());
      dispatch(setIsNotificationSuccessful(false));
      dispatch(setIsNotificationPopupOpened(true));
    } finally {
      setIsButtonDisabled(false);
    }
  }

  function handleClosePopup() {
    dispatch(setIsEventPopupOpened(false));
  }

  return (
    <Popup
      isOpened={isEventPopupOpened}
      isLarge={true}
      handleClose={handleClosePopup}
    >
      <h2 className="popup__title popup__title_event">{event.title}</h2>
      {event.isInactive ? (
        <div className="popup__info-container popup__info-container_event">
          <img
            src={infoIcon}
            alt="Информационная иконка"
            className="popup__info-icon"
          />
          <p className="popup__info-txt">Мероприятие уже прошло</p>
        </div>
      ) : null}
      <div className="event">
        <div
          className={`event__box ${
            event.isInactive ? "event__box_inactive" : ""
          }`}
        >
          <div className="event__date">
            <p className="event__txt-bold">{dayOfWeek}</p>
            <p className="event__txt-bold">
              {day} {month}
            </p>
            <p className="event__txt-bold">{time}</p>
          </div>
          <p className="event__address">{event.location}</p>
        </div>
        <p className="event__description">{event.description}</p>
      </div>
      <div className="participants">
        <h4 className="participants__subtitle">Участники</h4>
        <div className="participants__content">
          <ul className="participants__list">
            {isManyParticipants
              ? event.participants
                  ?.map((person) => (
                    <Participant
                      key={person.id}
                      name={person.username}
                      img={participantImg}
                      isOrganizer={event.owner?.id === person.id}
                    />
                  ))
                  .slice(0, 5)
              : event.participants?.map((person) => (
                  <Participant
                    key={person.id}
                    name={person.username}
                    img={participantImg}
                    isOrganizer={event.owner?.id === person.id}
                  />
                ))}
          </ul>
          {isManyParticipants ? (
            <div className="participants__amount">
              <div className="participants__img-container">
                <img
                  src={participantImg}
                  alt="Фото участника"
                  className="participants__img"
                />
                <img
                  src={participantImg}
                  alt="Фото участника"
                  className="participants__img"
                />
                <img
                  src={participantImg}
                  alt="Фото участника"
                  className="participants__img"
                />
              </div>
              <p className="participants__txt">
                Ещё +{event.participants!.length - 5}
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <Gallery />
      {event.isInactive ? null : !user.isAuth ? (
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

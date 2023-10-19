import React, { FC } from "react";
import { TEventBadge } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { setIsEventPopupOpened } from "../redux/popups/slice";
import { setEvent } from "../redux/event/slice";
import { RootState } from "../redux/store";

const EventBadge: FC<TEventBadge> = ({ date, event, isInactive }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  function handleEventClick() {
    console.log(event);
    dispatch(setEvent(event));
    dispatch(setIsEventPopupOpened(true));
  }

  const isParticipating = event.participants?.some(
    (person) => person.id === user.id
  );

  const isOrganizer = event.owner?.id === user.id;

  return (
    <button
      type="button"
      onClick={handleEventClick}
      className={`calendar__event-badge ${
        // Инактивировать плашки событий, дата которых меньше текущей
        isInactive ? "calendar__event-badge_inactive" : ""
      }
      ${isOrganizer ? "calendar__event-badge_organizer" : ""}`}
    >
      {isParticipating ? <span className="calendar__event-icon"></span> : null}
      <p className="calendar__event-badge-txt">{event.title}</p>
    </button>
  );
};

export default EventBadge;

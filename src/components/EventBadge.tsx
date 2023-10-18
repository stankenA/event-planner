import React, { FC } from "react";
import { TEventBadge } from "../utils/types";
import { useDispatch } from "react-redux";
import { setIsEventPopupOpened } from "../redux/popups/slice";
import { setEvent } from "../redux/event/slice";

const EventBadge: FC<TEventBadge> = ({ date, event, isInactive }) => {
  const dispatch = useDispatch();

  function handleEventClick() {
    dispatch(setEvent(event));
    dispatch(setIsEventPopupOpened(true));
  }

  return (
    <button
      type="button"
      onClick={handleEventClick}
      className={`calendar__event ${
        // Инактивировать плашки событий, дата которых меньше текущей
        isInactive ? "calendar__event_inactive" : ""
      }`}
    >
      {event.title}
    </button>
  );
};

export default EventBadge;

import React, { FC } from "react";
import { TEventBadge } from "../utils/types";

const EventBadge: FC<TEventBadge> = ({ date, event, isInactive }) => {
  function handleEventClick() {}

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

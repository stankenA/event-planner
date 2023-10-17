import React, { FC } from "react";
import { TEventBadge } from "../utils/types";

const EventBadge: FC<TEventBadge> = ({ date, event, isInactive }) => {
  return (
    <span
      className={`calendar__event ${
        // Инактивировать плашки событий, дата которых меньше текущей
        isInactive ? "calendar__event_inactive" : ""
      }`}
    >
      {event.title}
    </span>
  );
};

export default EventBadge;

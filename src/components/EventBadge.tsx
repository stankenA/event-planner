import React, { FC } from "react";
import { TEvent } from "../utils/types";

const EventBadge: FC<{ date: string; event: TEvent }> = ({ date, event }) => {
  return (
    <span
      className={`calendar__event ${
        // Инактивировать плашки событий, дата которых меньше текущей
        date ? "calendar__event_inactive" : ""
      }`}
    >
      {event.title}
    </span>
  );
};

export default EventBadge;

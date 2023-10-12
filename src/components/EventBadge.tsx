import React, { FC } from "react";

const EventBadge: FC<{ date: string }> = ({ date }) => {
  return (
    <span
      className={`calendar__event ${
        // Инактивировать плашки событий, дата которых меньше текущей
        date ? "calendar__event_inactive" : ""
      }`}
    >
      {date}
    </span>
  );
};

export default EventBadge;

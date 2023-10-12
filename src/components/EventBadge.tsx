import React, { FC } from "react";
import { TDate } from "../utils/types";

const EventBadge: FC<{ date: TDate }> = ({ date }) => {
  return (
    <span
      className={`calendar__event ${
        // Инактивировать плашки событий, дата которых меньше текущей
        date ? "calendar__event_inactive" : ""
      }`}
    >
      Музыкальный опен-эйррррррррррр
    </span>
  );
};

export default EventBadge;

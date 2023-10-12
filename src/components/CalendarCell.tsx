import React, { FC } from "react";
import { currentDay, currentMonth, currentYear } from "../utils/contstants";
import { TCalendarCellProps, TDate } from "../utils/types";

const CalendarCell: FC<TCalendarCellProps> = ({ month, date }) => {
  function isDateInactive(date: TDate) {
    return (
      date.year < currentYear ||
      (date.month < currentMonth + 1 && date.year <= currentYear) ||
      (date.day < currentDay &&
        date.month <= currentMonth + 1 &&
        date.year <= currentYear)
    );
  }

  return (
    <li
      className={`calendar__cell ${
        month !== date.month - 1 ? "calendar__cell_inactive" : ""
      }`}
    >
      <p className="calendar__date">{date.day}</p>
      <span
        className={`calendar__event ${
          // Инактивировать плашки событий, дата которых меньше текущей
          isDateInactive(date) ? "calendar__event_inactive" : ""
        }`}
      >
        Музыкальный опен-эйррррррррррр
      </span>
    </li>
  );
};

export default CalendarCell;

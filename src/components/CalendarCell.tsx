import React, { FC } from "react";
import { currentDay, currentMonth, currentYear } from "../utils/contstants";
import { TCalendarCellProps, TDate } from "../utils/types";
import EventBadge from "./EventBadge";

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
      <EventBadge date={date} />
    </li>
  );
};

export default CalendarCell;

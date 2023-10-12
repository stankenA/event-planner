import React, { FC } from "react";
import { currentDay, currentMonth, currentYear } from "../utils/contstants";
import { TCalendarCellProps } from "../utils/types";
import EventBadge from "./EventBadge";
import moment from "moment";

const CalendarCell: FC<TCalendarCellProps> = ({ date, month, events }) => {
  function isDateInRange(startEventDate: string, endEventDate?: string | null) {
    if (endEventDate) {
      return moment(date).isBetween(startEventDate, endEventDate, "day", "[]");
    } else {
      return date === moment(startEventDate).format("YYYY-MM-DD");
    }
  }

  const dateArr = date.split("-");
  const cellDay = +dateArr[2];
  const cellMonth = +dateArr[1];

  return (
    <li
      className={`calendar__cell ${
        month !== cellMonth - 1 ? "calendar__cell_inactive" : ""
      }`}
    >
      <p className="calendar__date">{`${cellDay}`}</p>
      {events.map((event) => {
        if (isDateInRange(event.dateStart, event.dateEnd)) {
          return <EventBadge date={date} key={event.id} event={event} />;
        }
        return "";
      })}
    </li>
  );
};

export default CalendarCell;

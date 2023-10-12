import React, { FC } from "react";
import { currentDay, currentMonth, currentYear } from "../utils/contstants";
import { TCalendarCellProps } from "../utils/types";
import EventBadge from "./EventBadge";

const CalendarCell: FC<TCalendarCellProps> = ({ date, month, events }) => {
  function isDateInRange(startEventDate: string, endEventDate?: string | null) {
    let startDateValue = Date.parse(startEventDate);
    let currentCellDate = Date.parse(date);
    let endDateValue;

    console.log(date);

    if (endEventDate) {
      endDateValue = Date.parse(endEventDate);
      return (
        startDateValue <= currentCellDate && currentCellDate <= endDateValue
      );
    } else {
      return currentCellDate >= startDateValue;
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
        console.log(isDateInRange(event.dateStart, event.dateEnd));
        if (isDateInRange(event.dateStart, event.dateEnd)) {
          return <EventBadge date={date} key={event.id} />;
        }
        return "";
      })}
    </li>
  );
};

export default CalendarCell;

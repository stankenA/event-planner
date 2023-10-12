import React, { FC } from "react";
import { TCalendarProps, TDate } from "../utils/types";
import CalendarCell from "./CalendarCell";

const Calendar: FC<TCalendarProps> = ({
  calendarDates,
  month,
  year,
  monthOverlap,
}) => {
  return (
    <ul className="calendar__grid">
      {calendarDates.map((date, i) => (
        <CalendarCell date={date} month={month} key={i} />
      ))}
    </ul>
  );
};

export default Calendar;

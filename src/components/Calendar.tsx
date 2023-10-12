import React, { FC } from "react";
import { TCalendarProps } from "../utils/types";
import CalendarCell from "./CalendarCell";

const Calendar: FC<TCalendarProps> = ({ calendarDates, month, events }) => {
  return (
    <ul className="calendar__grid">
      {calendarDates.map((date, i) => (
        <CalendarCell date={date} month={month} events={events} key={i} />
      ))}
    </ul>
  );
};

export default Calendar;

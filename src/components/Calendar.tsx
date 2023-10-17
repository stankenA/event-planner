import React, { FC } from "react";
import { TCalendarProps } from "../utils/types";
import CalendarCell from "./CalendarCell";

const Calendar: FC<TCalendarProps> = ({ calendarDates, events }) => {
  return (
    <ul className="calendar__grid">
      {calendarDates.map((date, i) => (
        <CalendarCell date={date} events={events} key={i} />
      ))}
    </ul>
  );
};

export default Calendar;

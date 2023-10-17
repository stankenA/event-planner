import React, { FC } from "react";
import { TCalendarProps } from "../utils/types";
import CalendarCell from "./CalendarCell";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Calendar: FC<TCalendarProps> = ({ month, events, calendarDates }) => {
  return (
    <ul className="calendar__grid">
      {calendarDates.map((date) => (
        <CalendarCell date={date} key={date} events={events} month={month} />
      ))}
    </ul>
  );
};

export default Calendar;

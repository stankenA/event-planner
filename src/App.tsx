import React, { FC, useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import moment from "moment";
import { currentDay, currentMonth, currentYear } from "./utils/contstants";
import { TEvent } from "./utils/types";
import Calendar from "./components/Calendar";
import { api } from "./utils/api";

const App: FC = () => {
  moment.updateLocale("ru", {
    week: { dow: 1 },
  });

  // Переменные календаря
  const [calendarDates, setCalendarDates] = useState<string[]>([
    ...Array(42).fill(""),
  ]);
  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);
  const [monthOverlap, setMonthOverlap] = useState<number>(0);

  const [events, setEvents] = useState<TEvent[]>([]);

  function increaseMonthOverlap() {
    setMonthOverlap(monthOverlap + 1);
  }

  function decreaseMonthOverlap() {
    setMonthOverlap(monthOverlap - 1);
  }

  useEffect(() => {
    let startDay = moment()
      .add(monthOverlap, "month")
      .startOf("month")
      .startOf("week")
      .subtract(1, "day");

    setMonth(moment().add(monthOverlap, "month").month());
    setYear(moment().add(monthOverlap, "month").year());

    const currentCalendarDates = calendarDates.map(() => {
      const date = startDay.add(1, "day").format("YYYY-MM-DD");
      return date;
    });
    setCalendarDates(currentCalendarDates);
  }, [monthOverlap]);

  useEffect(() => {
    const startDate = new Date(calendarDates[0]).toJSON();
    const endDate = new Date(calendarDates[calendarDates.length - 1]).toJSON();

    async function getEvents() {
      try {
        const response = await api.getEventsForPublic(startDate, endDate);
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getEvents();
  }, [calendarDates]);

  return (
    <div className="page">
      <Header
        onPrevMonth={decreaseMonthOverlap}
        onNextMonth={increaseMonthOverlap}
        month={month}
        year={year}
      />
      <section className="calendar">
        <div className="calendar__wrapper">
          <Calendar
            calendarDates={calendarDates}
            month={month}
            events={events}
          />
        </div>
      </section>
    </div>
  );
};

export default App;

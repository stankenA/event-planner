import React, { FC, useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import moment from "moment";
import { currentMonth, currentYear } from "./utils/contstants";
import { TEvent } from "./utils/types";
import Calendar from "./components/Calendar";
import { api } from "./utils/api";
import PopupAuth from "./components/PopupAuth";

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

  // функции для переключения месяцев с ограничением в полгода
  function increaseMonthOverlap() {
    if (monthOverlap === 6) {
      return;
    }

    setMonthOverlap(monthOverlap + 1);
  }

  function decreaseMonthOverlap() {
    if (monthOverlap === -6) {
      return;
    }

    setMonthOverlap(monthOverlap - 1);
  }

  // заполнение текущей страницы календаря необходимыми датами
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

  // запрос всех ивентов, начало которых попадает в период текущей страницы календаря
  useEffect(() => {
    // для избежания запроса всех ивентов при первом рендере
    if (calendarDates[0].length === 0) {
      return;
    }

    const firstCalendarDate = moment(calendarDates[0])
      .add(-1, "month")
      .toJSON();
    const lastCalendarDate = moment(calendarDates[calendarDates.length - 1])
      .add(1, "month")
      .toJSON();

    async function getEvents() {
      try {
        const response = await api.getEventsForPublic(
          firstCalendarDate,
          lastCalendarDate
        );
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getEvents();
  }, [calendarDates]);

  console.log(events);

  return (
    <div className="page">
      <Header
        onPrevMonth={decreaseMonthOverlap}
        onNextMonth={increaseMonthOverlap}
        month={month}
        year={year}
        isLogged={false}
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
      <PopupAuth />
    </div>
  );
};

export default App;

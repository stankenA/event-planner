import React, { FC, useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import moment from "moment";
import { currentDay, currentMonth, currentYear } from "./utils/contstants";

type TDate = {
  day: number;
  month: number;
  year: number;
};

const App: FC = () => {
  moment.updateLocale("ru", {
    week: { dow: 1 },
  });

  // Переменные календаря
  const [calendarDates, setCalendarDates] = useState<TDate[]>([
    ...Array(42).fill({ day: "", month: "", year: "" }),
  ]);
  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);
  const [monthOverlap, setMonthOverlap] = useState<number>(0);

  console.log(calendarDates);
  console.log(currentDay, currentMonth);

  function increaseMonthOverlap() {
    setMonthOverlap(monthOverlap + 1);
  }

  function decreaseMonthOverlap() {
    setMonthOverlap(monthOverlap - 1);
  }

  useEffect(() => {
    const startDay = moment()
      .add(monthOverlap, "month")
      .startOf("month")
      .startOf("week")
      .subtract(1, "day");

    setMonth(moment().add(monthOverlap, "month").month());
    setYear(moment().add(monthOverlap, "month").year());

    const currentCalendarDates = calendarDates.map(() => {
      const dateArr = startDay.add(1, "day").format("D-MM-YYYY").split("-");
      return {
        day: +dateArr[0],
        month: +dateArr[1],
        year: +dateArr[2],
      };
    });
    setCalendarDates(currentCalendarDates);
  }, [monthOverlap]);

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
          <ul className="calendar__grid">
            {calendarDates.map((date, i) => (
              <li
                className={`calendar__cell ${
                  month !== date.month - 1 ? "calendar__cell_inactive" : ""
                }`}
                key={i}
              >
                <p className="calendar__date">{date.day}</p>
                <span
                  className={`calendar__event ${
                    // Инактивировать плашки событий, если:
                    // Год события меньше текущего
                    // Месяц события меньше текущего
                    date.year < currentYear ||
                    (date.month < currentMonth + 1 &&
                      date.year <= currentYear) ||
                    (date.day < currentDay &&
                      date.month <= currentMonth + 1 &&
                      date.year <= currentYear)
                      ? "calendar__event_inactive"
                      : ""
                  }`}
                >
                  Музыкальный опен-эйррррррррррр
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default App;

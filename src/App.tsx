import React, { FC, useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import moment from "moment";

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
  const [day, setDay] = useState<number>(new Date().getDate());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  // const [startDay, setStartDay] = useState(
  //   moment().startOf("month").startOf("week").subtract(1, "day")
  // );

  console.log(day, month, year);
  console.log(calendarDates);

  useEffect(() => {
    const startDay = moment()
      .startOf("month")
      .startOf("week")
      .subtract(1, "day");

    const currentCalendarDates = calendarDates.map(() => {
      const dateArr = startDay.add(1, "day").format("D-MM-YYYY").split("-");
      return {
        day: +dateArr[0],
        month: +dateArr[1],
        year: +dateArr[2],
      };
    });
    setCalendarDates(currentCalendarDates);
  }, []);

  return (
    <div className="page">
      <Header />
      <section className="calendar">
        <div className="calendar__wrapper">
          <ul className="calendar__grid">
            {calendarDates.map((date, i) => (
              <li
                className={`calendar__cell ${
                  month !== date.month ? "calendar__cell_inactive" : ""
                }`}
                key={i}
              >
                <p className="calendar__date">{date.day}</p>
                <span
                  className={`calendar__event ${
                    day > date.day ? "calendar__event_inactive" : ""
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

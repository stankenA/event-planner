import React, { FC, useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import moment from "moment";
import { currentMonth, currentYear } from "./utils/contstants";
import { TEvent } from "./utils/types";
import Calendar from "./components/Calendar";
import { api } from "./utils/api";
import PopupAuth from "./components/PopupAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setMonth, setYear } from "./redux/dates/slice";

const App: FC = () => {
  moment.updateLocale("ru", {
    week: { dow: 1 },
  });

  // Переменные календаря
  const dispatch = useDispatch();
  // const calendarDates = useSelector(
  //   (state: RootState) => state.calendarDates.calendarDates
  // );

  const [calendarDates, setCalendarDates] = useState([...Array(42).fill("")]);
  const [events, setEvents] = useState<TEvent[]>([]);

  const monthOverlap = useSelector(
    (state: RootState) => state.dates.monthOverlap
  );

  // заполнение текущей страницы календаря необходимыми датами
  useEffect(() => {
    let startDay = moment()
      .add(monthOverlap, "month")
      .startOf("month")
      .startOf("week")
      .subtract(1, "day");

    dispatch(setMonth(moment().add(monthOverlap, "month").month()));
    dispatch(setYear(moment().add(monthOverlap, "month").year()));

    const currentCalendarDates = calendarDates.map(() => {
      const date = startDay.add(1, "day").format("YYYY-MM-DD");
      return date;
    });
    // dispatch(setCalendarDates(currentCalendarDates));
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
      <Header />
      <section className="calendar">
        <div className="calendar__wrapper">
          <Calendar calendarDates={calendarDates} events={events} />
        </div>
      </section>
      <PopupAuth />
    </div>
  );
};

export default App;

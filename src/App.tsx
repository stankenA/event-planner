import React, { FC, useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import moment from "moment";
import { TEvent } from "./utils/types";
import Calendar from "./components/Calendar";
import { api } from "./utils/api";
import PopupAuth from "./components/PopupAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setMonth, setYear } from "./redux/dates/slice";
import { setUser } from "./redux/user/slice";
import PopupEvent from "./components/PopupEvent";
import PopupNotification from "./components/PopupNotification";
import PopupConfirm from "./components/PopupConfirm";
import PopupCreate from "./components/PopupCreate";

const App: FC = () => {
  moment.updateLocale("ru", {
    week: { dow: 1 },
  });

  // Переменные календаря
  const dispatch = useDispatch();

  const [calendarDates, setCalendarDates] = useState([...Array(42).fill("")]);
  const [events, setEvents] = useState<TEvent[]>([]);
  const user = useSelector((state: RootState) => state.user);
  // Флаг для триггера запроса ивентов с бэка
  const flag = useSelector((state: RootState) => state.flag.flag);

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

    async function getEventsForPublic() {
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

    async function getEventsForAuth() {
      try {
        const response = await api.getEventsForAuth(
          localStorage.getItem("jwt")!,
          firstCalendarDate,
          lastCalendarDate
        );
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (user.isAuth) {
      getEventsForAuth();
    } else {
      getEventsForPublic();
    }
  }, [calendarDates, user.isAuth, flag]);

  // Проверяем, сохранён ли токен в сторадже
  useEffect(() => {
    async function checkUser() {
      try {
        const response = await api.getCurrentUser(localStorage.getItem("jwt")!);
        dispatch(setUser(response));
      } catch (error) {
        console.log(error);
      }
    }

    if (localStorage.getItem("jwt")) {
      checkUser();
    }
  }, []);

  return (
    <div className="page">
      <Header />
      <section className="calendar">
        <ul className="calendar__top">
          <li className="calendar__weekday">Пн</li>
          <li className="calendar__weekday">Вт</li>
          <li className="calendar__weekday">Ср</li>
          <li className="calendar__weekday">Чт</li>
          <li className="calendar__weekday">Пт</li>
          <li className="calendar__weekday">Сб</li>
          <li className="calendar__weekday">Вс</li>
        </ul>
        <div className="calendar__wrapper">
          <Calendar calendarDates={calendarDates} events={events} />
        </div>
      </section>
      <PopupAuth />
      <PopupEvent />
      <PopupCreate />
      <PopupConfirm />
      <PopupNotification />
    </div>
  );
};

export default App;

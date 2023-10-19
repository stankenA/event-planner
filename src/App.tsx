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
  const user = useSelector((state: RootState) => state.user);
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
          localStorage.getItem("jwt"),
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
        const response = await api.getCurrentUser(localStorage.getItem("jwt"));
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
        <div className="calendar__top">
          <p className="calendar__weekday">Пн</p>
          <p className="calendar__weekday">Вт</p>
          <p className="calendar__weekday">Ср</p>
          <p className="calendar__weekday">Чт</p>
          <p className="calendar__weekday">Пт</p>
          <p className="calendar__weekday">Сб</p>
          <p className="calendar__weekday">Вс</p>
        </div>
        <div className="calendar__wrapper">
          <Calendar calendarDates={calendarDates} events={events} />
        </div>
      </section>
      <PopupAuth />
      <PopupEvent />
      <PopupNotification />
      <PopupConfirm />
    </div>
  );
};

export default App;

import React, { useState } from "react";
import Popup from "./Popup";
import Input from "./ui/Input";
import Participant from "./Participant";
import userImg from "../images/user-avatar-default.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Button from "./ui/Button";
import Textarea from "./ui/Textarea";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { api } from "../utils/api";
import moment from "moment";
import { timeRegExp } from "../utils/contstants";
import {
  setIsCreatePopupOpened,
  setIsNotificationPopupOpened,
} from "../redux/popups/slice";
import { triggerFlag } from "../redux/flag/slice";

const PopupCreate = () => {
  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [noticeTxt, setNoticeTxt] = useState({
    title: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    location: "",
    time: "",
  });
  const user = useSelector((state: RootState) => state.user);
  const isCreatePopupOpened = useSelector(
    (state: RootState) => state.popups.isCreatePopupOpened
  );
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    title: "",
    description: "",
    dateStart: "",
    location: "",
    time: "",
  });

  function checkFormValidity() {
    let errorsObj = {
      title: "",
      description: "",
      dateStart: "",
      dateEnd: "",
      location: "",
      time: "",
    };
    let isFormValid = true;

    if (!isValid) {
      errorsObj = {
        title: errors.title,
        description: errors.description,
        dateStart: errors.dateStart,
        dateEnd: errors.dateEnd,
        location: errors.location,
        time: errors.time,
      };

      isFormValid = false;
    }

    if (!values.title) {
      errorsObj.title = "Это поле обязательно для заполнения";
      isFormValid = false;
    }

    if (!values.description) {
      errorsObj.description = "Это поле обязательно для заполнения";
      isFormValid = false;
    }

    if (!values.dateStart) {
      errorsObj.dateStart = "Это поле обязательно для заполнения";
      isFormValid = false;
    }

    if (!values.location) {
      errorsObj.location = "Это поле обязательно для заполнения";
      isFormValid = false;
    }

    if (!timeRegExp.test(values.time)) {
      errorsObj.time = "Введите время в формате ЧЧ:ММ";
      isFormValid = false;
    }

    setNoticeTxt(errorsObj);
    return isFormValid;
  }

  async function createNewEvent() {
    const dateStart = moment(`${values.dateStart} ${values.time}`).toJSON();
    const dateEnd = moment(`${values.dateEnd}`).toJSON();

    const newEvent = {
      ...values,
      dateStart: dateStart,
      dateEnd: dateEnd,
      participants: [user],
    };

    const jwt = localStorage.getItem("jwt");

    try {
      const response = await api.createEvent(jwt, newEvent);
      console.log(response);
      dispatch(setIsCreatePopupOpened(false));
      dispatch(triggerFlag());
    } catch (error) {
      dispatch(setIsNotificationPopupOpened(true));
    }
  }

  function handleSubmitClick() {
    if (checkFormValidity()) {
      createNewEvent();
    }
  }

  return (
    <Popup isOpened={isCreatePopupOpened} isLarge={true}>
      <h2 className="popup__title">Создание события</h2>
      <form className="create">
        <div className="create__grid">
          <Input
            type="text"
            name="title"
            label="Название"
            placeholder="Введите название события"
            required={true}
            handleChange={handleChange}
            noticeTxt={noticeTxt.title}
            maxLength={140}
          />
          <div className="create__datepicker-container">
            <Input
              type="date"
              name="dateStart"
              label="Начало"
              placeholder="Введите название события"
              required={true}
              handleChange={handleChange}
              noticeTxt={noticeTxt.dateStart}
              isFocused={true}
            />
            <Input
              type="date"
              name="dateEnd"
              label="Конец"
              placeholder="Введите название события"
              handleChange={handleChange}
              noticeTxt={noticeTxt.dateEnd}
              isFocused={true}
            />
          </div>
          <Textarea
            name="description"
            label="Описание"
            required={true}
            handleChange={handleChange}
            noticeTxt={noticeTxt.description}
            maxLength={1000}
          />
          <div className="create__side-box">
            <Input
              type="text"
              name="time"
              label="Время"
              placeholder="ЧЧ:ММ"
              required={true}
              handleChange={handleChange}
              noticeTxt={noticeTxt.time}
            />
            <Input
              type="text"
              name="location"
              label="Место проведения"
              placeholder="Введите место проведения"
              required={true}
              handleChange={handleChange}
              noticeTxt={noticeTxt.location}
            />
          </div>
          <Input
            type="text"
            name="participants"
            label="Участники"
            placeholder=""
            handleChange={() => console.log("boop")}
            noticeTxt=""
          />
          <Participant img={userImg} name={user.username} isOrganizer={true} />
        </div>
        <Button
          type="submit"
          handleClick={handleSubmitClick}
          isDisabled={isButtonDisabled}
        >
          Создать
        </Button>
      </form>
    </Popup>
  );
};

export default PopupCreate;

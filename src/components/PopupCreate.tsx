import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Participant from "./Participant";
import DragField from "./DragField";
import moment from "moment";
import { eventMonths, timeRegExp, weekdays } from "../utils/contstants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { api } from "../utils/api";
import {
  setIsCreatePopupOpened,
  setIsNotificationPopupOpened,
} from "../redux/popups/slice";
import { triggerFlag } from "../redux/flag/slice";
import {
  setIsNotificationSuccessful,
  setNotificationMessage,
} from "../redux/notification/slice";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import userImg from "../images/user-avatar-default.png";

const PopupCreate = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const isCreatePopupOpened = useSelector(
    (state: RootState) => state.popups.isCreatePopupOpened
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [noticeTxt, setNoticeTxt] = useState({
    title: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    location: "",
    time: "",
  });
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    title: "",
    description: "",
    dateStart: "",
    location: "",
    time: "",
  });

  // Drag and drop переменные
  const [filesArr, setFilesArr] = useState<File[]>([]);
  const [photosArr, setPhotosArr] = useState<string[]>([]);
  const [photosIdArr, setPhotosIdArr] = useState<string[]>([]);

  // Проверка валидности формы
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

  // Обработка фото
  function handlePhotoDelete(index: number) {
    const photos = photosArr.filter((_, i) => i !== index);
    const files = filesArr.filter((_, i) => i !== index);
    setPhotosArr(photos);
    setFilesArr(files);
  }

  // Обработка файлов для отправки на бэк
  function processPhotoFiles(filesArr: File[]) {
    const formData = new FormData();

    filesArr.forEach((item, i) => {
      formData.append(`file-${i}`, item, item.name);
    });

    return formData;
  }

  // Создание нового ивента
  async function createNewEvent() {
    const dateStart = moment(`${values.dateStart} ${values.time}`);
    const dateEnd = moment(`${values.dateEnd}`);

    const newEvent = {
      title: values.title,
      description: values.description,
      location: values.location,
      dateStart: dateStart.toJSON(),
      dateEnd: dateEnd.toJSON(),
      participants: [user],
    };

    // const photosData = processPhotoFiles(filesArr);
    const jwt = localStorage.getItem("jwt");

    try {
      // const photosResponse = await api.uploadFiles(jwt!, photosData);
      const eventResponse = await api.createEvent(jwt!, newEvent);
      // const updatedResponse = await api.updateEventDataWithPhotos(
      //   jwt!,
      //   eventResponse.id,
      //   photosIdArr
      // );
      // console.log({ 1: photosResponse, 2: eventResponse, 3: updatedResponse });
      dispatch(setIsCreatePopupOpened(false));
      dispatch(triggerFlag());
      dispatch(setIsNotificationSuccessful(true));
      dispatch(
        setNotificationMessage({
          heading: "Ура!",
          case: "Вы добавили новое событие:",
          title: newEvent.title,
          dayOfWeek: weekdays[dateStart.weekday()],
          day: dateStart.date(),
          month: eventMonths[dateStart.month()],
          time: values.time,
          location: newEvent.location,
          isUnicorn: true,
        })
      );
      dispatch(setIsNotificationPopupOpened(true));
    } catch (error) {
      console.log(error);
      dispatch(setIsNotificationSuccessful(false));
      dispatch(setIsNotificationPopupOpened(true));
    }
  }

  // Нажатие на кнопку Создать
  function handleSubmitClick() {
    const isCreateFormValid = checkFormValidity();
    if (isCreateFormValid) {
      createNewEvent();
    }
  }

  // Закрытие попапа
  function handleClosePopup() {
    dispatch(setIsCreatePopupOpened(false));
  }

  // Добавление новых фото
  useEffect(() => {
    const newArr = filesArr.map((file) => {
      return URL.createObjectURL(file);
    });

    setPhotosArr(newArr);
  }, [filesArr]);

  return (
    <Popup
      isOpened={isCreatePopupOpened}
      isLarge={true}
      handleClose={handleClosePopup}
    >
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
          <DragField filesArr={filesArr} setFilesArr={setFilesArr} />
          <ul className="photos">
            {photosArr.map((photo, i) => (
              <li className="photos__item" key={photo}>
                <img className="photos__img" src={photo} alt="Фото события" />
                <button
                  type="button"
                  className="photos__delete"
                  onClick={() => handlePhotoDelete(i)}
                ></button>
              </li>
            ))}
          </ul>
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

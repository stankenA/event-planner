import React from "react";
import Popup from "./Popup";
import Input from "./ui/Input";
import Participant from "./Participant";
import userImg from "../images/user-avatar-default.png";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Button from "./ui/Button";
import Textarea from "./ui/Textarea";

const PopupCreate = () => {
  const user = useSelector((state: RootState) => state.user);
  const isCreatePopupOpened = useSelector(
    (state: RootState) => state.popups.isCreatePopupOpened
  );

  return (
    <Popup isOpened={isCreatePopupOpened} isLarge={true}>
      <h2 className="popup__title">Создание события</h2>
      <form className="create">
        <div className="create__grid">
          <Input
            type="text"
            name="name"
            label="Название"
            placeholder="Введите название события"
            required={true}
            handleChange={() => console}
            noticeTxt=""
          />
          <div className="create__datepicker-container">
            <Input
              type="date"
              name="dateStart"
              label="Начало"
              placeholder="Введите название события"
              required={true}
              handleChange={() => console}
              noticeTxt=""
              isFocused={true}
            />
            <Input
              type="date"
              name="dateEnd"
              label="Конец"
              placeholder="Введите название события"
              handleChange={() => console}
              noticeTxt=""
              isFocused={true}
            />
          </div>
          <Textarea
            name="description"
            label="Описание"
            required={true}
            handleChange={() => console}
            noticeTxt=""
          />
          <div className="create__side-box">
            <Input
              type="text"
              name="time"
              label="Время"
              placeholder="ЧЧ:ММ"
              required={true}
              handleChange={() => console}
              noticeTxt=""
            />
            <Input
              type="text"
              name="location"
              label="Место проведения"
              placeholder="Введите место проведения"
              required={true}
              handleChange={() => console}
              noticeTxt=""
            />
          </div>
          <Input
            type="text"
            name="participants"
            label="Участники"
            placeholder=""
            handleChange={() => console}
            noticeTxt=""
          />
          <Participant img={userImg} name={user.username} isOrganizer={true} />
        </div>
        <Button type="submit" handleClick={() => console} isDisabled={true}>
          Создать
        </Button>
      </form>
    </Popup>
  );
};

export default PopupCreate;

import React, { FC, useEffect, useState } from "react";
import Popup from "./Popup";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useForm } from "../hooks/useForm";
import { api } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthPopupOpened } from "../redux/authPopup/slice";
import { RootState } from "../redux/store";
import { setUser } from "../redux/user/slice";

const PopupAuth: FC = () => {
  const dispatch = useDispatch();
  const isAuthPopupOpened = useSelector(
    (state: RootState) => state.authPopup.isAuthPopupOpened
  );

  const [isMailExisting, setIsMailExisting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [noticeTxt, setNoticeTxt] = useState("");
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  async function checkMail() {
    setIsButtonDisabled(true);
    try {
      await api.checkUserExists(values.email);
      setIsMailExisting(true);
      setNoticeTxt("");
    } catch (error) {
      setNoticeTxt("Дурак?");
    } finally {
      setIsButtonDisabled(false);
    }
  }

  async function authorize() {
    setIsButtonDisabled(true);

    try {
      const response = await api.login(values.email, values.password);

      if (response.jwt) {
        localStorage.setItem("jwt", response.jwt);
      }
      dispatch(
        setUser({
          email: response.user.email,
          username: response.user.username,
          id: response.user.id,
        })
      );
      dispatch(setIsAuthPopupOpened(false));
    } catch (error) {
      console.log(error);
    } finally {
      setIsButtonDisabled(false);
    }
  }

  useEffect(() => {
    if (!values.email) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [values.email]);

  return (
    <Popup isOpened={isAuthPopupOpened}>
      <form className="popup__form">
        <h3 className="popup__title">Вход</h3>
        {isMailExisting ? (
          <Input
            value={values.password}
            label="Пароль"
            type="password"
            name="password"
            placeholder="Пароль"
            noticeTxt={noticeTxt}
            handleChange={handleChange}
          />
        ) : (
          <Input
            value={values.email}
            label="E-mail"
            type="email"
            name="email"
            placeholder="E-mail"
            noticeTxt={noticeTxt}
            handleChange={handleChange}
          />
        )}
        {isMailExisting ? (
          <Button
            type="submit"
            handleClick={authorize}
            isDisabled={isButtonDisabled}
          >
            Войти
          </Button>
        ) : (
          <Button
            type="submit"
            handleClick={checkMail}
            isDisabled={isButtonDisabled}
          >
            Далее
          </Button>
        )}
      </form>
    </Popup>
  );
};

export default PopupAuth;

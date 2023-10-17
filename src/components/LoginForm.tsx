import React, { FC, useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { api } from "../utils/api";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/slice";
import { setIsAuthPopupOpened } from "../redux/popups/slice";

type TLoginFormProps = {
  setIsLoginForm: (state: boolean) => void;
};

const LoginForm: FC<TLoginFormProps> = ({ setIsLoginForm }) => {
  const dispatch = useDispatch();
  const [isMailExisting, setIsMailExisting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [noticeTxt, setNoticeTxt] = useState("");

  // Хук для сбора данных с формы и их валидации
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: "",
    password: "",
  });

  // Запрос на бэк для проверки почты
  async function checkMail() {
    setIsButtonDisabled(true);
    try {
      await api.checkUserExists(values.email);
      setIsMailExisting(true);
      setNoticeTxt("");
    } catch (error: any) {
      if (error.status === 404) {
        setIsLoginForm(false);
      } else {
        setNoticeTxt("Что-то пошло не так, попробуйте позже");
      }
    } finally {
      setIsButtonDisabled(false);
    }
  }

  // Функция клика по кнопке далее при вводе поля E-mail
  function handleEmailClick() {
    if (!isValid) {
      setNoticeTxt(
        errors.email ? errors.email : "Это поле обязательно для заполнения"
      );
      return;
    }

    checkMail();
  }

  // Запрос на бэк для авторизации пользователя
  async function authorize() {
    setIsButtonDisabled(true);

    try {
      const response = await api.login(values.email, values.password);
      console.log(response);

      if (response.jwt) {
        localStorage.setItem("jwt", response.jwt);
      }
      dispatch(setUser(response.user));
      dispatch(setIsAuthPopupOpened(false));
      setNoticeTxt("");
    } catch (error: any) {
      if (error.status === 400) {
        setNoticeTxt("Неверный пароль");
      } else {
        setNoticeTxt("Что-то пошло не так, попробуйте позже");
      }
    } finally {
      setIsButtonDisabled(false);
    }
  }

  // Функция клика по кнопке войти при вводе поля Password
  function handlePasswordClick() {
    if (!isValid) {
      setNoticeTxt(errors.password);
      return;
    }

    if (!values.password) {
      setNoticeTxt("Это поле обязательно для заполнения");
      return;
    }

    authorize();
  }

  return (
    <form className="popup__form">
      <h3 className="popup__title">Вход</h3>
      {/* Проверки ниже нужны из-за особенности Реакта, ибо если оставить тернарный оператор, то Реакт вместо полноценного цикла маунтинга/анмаунтинга будет думать, что это один и тот же элемент и произойдёт процесс Reconciliation, из-за чего их стейты меняться не будут */}
      {!isMailExisting ? (
        <Input
          value={values.email}
          label="E-mail"
          type="email"
          name="email"
          placeholder="E-mail"
          required={true}
          noticeTxt={noticeTxt}
          handleChange={handleChange}
        />
      ) : null}

      {isMailExisting ? (
        <Input
          value={values.password}
          label="Пароль"
          type="password"
          name="password"
          placeholder="Пароль"
          required={true}
          noticeTxt={noticeTxt}
          handleChange={handleChange}
        />
      ) : null}

      {isMailExisting ? (
        <Button
          type="submit"
          handleClick={handlePasswordClick}
          isDisabled={isButtonDisabled}
        >
          Войти
        </Button>
      ) : (
        <Button
          type="submit"
          handleClick={handleEmailClick}
          isDisabled={isButtonDisabled}
        >
          Далее
        </Button>
      )}
    </form>
  );
};

export default LoginForm;

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
  setEmail: (email: string) => void;
};

const LoginForm: FC<TLoginFormProps> = ({ setIsLoginForm, setEmail }) => {
  const dispatch = useDispatch();
  const [isMailExisting, setIsMailExisting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [noticeTxt, setNoticeTxt] = useState("");

  // Хук для сбора данных с формы и их валидации
  const {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    resetErrors,
    resetForm,
  } = useFormWithValidation({
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
        setEmail(values.email);
      } else {
        setNoticeTxt("Что-то пошло не так, попробуйте позже");
      }
    } finally {
      setIsButtonDisabled(false);
    }
  }

  // Очистка поля E-mail
  function handleEmailClear() {
    resetErrors();
    setValues({ ...values, email: "" });
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

      if (response.jwt) {
        localStorage.setItem("jwt", response.jwt);
      }
      dispatch(setUser(response.user));
      dispatch(setIsAuthPopupOpened(false));
      setNoticeTxt("");
      setIsMailExisting(false);
      resetForm();
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
          label="E-mail"
          type="email"
          name="email"
          placeholder="Начните вводить E-mail"
          required={true}
          noticeTxt={noticeTxt}
          handleChange={handleChange}
          handleClear={handleEmailClear}
        />
      ) : null}

      {isMailExisting ? (
        <Input
          label="Пароль"
          type="password"
          name="password"
          placeholder="Начните воодить пароль"
          required={true}
          noticeTxt={noticeTxt}
          handleChange={handleChange}
          minLength={8}
          maxLength={32}
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

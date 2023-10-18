import React, { FC, useState } from "react";
import infoIcon from "../images/info-icon.svg";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { passwordRegExp } from "../utils/contstants";
import { api } from "../utils/api";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/slice";
import { setIsAuthPopupOpened } from "../redux/popups/slice";

type TRegistrationFormProps = {
  userEmail: string;
};

const RegistrationForm: FC<TRegistrationFormProps> = ({ userEmail }) => {
  const dispatch = useDispatch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [noticeTxt, setNoticeTxt] = useState({
    name: "",
    password: "",
    passwordRepeat: "",
  });
  const [passwordsValid, setPasswordsValid] = useState(false);

  // Хук для сбора данных с формы и их валидации
  const { values, handleChange, errors, isValid, setValues } =
    useFormWithValidation({
      name: "",
      password: "",
      passwordRepeat: "",
    });

  console.log(values, errors);

  // Очитска поля имени
  function handleNameClear() {
    setValues({ ...values, name: "" });
  }

  function checkFormValidity() {
    let errorsObj = {
      name: "",
      password: "",
      passwordRepeat: "",
    };
    let isFormValid = true;

    if (!isValid) {
      errorsObj = {
        name: errors.name,
        password: errors.password,
        passwordRepeat: errors.passwordRepeat,
      };

      isFormValid = false;
    }

    if (!values.name || !values.password || !values.passwordRepeat) {
      errorsObj = {
        name: errors.name,
        password: errors.password,
        passwordRepeat: errors.passwordRepeat,
      };

      isFormValid = false;
    }

    if (!values.name) {
      errorsObj.name = "Это поле обязательно для заполнения";
      isFormValid = false;
    }

    if (!values.password) {
      errorsObj.password = "Это поле обязательно для заполнения";
      isFormValid = false;
    }

    if (!values.passwordRepeat) {
      errorsObj.passwordRepeat = "Это поле обязательно для заполнения";
      isFormValid = false;
    }

    if (values.password !== values.passwordRepeat) {
      errorsObj.password = "Пароли не совпадают";
      errorsObj.passwordRepeat = "Пароли не совпадают";
      setPasswordsValid(false);
      isFormValid = false;
    } else {
      setPasswordsValid(true);
    }

    setNoticeTxt(errorsObj);
    return isFormValid;
  }

  // Клик по кнопке Зарегистрироваться
  function handleSubmitClick() {
    async function registerUser() {
      try {
        const response = await api.register(
          values.name,
          userEmail,
          values.password
        );

        if (response.jwt) {
          localStorage.setItem("jwt", response.jwt);
        }
        dispatch(setUser(response.user));
        dispatch(setIsAuthPopupOpened(false));
      } catch (error) {
        console.log(error);
      }
    }
    if (checkFormValidity()) {
      registerUser();
    }
  }

  return (
    <form className="popup__form popup__form_registration">
      <h3 className="popup__title">Регистрация</h3>
      <div className="popup__info-container">
        <img
          src={infoIcon}
          alt="Информационная иконка"
          className="popup__info-icon"
        />
        <p className="popup__info-txt">
          {`В пароле используйте от 8 до 32 символов: строчные и прописные латинские буквы (A-z), цифры (0-9) и спец символы ( . , : ; ? ! * + % - < > @ [ ] { } / \ _ {} $ # )`}
        </p>
      </div>
      <fieldset className="popup__fieldset">
        <Input
          type="text"
          name="name"
          label="Ваше имя"
          placeholder="Введите имя"
          noticeTxt={noticeTxt.name}
          required={true}
          handleChange={handleChange}
          handleClear={handleNameClear}
        />
        <Input
          type="password"
          name="password"
          label="Пароль"
          placeholder="Введите пароль"
          noticeTxt={noticeTxt.password}
          required={true}
          handleChange={handleChange}
          isValid={passwordsValid}
          minLength={8}
          maxLength={32}
          pattern={passwordRegExp}
        />
        <Input
          type="password"
          name="passwordRepeat"
          label="Повторить пароль"
          placeholder="Введите пароль"
          noticeTxt={noticeTxt.passwordRepeat}
          required={true}
          handleChange={handleChange}
          isValid={passwordsValid}
          minLength={8}
          maxLength={32}
          pattern={passwordRegExp}
        />
      </fieldset>
      <Button
        type="submit"
        isRegistration={true}
        handleClick={handleSubmitClick}
        isDisabled={isButtonDisabled}
      >
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default RegistrationForm;

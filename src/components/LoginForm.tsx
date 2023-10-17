import React, { FC, useEffect, useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useForm } from "../hooks/useForm";
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

  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  async function checkMail() {
    setIsButtonDisabled(true);
    try {
      await api.checkUserExists(values.email);
      setIsMailExisting(true);
    } catch (error) {
      setIsLoginForm(false);
    } finally {
      setIsButtonDisabled(false);
    }
  }

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
          noticeTxt={noticeTxt}
          handleChange={handleChange}
        />
      ) : null}

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
  );
};

export default LoginForm;

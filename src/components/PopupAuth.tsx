import React, { FC, useEffect, useState } from "react";
import Popup from "./Popup";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useForm } from "../hooks/useForm";
import { api } from "../utils/api";

const PopupAuth: FC = () => {
  const [isMailExisting, setIsMailExisting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [noticeTxt, setNoticeTxt] = useState("");
  const { values, handleChange, setValues } = useForm({
    mail: "",
  });

  console.log(noticeTxt);

  async function checkMail() {
    setIsButtonDisabled(true);
    try {
      await api.checkUserExists(values.mail);
      setIsMailExisting(true);
      setNoticeTxt("");
    } catch (error) {
      setNoticeTxt("Дурак?");
    } finally {
      setIsButtonDisabled(false);
    }
  }

  useEffect(() => {
    if (!values.mail) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [values.mail]);

  return (
    <Popup>
      <form className="popup__form">
        <h3 className="popup__title">Вход</h3>
        <Input
          value={values.mail}
          label="E-mail"
          placeholder="E-mail"
          noticeTxt={noticeTxt}
          handleChange={handleChange}
        />
        <Button
          type="submit"
          handleClick={checkMail}
          isDisabled={isButtonDisabled}
        >
          Далее
        </Button>
      </form>
    </Popup>
  );
};

export default PopupAuth;

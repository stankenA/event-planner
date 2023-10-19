import React, { FC, useState } from "react";
import Popup from "./Popup";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PopupAuth: FC = () => {
  const [isLoginFrom, setIsLoginForm] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const isAuthPopupOpened = useSelector(
    (state: RootState) => state.popups.isAuthPopupOpened
  );

  return (
    <Popup isOpened={isAuthPopupOpened}>
      {isLoginFrom ? (
        <LoginForm setEmail={setUserEmail} setIsLoginForm={setIsLoginForm} />
      ) : (
        <RegistrationForm
          userEmail={userEmail}
          setIsLoginForm={setIsLoginForm}
        />
      )}
    </Popup>
  );
};

export default PopupAuth;

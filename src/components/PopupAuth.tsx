import React, { FC, useState } from "react";
import Popup from "./Popup";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const PopupAuth: FC = () => {
  const [isLoginFrom, setIsLoginForm] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  return (
    <Popup>
      {isLoginFrom ? (
        <LoginForm setEmail={setUserEmail} setIsLoginForm={setIsLoginForm} />
      ) : (
        <RegistrationForm userEmail={userEmail} />
      )}
    </Popup>
  );
};

export default PopupAuth;

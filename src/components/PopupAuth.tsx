import React, { FC, useState } from "react";
import Popup from "./Popup";
import LoginForm from "./LoginForm";

const PopupAuth: FC = () => {
  const [isLoginFrom, setIsLoginForm] = useState(true);

  return (
    <Popup>
      {isLoginFrom ? <LoginForm setIsLoginForm={setIsLoginForm} /> : null}
    </Popup>
  );
};

export default PopupAuth;

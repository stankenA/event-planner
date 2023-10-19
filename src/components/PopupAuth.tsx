import React, { FC, useState } from "react";
import Popup from "./Popup";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setIsAuthPopupOpened } from "../redux/popups/slice";

const PopupAuth: FC = () => {
  const dispatch = useDispatch();
  const [isLoginFrom, setIsLoginForm] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const isAuthPopupOpened = useSelector(
    (state: RootState) => state.popups.isAuthPopupOpened
  );

  function handleClosePopup() {
    dispatch(setIsAuthPopupOpened(false));
  }

  return (
    <Popup isOpened={isAuthPopupOpened} handleClose={handleClosePopup}>
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

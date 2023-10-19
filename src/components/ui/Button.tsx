import React, { FC, MouseEvent } from "react";
import { TButton } from "../../utils/types";

const Button: FC<TButton> = ({
  children,
  type,
  isDisabled,
  isRegistration,
  className,
  handleClick,
}) => {
  function click(evt: MouseEvent<HTMLButtonElement>) {
    evt.preventDefault();
    handleClick();
  }

  return (
    <button
      type={type}
      className={`button ${className ? className : ""} ${
        isDisabled ? "button_disabled" : ""
      }  ${isRegistration ? "button_registration" : ""}`}
      onClick={click}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;

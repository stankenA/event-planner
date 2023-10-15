import React, { FC } from "react";
import { TButton } from "../../utils/types";

const Button: FC<TButton> = ({ children, isDisabled, handleClick }) => {
  return (
    <button
      type="button"
      className={`button ${isDisabled ? "button_disabled" : ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;

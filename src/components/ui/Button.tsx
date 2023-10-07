import React, { FC } from "react";
import { TButton } from "../../utils/types";

const Button: FC<TButton> = ({ txt, isDisabled, handleClick }) => {
  return (
    <button
      type="button"
      className={`button ${isDisabled ? "button_disabled" : ""}`}
      onClick={handleClick}
    >
      {txt}
    </button>
  );
};

export default Button;

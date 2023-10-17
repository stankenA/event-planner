import React, { FC, useState } from "react";
import { TInput } from "../../utils/types";

const Input: FC<TInput> = ({
  value,
  type,
  name,
  label,
  placeholder,
  noticeTxt,
  handleChange,
}) => {
  const [isLabelFocused, setIsLabelFocused] = useState(false);
  const [isPlaceholderShown, setIsPlaceholderShown] = useState(false);

  function focusLabel() {
    setIsLabelFocused(true);
    setIsPlaceholderShown(true);
  }

  function unfocusLabel() {
    if (!value) {
      setIsLabelFocused(false);
      setIsPlaceholderShown(false);
    }
  }

  return (
    <div className={`input ${noticeTxt?.length > 0 ? "input_notice" : ""}`}>
      <label
        htmlFor="mail"
        className={`input__label ${
          isLabelFocused ? "input__label_focused" : ""
        }`}
      >
        {label}
        <span className="input__star">*</span>
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={isPlaceholderShown ? `Начните вводить ${placeholder}` : ""}
        className="input__element"
        onFocus={focusLabel}
        onBlur={unfocusLabel}
      />
      <span className="input__notice">{noticeTxt}</span>
    </div>
  );
};

export default Input;

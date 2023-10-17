import React, { ChangeEvent, FC, useEffect, useState } from "react";

type TInput = {
  value: string;
  type: string;
  name: string;
  label: string;
  placeholder: string;
  noticeTxt: string;
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

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
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [inputType, setInputType] = useState(type);

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

  function togglePasswordVisibility() {
    if (!isPasswordShown) {
      setInputType("text");
    } else {
      setInputType("password");
    }

    setIsPasswordShown(!isPasswordShown);
  }

  return (
    <div className={`input ${noticeTxt?.length > 0 ? "input_notice" : ""}`}>
      <label
        htmlFor={name}
        className={`input__label ${
          isLabelFocused ? "input__label_focused" : ""
        }`}
      >
        {label}
        <span className="input__star">*</span>
      </label>
      <input
        name={name}
        type={inputType}
        value={value}
        onChange={handleChange}
        placeholder={isPlaceholderShown ? `Начните вводить ${placeholder}` : ""}
        className="input__element"
        onFocus={focusLabel}
        onBlur={unfocusLabel}
      />
      {type === "password" ? (
        <button
          type="button"
          className={`input__eye ${isPasswordShown ? "input__eye_opened" : ""}`}
          onClick={togglePasswordVisibility}
        ></button>
      ) : (
        ""
      )}
      <span className="input__notice">{noticeTxt}</span>
    </div>
  );
};

export default Input;

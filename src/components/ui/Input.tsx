import React, { ChangeEvent, FC, useState } from "react";

type TInput = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  noticeTxt: string;
  required: boolean;
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  handleClear?: () => void;
};

const Input: FC<TInput> = ({
  type,
  name,
  label,
  placeholder,
  required,
  noticeTxt,
  handleChange,
  handleClear,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isLabelFocused, setIsLabelFocused] = useState(false);
  const [isPlaceholderShown, setIsPlaceholderShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [inputType, setInputType] = useState(type);

  function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value);
    handleChange(evt);
  }

  function handleInputClear() {
    handleClear!();
    setInputValue("");
  }

  function focusLabel() {
    setIsLabelFocused(true);
    setIsPlaceholderShown(true);
  }

  function unfocusLabel() {
    if (!inputValue) {
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
    <div className={`input ${noticeTxt.length > 0 ? "input_notice" : ""}`}>
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
        required={required}
        type={inputType}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={isPlaceholderShown ? `${placeholder}` : ""}
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
      ) : type === "calendar" ? null : (
        <button
          type="button"
          className={`input__clear-btn ${
            inputValue ? "input__clear-btn_visible" : ""
          }`}
          onClick={handleInputClear}
        ></button>
      )}
      <span className="input__notice">{noticeTxt}</span>
    </div>
  );
};

export default Input;

import React, { ChangeEvent, FC, useState } from "react";
import { TInput } from "../../utils/types";
import calendarIcon from "../../images/calendar-icon.svg";

const Input: FC<TInput> = ({
  type,
  name,
  label,
  placeholder,
  isFocused,
  required,
  noticeTxt,
  minLength,
  maxLength,
  value,
  isValid,
  pattern,
  readOnly,
  isDate,
  handleChange,
  handleClear,
  onClick,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isLabelFocused, setIsLabelFocused] = useState(
    isFocused ? isFocused : false
  );
  const [isPlaceholderShown, setIsPlaceholderShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [inputType, setInputType] = useState(type);

  // Функция изменения значения инпута
  function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value);
    if (handleChange) {
      handleChange(evt);
    }
  }

  // Очистка инпута
  function handleInputClear() {
    if (handleClear) {
      handleClear();
    }
    setInputValue("");
  }

  // Является ли инпут в фокусе
  function focusLabel() {
    setIsLabelFocused(true);
    setIsPlaceholderShown(true);
  }

  function unfocusLabel() {
    if (isFocused) {
      return;
    }

    if (!inputValue) {
      setIsLabelFocused(false);
      setIsPlaceholderShown(false);
    }
  }

  // Функция отображения/скрытия пароля
  function togglePasswordVisibility() {
    if (!isPasswordShown) {
      setInputType("text");
    } else {
      setInputType("password");
    }

    setIsPasswordShown(!isPasswordShown);
  }

  return (
    <div
      className={`input 
      ${noticeTxt ? "input_notice" : ""} 
      ${isValid ? "input_valid" : ""}
      `}
      onClick={onClick}
    >
      <label
        htmlFor={name}
        className={`input__label ${
          isLabelFocused ? "input__label_focused" : ""
        }`}
      >
        {label}
        {required ? <span className="input__star">*</span> : null}
      </label>
      <input
        minLength={minLength}
        maxLength={maxLength}
        name={name}
        required={required}
        type={inputType}
        value={value ? value : inputValue}
        onChange={handleInputChange}
        placeholder={isPlaceholderShown ? `${placeholder}` : ""}
        className="input__element"
        onFocus={focusLabel}
        onBlur={unfocusLabel}
        pattern={pattern}
        readOnly={readOnly}
      />
      {type === "password" ? (
        <button
          type="button"
          className={`input__eye ${isPasswordShown ? "input__eye_opened" : ""}`}
          onClick={togglePasswordVisibility}
        ></button>
      ) : type === "text" && !isDate ? (
        <button
          type="button"
          className={`input__clear-btn ${
            inputValue ? "input__clear-btn_visible" : ""
          }`}
          onClick={handleInputClear}
        ></button>
      ) : null}
      {isDate ? (
        <img
          src={calendarIcon}
          alt="Иконка календаря"
          className="input__calendar-icon"
        />
      ) : null}
      <span className="input__notice">{noticeTxt}</span>
    </div>
  );
};

export default Input;

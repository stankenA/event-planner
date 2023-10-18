import React, { ChangeEvent, FC, useState } from "react";

type TInput = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  noticeTxt: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  isValid?: boolean;
  pattern?: string;
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
  minLength,
  maxLength,
  isValid,
  pattern,
  handleChange,
  handleClear,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isLabelFocused, setIsLabelFocused] = useState(false);
  const [isPlaceholderShown, setIsPlaceholderShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [inputType, setInputType] = useState(type);

  // Функция изменения значения инпута
  function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    setInputValue(evt.target.value);
    handleChange(evt);
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
        value={inputValue}
        onChange={handleInputChange}
        placeholder={isPlaceholderShown ? `${placeholder}` : ""}
        className="input__element"
        onFocus={focusLabel}
        onBlur={unfocusLabel}
        pattern={pattern}
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

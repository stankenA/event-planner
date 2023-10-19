import React, { ChangeEvent, FC, useState } from "react";

type TTextarea = {
  name: string;
  label: string;
  required: boolean;
  noticeTxt: string;
  maxLength: number;
  handleChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
};

const Textarea: FC<TTextarea> = ({
  name,
  label,
  required,
  noticeTxt,
  maxLength,
  handleChange,
}) => {
  const [textareaValue, setTextareaValue] = useState("");
  const [isLabelFocused, setIsLabelFocused] = useState(false);

  // Является ли инпут в фокусе
  function focusLabel() {
    setIsLabelFocused(true);
  }

  function unfocusLabel() {
    if (!textareaValue) {
      setIsLabelFocused(false);
    }
  }

  function onChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setTextareaValue(evt.target.value);
    handleChange(evt);
  }
  return (
    <div className={`textarea ${noticeTxt ? "textarea_notice" : ""}`}>
      <label
        htmlFor={name}
        className={`textarea__label ${
          isLabelFocused ? "textarea__label_focused" : ""
        }`}
      >
        {label}
        {required ? <span className="textarea__star">*</span> : null}
      </label>
      <textarea
        name={name}
        required={required}
        value={textareaValue}
        onChange={onChange}
        className="textarea__element"
        onFocus={focusLabel}
        onBlur={unfocusLabel}
        maxLength={maxLength}
      ></textarea>
      <span className="textarea__notice">{noticeTxt}</span>
    </div>
  );
};

export default Textarea;

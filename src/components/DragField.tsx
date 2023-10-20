import React, { FC, useState } from "react";

type TDragFieldProps = {
  setFilesArr: React.Dispatch<React.SetStateAction<File[]>>;
  filesArr: File[];
};

const DragField: FC<TDragFieldProps> = ({ filesArr, setFilesArr }) => {
  const [dragActive, setDragActive] = useState(false);

  // Подсвечивание границ поля при наведении мышки с файлом
  const handleDrag = function (evt: React.DragEvent<HTMLDivElement>) {
    if (evt.type === "dragenter" || evt.type === "dragover") {
      setDragActive(true);
    } else if (evt.type === "dragleave") {
      setDragActive(false);
    }
  };

  // "Сброс" файла на поле
  const handleDrop = function (evt: React.DragEvent<HTMLDivElement>) {
    evt.preventDefault();
    evt.stopPropagation();
    setDragActive(false);
    if (
      evt.dataTransfer.files &&
      evt.dataTransfer.files[0] &&
      evt.dataTransfer.files[0].size < 5242880
    ) {
      const arr = Array.from(evt.dataTransfer.files);
      setFilesArr([...filesArr, ...arr]);
    }
  };

  // Загрузка файла при нажатии на поле
  const handleChange = function (evt: React.ChangeEvent<HTMLInputElement>) {
    evt.preventDefault();
    if (
      evt.target.files &&
      evt.target.files[0] &&
      evt.target.files[0].size < 5242880
    ) {
      const arr = Array.from(evt.target.files);
      setFilesArr([...filesArr, ...arr]);
    }
  };

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className="drag"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onDragOver={enableDropping}
    >
      <input
        type="file"
        name="file"
        className="drag__input"
        id="file"
        onChange={handleChange}
      />
      <label
        htmlFor="file"
        className={`drag__label ${dragActive ? "drag__label_active" : ""}`}
      >
        <span className="drag__txt">Выберите фото или перетащите сюда</span>
      </label>
    </div>
  );
};

export default DragField;

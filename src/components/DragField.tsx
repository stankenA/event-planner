import React, { FC } from "react";

type TDragFieldProps = {
  initialPhotos: string[];
  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
  photoFiles?: FileList;
  setPhotoFiles?: React.Dispatch<React.SetStateAction<FileList | undefined>>;
};

const DragField: FC<TDragFieldProps> = ({
  initialPhotos,
  setPhotos,
  // photoFiles,
  // setPhotoFiles,
}) => {
  const [dragActive, setDragActive] = React.useState(false);

  const handleDrag = function (evt: React.DragEvent<HTMLDivElement>) {
    if (evt.type === "dragenter" || evt.type === "dragover") {
      setDragActive(true);
    } else if (evt.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (evt: React.DragEvent<HTMLDivElement>) {
    evt.preventDefault();
    evt.stopPropagation();
    setDragActive(false);
    if (evt.dataTransfer.files && evt.dataTransfer.files[0]) {
      setPhotos([
        ...initialPhotos,
        URL.createObjectURL(evt.dataTransfer.files[0]),
      ]);
      // const files = evt.dataTransfer.files;
      // setPhotoFiles(evt.dataTransfer.files);
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
      <input type="file" name="file" className="drag__input" id="file" />
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

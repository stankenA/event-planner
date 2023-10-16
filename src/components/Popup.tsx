import React, { FC, PropsWithChildren, useEffect, useRef } from "react";

type TPopup = PropsWithChildren & {
  isOpen: boolean;
  closePopup: () => void;
};

const Popup: FC<TPopup> = ({ children, isOpen, closePopup }) => {
  const popupRef = useRef<HTMLDialogElement>(null);

  function openModal() {
    popupRef.current?.showModal();
  }

  function closeModal() {
    popupRef.current?.close();
    closePopup();
  }

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen]);

  return (
    <dialog className="popup" ref={popupRef}>
      <div className="popup__wrapper">
        {children}
        <button
          type="button"
          className="popup__close"
          onClick={closeModal}
        ></button>
      </div>
    </dialog>
  );
};

export default Popup;

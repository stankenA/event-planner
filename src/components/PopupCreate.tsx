import React from "react";
import Popup from "./Popup";

const PopupCreate = () => {
  return (
    <Popup isOpened={true} isLarge={true}>
      <h2 className="pop"></h2>
    </Popup>
  );
};

export default PopupCreate;

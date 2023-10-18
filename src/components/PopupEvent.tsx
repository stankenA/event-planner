import React from "react";
import Popup from "./Popup";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import participantImg from "../images/participant-img.png";
import Participant from "./Participant";

const PopupEvent = () => {
  const isEventPopupOpened = useSelector(
    (state: RootState) => state.popups.isEventPopupOpened
  );
  const event = useSelector((state: RootState) => state.event);

  return (
    <Popup isOpened={isEventPopupOpened} isLarge={true}>
      <h3 className="popup__title">{event.title}</h3>
      <div className="event">
        <div className="event__box">
          <div className="event__date">
            <p className="event__txt-bold">пятница {event.dateStart}</p>
            <p className="event__txt-bold">21 сентября</p>
            <p className="event__txt-bold">12:00</p>
          </div>
          <p className="event__address">{event.location}</p>
        </div>
        <p className="event__description">{event.description}</p>
      </div>
      <div className="participants">
        <h4 className="participants__subtitle">Участники</h4>
        <div className="participants__content">
          <ul className="participants__list">
            <Participant name="Илья" img={participantImg} isOrganizer={true} />
            <Participant name="Катя" img={participantImg} isOrganizer={false} />
            <Participant name="Миша" img={participantImg} isOrganizer={false} />
            <Participant name="Миша" img={participantImg} isOrganizer={false} />
            <Participant name="Миша" img={participantImg} isOrganizer={false} />
            <Participant name="Миша" img={participantImg} isOrganizer={false} />
          </ul>
        </div>
      </div>
    </Popup>
  );
};

export default PopupEvent;

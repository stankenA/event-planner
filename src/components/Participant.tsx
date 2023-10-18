import React, { FC } from "react";

type TParticipantProps = {
  img: string;
  name: string;
  isOrganizer: boolean;
};

const Participant: FC<TParticipantProps> = ({ img, name, isOrganizer }) => {
  return (
    <li className="participants__item">
      <img src={img} alt="Фото участника" className="participants__img" />
      <div className="participants__container">
        <p className="participants__txt">{name}</p>
        {isOrganizer ? (
          <span className="participants__organizer">Организатор</span>
        ) : null}
      </div>
    </li>
  );
};

export default Participant;

import React, { FC, useState } from "react";
import Input from "./ui/Input";
import Calendar from "react-calendar";
import Button from "./ui/Button";
import moment from "moment";

type ValuePiece = Date | null;

type TDatepickerValue = ValuePiece | [ValuePiece, ValuePiece];

type TRangepickerProps = {
  setDatesValue: React.Dispatch<React.SetStateAction<string[]>>;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

const Rangepicker: FC<TRangepickerProps> = ({
  setDatesValue,
  handleChange,
}) => {
  // Дейтпикер
  const [isDatepickerOpened, setIsDatepickerOpened] = useState(false);
  const [datepickerValue, setDatepickerValue] = useState<TDatepickerValue>(
    new Date()
  );
  const [dateStartInput, setDateStartInput] = useState("");
  const [dateEndInput, setDateEndInput] = useState("");

  // Нажатие на кнопку Применить в дейтпикере
  function handleDatepicker() {
    if (!Array.isArray(datepickerValue)) {
      setIsDatepickerOpened(false);
      return;
    }

    const dateStart = moment(datepickerValue[0]);
    const dateEnd = datepickerValue[1] ? moment(datepickerValue[1]) : null;

    if (dateEnd) {
      setDateStartInput(dateStart.format("DD.MM.YYYY"));
      setDateEndInput(dateEnd.format("DD.MM.YYYY"));
      setDatesValue([dateStart.toJSON(), dateEnd.toJSON()]);
    } else {
      setDateStartInput(dateStart.format("DD.MM.YYYY"));
      setDateEndInput("");
      setDatesValue([dateStart.toJSON()]);
    }

    setIsDatepickerOpened(false);
  }

  return (
    <>
      <Input
        type="text"
        name="dateStart"
        label="Начало"
        placeholder="Начало"
        value={dateStartInput}
        required={true}
        noticeTxt={""}
        isFocused={true}
        isDate={true}
        handleChange={handleChange}
        onClick={() => setIsDatepickerOpened(!isDatepickerOpened)}
      />
      <Input
        type="text"
        name="dateEnd"
        label="Конец"
        placeholder="Конец"
        value={dateEndInput}
        noticeTxt={""}
        isFocused={true}
        isDate={true}
        handleChange={handleChange}
        onClick={() => setIsDatepickerOpened(!isDatepickerOpened)}
      />
      <div
        className={`rangepicker-container ${
          isDatepickerOpened ? "rangepicker-container_active" : ""
        }`}
      >
        <Calendar
          className={"rangepicker"}
          selectRange={true}
          showFixedNumberOfWeeks={true}
          nextLabel={""}
          prevLabel={""}
          onChange={setDatepickerValue}
          allowPartialRange={true}
        />
        <Button type="button" handleClick={handleDatepicker}>
          Применить
        </Button>
      </div>
    </>
  );
};

export default Rangepicker;

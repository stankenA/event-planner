export type TButton = {
  txt: string;
  isDisabled?: boolean;
  handleClick: () => void;
};

export type TDate = {
  day: number;
  month: number;
  year: number;
};

export type TCalendarProps = {
  calendarDates: TDate[];
  month: number;
  year: number;
  monthOverlap: number;
};

export type TCalendarCellProps = {
  month: number;
  date: TDate;
};

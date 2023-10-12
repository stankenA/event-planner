export type TButton = {
  txt: string;
  isDisabled?: boolean;
  handleClick: () => void;
};

// export type TDate = {
//   day: number;
//   month: number;
//   year: number;
// };

export type TUser = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TEvent = {
  id: number;
  dateStart: string;
  title: string;
  description: string;
  location: string;
  dateEnd?: string | null;
  createdAt: string;
  updatedAt: string;
  photos?: string[] | null;
  participants?: TUser[];
  createdBy?: string | null;
  updatedBy?: string | null;
};

export type TCalendarProps = {
  calendarDates: string[];
  month: number;
  events: TEvent[];
};

export type TCalendarCellProps = {
  month: number;
  date: string;
  events: TEvent[];
};

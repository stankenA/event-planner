export type TButton = React.PropsWithChildren & {
  type: "button" | "submit";
  isDisabled?: boolean;
  isRegistration?: boolean;
  className?: string;
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
  createdBy?: TUser;
  updatedBy?: string | null;
};

export type TCalendarProps = {
  calendarDates: string[];
  events: TEvent[];
};

export type TCalendarCellProps = {
  date: string;
  events: TEvent[];
};

export type TEventBadge = {
  date: string;
  event: TEvent;
  isInactive: boolean;
};

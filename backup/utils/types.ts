import { ChangeEvent, PropsWithChildren } from "react";

export type TButton = React.PropsWithChildren & {
  type: "button" | "submit";
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
  date: string;
  month: number;
  events: TEvent[];
};

export type TEventBadge = {
  date: string;
  event: TEvent;
  isInactive: boolean;
};

export type THeaderProps = {
  onPrevMonth: () => void;
  onNextMonth: () => void;
  month: number;
  year: number;
};

export type TPopupProps = PropsWithChildren & {
  isOpened: boolean;
};

export type TInput = {
  value: string;
  type: string;
  name: string;
  label: string;
  placeholder: string;
  noticeTxt: string;
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

export type TUserSlice = {
  username: string;
  email: string;
  id?: number;
};

export type TAuthPopupSlice = {
  isAuthPopupOpened: boolean;
};

export type TEventsSlice = {
  events: TEvent[];
};

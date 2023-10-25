import { ChangeEvent, PropsWithChildren } from "react";

// UI components
export type TButton = React.PropsWithChildren & {
  type: "button" | "submit";
  isDisabled?: boolean;
  isRegistration?: boolean;
  className?: string;
  isSecondary?: boolean;
  handleClick: () => void;
};

export type TInput = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  noticeTxt?: string;
  isFocused?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isValid?: boolean;
  pattern?: string;
  readOnly?: boolean;
  isDate?: boolean;
  value?: string;
  handleChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  handleClear?: () => void;
  onClick?: () => void;
};

export type TTextarea = {
  name: string;
  label: string;
  required: boolean;
  noticeTxt: string;
  maxLength: number;
  handleChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
};

// User
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

// Event
export type TEventPhotos = {
  id: number;
  url: string;
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
  photos?: TEventPhotos[];
  participants?: TUser[];
  owner?: TUser;
  updatedBy?: string | null;
  isInactive?: boolean;
};

export type TEventBadge = {
  date: string;
  event: TEvent;
  isInactive: boolean;
};

// Calendar
export type TCalendarProps = {
  calendarDates: string[];
  events: TEvent[];
};

export type TCalendarCellProps = {
  date: string;
  events: TEvent[];
};

// Popups
export type TPopupProps = PropsWithChildren & {
  isOpened: boolean;
  isLarge?: boolean;
  isMedium?: boolean;
  isSmall?: boolean;
  handleClose: () => void;
};

// Forms
export type TLoginFormProps = {
  setEmail: (email: string) => void;
  setIsLoginForm: (value: boolean) => void;
};

export type TRegistrationFormProps = {
  userEmail: string;
  setIsLoginForm: (value: boolean) => void;
};

// Participant
export type TParticipantProps = {
  img: string;
  name: string;
  isOrganizer: boolean;
};

// Redux slices
export type TUserSlice = {
  id?: number;
  username: string;
  email: string;
  isAuth: boolean;
};

export type TPopupsSlice = {
  isAuthPopupOpened: boolean;
  isEventPopupOpened: boolean;
  isNotificationPopupOpened: boolean;
  isConfirmPopupOpened: boolean;
  isCreatePopupOpened: boolean;
};

export type TNotificationMessage = {
  heading: string;
  case: string;
  title: string;
  dayOfWeek: string;
  day: number;
  month: string;
  time: string;
  location: string;
  isUnicorn: boolean;
};

export type TNotificationSlice = {
  isSuccessful: boolean;
  message: TNotificationMessage;
};

export type TFlagSlice = {
  flag: boolean;
};

export type TDatesSlice = {
  month: number;
  year: number;
  monthOverlap: number;
};

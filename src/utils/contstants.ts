export const months: string[] = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const currentDay: number = new Date().getDate();
export const currentMonth: number = new Date().getMonth();
export const currentYear: number = new Date().getFullYear();

export const BASE_URL: string = "http://localhost:1337/api";

export const passwordRegExp: RegExp =
  /^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?:;,.<>@ "]).*$/;

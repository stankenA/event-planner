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

export const eventMonths: string[] = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const weekdays: string[] = [
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
  "воскресенье",
];

export const currentDay: number = new Date().getDate();
export const currentMonth: number = new Date().getMonth();
export const currentYear: number = new Date().getFullYear();

export const BASE_URL: string = "http://localhost:1337/api";

export const passwordRegExp: RegExp =
  /^.*(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?:;,.<>@ "]).*$/;

export const timeRegExp: RegExp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

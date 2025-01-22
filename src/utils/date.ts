import { DateTime } from 'luxon';

export enum DateFormats {
  DATE = 'dd/MM/yyyy',
  EXTENDED_DATE = 'dd LLL yyyy',
  DATE_TIME = 'dd/MM/yyyy HH:mm',
  EXTENDED_DATE_TIME = 'EEEE d MMMM HH:mm',
  TIME = 'HH:mm',
}

const capitalize = (str: string) => str.replace(/\b\w/g, c => c.toUpperCase());

export const fromIsoToHumanDate = (isoDate?: string) => {
  if (!isoDate) {
    return ' - ';
  }
  return DateTime.fromISO(isoDate).toFormat('dd/MM/yyyy');
};

export const fromHumanDateToIsoDate = (humanDate?: string) => {
  if (!humanDate) {
    return ' - ';
  }
  return DateTime.fromFormat(humanDate, DateFormats.DATE).toISODate();
};

export const fromIsoToRatedReviewsDate = (isoDate?: string) => {
  if (!isoDate) {
    return ' - ';
  }
  return DateTime.fromISO(isoDate).toFormat('dd LLL yy');
};

export const fromIsoToHumanDateTime = (isoDate?: string) => {
  if (!isoDate) {
    return ' - ';
  }
  return DateTime.fromISO(isoDate).toFormat(DateFormats.DATE_TIME);
};

export const fromIsoToHumanTime = (isoDate?: string) => {
  if (!isoDate) {
    return ' - ';
  }
  return DateTime.fromISO(isoDate).toFormat(DateFormats.TIME);
};

export const fromIsoToHumanExtendedDateTime = (isoDate?: string) => {
  if (!isoDate) {
    return ' - ';
  }
  return capitalize(DateTime.fromISO(isoDate).toLocal().toFormat(DateFormats.EXTENDED_DATE_TIME, { locale: 'it' }));
};

export const fromIsoToHumanEventDateTime = (isoDate?: string) => {
  if (!isoDate) {
    return ' - ';
  }
  return capitalize(DateTime.fromISO(isoDate).toLocal().toFormat('EEE d MMM - HH:mm', { locale: 'it' }));
};

export const fromIsoToTime = (isoDate?: string) => {
  if (!isoDate) {
    return ' - ';
  }
  return DateTime.fromISO(isoDate).toFormat('HH:mm');
};

export const fromIsoToDay = (isoDate?: string) => {
  if (!isoDate) {
    return ' - ';
  }
  return DateTime.fromISO(isoDate).toFormat('dd');
};

export const fromIsoToMonth = (isoDate?: string) => {
  if (!isoDate) {
    return ' - ';
  }
  return DateTime.fromISO(isoDate).toFormat('MMMM');
};

/*DATES FOR NOTIFICATIONS*/
export const isToday = (isoDate?: string) => {
  if (!isoDate) {
    return false;
  }
  return DateTime.fromISO(isoDate).hasSame(DateTime.now(), 'day');
}

export const isYesterday = (isoDate?: string) => {
  if (!isoDate) {
    return false;
  }
  return DateTime.fromISO(isoDate).hasSame(DateTime.now().minus({ days: 1 }), 'day');
};

export const isLast7Days = (isoDate?: string) => {
  if (!isoDate) {
    return false;
  }
  return DateTime.fromISO(isoDate).diffNow('days').days >= -7;
}

export const isLast30Days = (isoDate?: string) => {
  if (!isoDate) {
    return false;
  }
  return DateTime.fromISO(isoDate).diffNow('days').days >= -30;
}

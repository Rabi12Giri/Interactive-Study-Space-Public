import { COOKIE_NAMES } from '../constants';

export const getCookieValue = (name) => {
  const cookies = document.cookie.split('; ');
  const value = cookies.find((cookie) => {
    return cookie.split('=')[0] === name;
  });

  if (value) return value.split('=')[1];

  return null;
};

export const getTokenFromCookie = () => {
  return getCookieValue(COOKIE_NAMES.TOKEN);
};

export const getUserInfoFromCookie = () => {
  const userInfo = getCookieValue(COOKIE_NAMES.USER);

  return userInfo ? JSON.parse(userInfo) : null;
};

export const createCookie = ({ name, value, daysToExpire = '7d' }) => {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000); // Convert days to milliseconds
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
};

export const removeCookie = () => {
  document.cookie =
    COOKIE_NAMES.AUTH_TOKEN +
    '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie =
    COOKIE_NAMES.ROLE + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

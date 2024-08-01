export * as apiHandler from './apiHandler';
export * from './apiHandler';
export * from './handleCookies';
export * from './hooks';
import { SERVER_URL } from '../config';

export const formatImageUrl = (url) => {
  if (!url) {
    return;
  }

  if (url.startsWith('https://')) {
    return url;
  }

  return `${SERVER_URL}/${url}`;
};

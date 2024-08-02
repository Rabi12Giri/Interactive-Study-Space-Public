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

export const formatDuration = (durationInSeconds) => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.round(durationInSeconds % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
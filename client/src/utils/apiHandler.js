import axios from 'axios';
import { getTokenFromCookie } from './handleCookies';

const getAxiosInstance = () => {
  const token = getTokenFromCookie();

  return axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRequest = async ({ endpoint }) => {
  try {
    const res = await getAxiosInstance().get(endpoint);
    return { ...res.data, ok: true };
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }

    throw new Error(error.message);
  }
};

export const postRequest = async ({ endpoint, data }) => {
  try {
    const res = await getAxiosInstance().post(endpoint, data);
    return { ...res.data, ok: true };
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }

    throw new Error(error.message);
  }
};

export const patchRequest = async ({ endpoint, data }) => {
  try {
    const res = await getAxiosInstance().patch(endpoint, data);
    return { ...res.data, ok: true };
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
};

export const putRequest = async ({ endpoint, data }) => {
  try {
    const res = await getAxiosInstance().put(endpoint, data);
    return { ...res.data, ok: true };
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
};

export const deleteRequest = async ({ endpoint, data }) => {
  try {
    const res = await getAxiosInstance().delete(endpoint, data);
    return { ...res.data, ok: true };
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }

    throw new Error(error.message);
  }
};

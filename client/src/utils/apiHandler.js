import axios from 'axios';
import { SERVER_URL } from '../config';

const getAxiosInstance = () => {
  // const authToken = getAuthTokenFromCookie();

  return axios.create({
    baseURL: SERVER_URL,
    headers: {
      Authorization: `Bearer`,
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

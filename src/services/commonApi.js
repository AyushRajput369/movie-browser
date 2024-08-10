import axios from "axios";
import { DEFAULT_ERROR_MESSAGE } from "../utils/constants";

const Axios = axios;

export const API_URL = 'https://api.themoviedb.org/3';
export const REQUEST_HEADERS = {
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
};

const makeRequest = async (
    method,
    request,
    body,
    externalHeaders,
    errorCallback
  ) => {
    const updatedHeaders = {
      ...REQUEST_HEADERS.headers,
      ...externalHeaders,
    };
    const config = {
      headers: updatedHeaders,
    };
    try {
      const response = await method(
        API_URL + request,
        method === Axios.get ? config : body,
        config
      );
      return response;
    } catch (error) {
      handleRequestError(error, errorCallback);
      return null; // Return null to avoid propagating the error further
    }
  };

const handleRequestError = (error, errorCallback) => {
  let errorMessage = "";
  if (error?.message === "Network Error") {
    errorMessage = "There was a network error. This might be a CORS issue.";
  } else {
    errorMessage =
      error?.response?.data?.msg ||
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.error ||
      DEFAULT_ERROR_MESSAGE;
  }

  if (errorCallback) errorCallback(errorMessage);
};

export const getRequest = async (request, headers, errorCallback) =>
  makeRequest(Axios.get, request, undefined, headers, errorCallback);

export const postRequest = async (request, body, headers, errorCallback) =>
  makeRequest(Axios.post, request, body, headers, errorCallback);

export const patchRequest = async (request, body, headers, errorCallback) =>
  makeRequest(Axios.patch, request, body, headers, errorCallback);

export const putRequest = async (request, body, headers, errorCallback) => {
  return makeRequest(Axios.put, request, body, headers, errorCallback);
};

export const deleteRequest = async (request, body, headers, errorCallback) =>
  makeRequest(Axios.put, request, body, headers, errorCallback);

import react from 'react';
import axios from 'axios';

export var apiBaseURL = '';
export var socketURL = '';


if (__DEV__) {
  apiBaseURL = 'http://ec4a-27-34-9-136.ngrok.io/';
  socketURL = 'ec4a-27-34-9-136.ngrok.io';

} else {
  apiBaseURL = 'https://apexeducation.edu.np/';
  socketURL = 'apexeducation.edu.np';
}


export const getSocketUrl = () => {
  let socketUrl = `wss://${socketURL}/ws`;
  return socketUrl;
}

const getHeaders = (token) => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
};

export const GET = (url, token) => {
  return axios.get(apiBaseURL + url, {
    headers: getHeaders(),
    withCredentials: true,
    crossDomain: true,
  });
};

export const POST = (url, data, token) => {
  return axios.post(apiBaseURL + url, data, {
    headers: getHeaders(),
    withCredentials: true,
    crossDomain: true,
  });
};

export const PATCH = (url, data, token) => {
  return axios.patch(apiBaseURL + url, data, {
    headers: getHeaders(),
    withCredentials: true,
    crossDomain: true,
  });
};

export const DELETE = (url, data) => {
  return axios.delete(apiBaseURL + url, {
    headers: getHeaders(),
    withCredentials: true,
    crossDomain: true,
  });
};


axios.defaults.withCredentials = true;


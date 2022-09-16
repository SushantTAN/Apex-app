import axios from 'axios';


export var apiBaseURL = '';
export var socketURL = '';

if (__DEV__) {
  apiBaseURL = 'http://192.168.0.46:8001/';
  socketURL = '192.168.0.46:8001';

} else {
  apiBaseURL = 'https://apexeducation.edu.np/';
  socketURL = 'apexeducation.edu.np';
  // apiBaseURL = 'https://8c9c-27-34-9-136.in.ngrok.io/';
  // socketURL = '8c9c-27-34-9-136.in.ngrok.io';
}

export const getSocketUrl = () => {
  let socketUrl = '';
  if (__DEV__) {
    socketUrl = `ws://${socketURL}/ws`;
  } else {
    socketUrl = `wss://${socketURL}/ws`;
  }
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
import react from 'react';
// import axios from 'axios';

// export const apiBaseURL = 'http://192.168.0.2:8001/';
export const apiBaseURL = 'https://apex.calcgen.com/';

const getHeaders = (token) => {
  if (token) {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
  }
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
};

export const GET = (url, token) => {
  return fetch(apiBaseURL + url, {
    method: 'GET',
    headers: getHeaders(token),
  });
};

export const POST = (url, data) => {
  return fetch(apiBaseURL + url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
};

export const PATCH = (url, data) => {
  return fetch(apiBaseURL + url, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
};

export const DELETE = (url, data) => {
  return fetch(apiBaseURL + url, {
    method: 'DELETE',
    headers: getHeaders(),
    body: JSON.stringify({ data }),
  });
};

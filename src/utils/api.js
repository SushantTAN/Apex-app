import react from 'react';
// import axios from 'axios';

// export const apiBaseURL = 'https://apexeducation.edu.np/';
export const apiBaseURL = 'http://192.168.0.38:8001/';
export const socketURL = '192.168.0.38:8001';
// export const apiBaseURL = 'https://5886-27-34-9-136.ngrok.io/';
// export const socketURL = 'apexeducation.edu.np';
// export const socketURL = '5886-27-34-9-136.ngrok.io';

// export const apiBaseURL = 'https://apex.calcgen.com/';


export const getSocketUrl = () => {

  // let socketUrl = `ws://${socketURL}/ws`;
  let socketUrl = `wss://${socketURL}/ws`;

  if (process.env.NODE_ENV === 'production') {
    //     socketUrl = `wss://${process.env.NEXT_PUBLIC_API_URI}/ws`
    // socketUrl = `wss://${prodUrl}/ws`
  }
  return socketUrl;
}

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

export const POST = (url, data, token) => {
  return fetch(apiBaseURL + url, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data),
  });
};

export const PATCH = (url, data, token) => {
  return fetch(apiBaseURL + url, {
    method: 'PATCH',
    headers: getHeaders(token),
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

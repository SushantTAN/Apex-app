import react from 'react';
import axios from 'axios';

export const apiBaseURL = 'https://apexeducation.edu.np/';
// export const apiBaseURL = 'https://3973-27-34-9-136.ngrok.io/';
export const socketURL = 'apexeducation.edu.np';
// export const socketURL = '3973-27-34-9-136.ngrok.io';

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
  // if (token) {
  //   return {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + token,
  //   };
  // }
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


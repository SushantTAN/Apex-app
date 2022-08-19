import { GET, PATCH, POST } from "@utils/api";
import * as types from "../actionTypes";

export const examLive = (data) => {
  return {
    type: types.SET_EXAMS_LIST_LIVE,
    payload: data,
  };
};

export const examLiveRequest = () => {
  return async (dispatch) => {
    try {
      const response = await GET('api/exams/list/?page_size=8');
      const resJson = await response.json();
      // console.log("action", resJson)
      if (response.status === 200) {
        dispatch(examLive(resJson));
      }
      if (response.status === 400) {

      }
    } catch (error) {
      console.log('err', error);
    }
  };
};


export const examPractice = (data) => {
  return {
    type: types.SET_EXAMS_LIST_PRACTICE,
    payload: data,
  };
};

export const examPracticeRequest = () => {
  return async (dispatch) => {
    try {
      const response = await GET('api/exams/list/?page_size=6');
      const resJson = await response.json();
      if (response.status === 200) {
        dispatch(examPractice(resJson));
      }
      if (response.status === 400) {

      }
    } catch (error) {
      console.log('err', error);
    }
  };
};

export const coursesEntrance = (data) => {
  return {
    type: types.SET_COURSESS_LIST,
    payload: data,
  };
};

export const coursesEntranceRequest = (query, page_size, page) => {
  return async (dispatch) => {
    try {
      let url;
      const dataValue = {
        page_size: page_size ? `&page_size=${1}` : '',
        query: query ? `&search=${query}` : '',
        page: page ? `&page=${1}` : '',
      }
      url = `api/courses/list/?${dataValue.query}${dataValue.page}${dataValue.page_size}`
      const response = await GET('api/courses/list/');
      const resJson = await response.json();
      if (response.status === 200) {
        dispatch(coursesEntrance(resJson));
      }
      if (response.status === 400) {

      }
    } catch (error) {
      console.log('err', error);
    }
  };
};
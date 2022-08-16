import { GET } from '@utils/api';
import * as types from '../actionTypes';

export const courseList = data => {
    return {
        type: types.SET_COURSE_LIST,
        payload: data,
    };
};

export const courseListRequest = (page_size, query, page) => {
    return async dispatch => {
        try {

            const response = await GET(`api/courses/list`);
            const resJson = await response.json();

            if (response.status === 200) {
                dispatch(courseList(resJson));
            }
            if (response.status === 400) {
            }
        } catch (error) {
            console.log("err", error);
        }

    };
};
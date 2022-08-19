import { GET } from '@utils/api';
import * as types from '../actionTypes';

export const courseList = data => {
    return {
        type: types.SET_COURSE_LIST,
        payload: data,
    };
};

export const courseListRequest = () => {
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

export const courseDetail = data => {
    return {
        type: types.SET_COURSE_DETAILS,
        payload: data,
    };
};

export const courseDetailRequest = (id) => {
    return async dispatch => {
        try {
            const response = await GET('api/courses/retrieve/' + id + '/')
            console.log(response)
            const resJson = await response.json();
            console.log(resJson)
            if (response.status === 200) {
                dispatch(courseDetail(resJson));
            }
            if (response.status === 400) {
            }
        } catch (error) {
            console.log('err', error);
        }
    }
}

import { errorAlert } from '@apexapp/utils/functions';
import { GET } from '@utils/api';
import * as types from '../actionTypes';
import { setLoading } from './loading';

export const courseList = data => {
    return {
        type: types.SET_COURSE_LIST,
        payload: data,
    };
};

export const courseListRequest = () => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await GET(`api/courses/list/`);
            const resJson = await response.data;

            if (response) {
                dispatch(courseList(resJson));
            }
            if (response.status === 400) {
            }
        } catch (error) {
            console.log("err", error);
            errorAlert("Error Occured", "Please try again.");
        }
        dispatch(setLoading(false));

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
            dispatch(setLoading(true));
            const response = await GET('api/courses/retrieve/before-enroll/' + id + '/')
            // console.log(response)
            const resJson = await response.data;
            // console.log(resJson)
            if (response) {
                dispatch(courseDetail(resJson));
            }
            if (response.status === 400) {
            }
        } catch (error) {
            console.log('err', error);
            errorAlert("Error Occured", "Please try again .");
        }
        dispatch(setLoading(false));
    }
}

export const courseEnrollRequest = (id) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            const response = await GET('' + id + '/')
            const resJson = await response.data;
            if (response) {
                dispatch(courseDetail(resJson));
            }
            if (response.status === 400) {

            }
        } catch (error) {
            console.log('err', error);
            errorAlert("Error Occured", "Please try again.");
        }
        dispatch(setLoading(false));
    };
};


export const myCoursesList = data => {
    return {
        type: types.SET_MY_COURSES,
        payload: data,
    };
};

export const myCourseListRequest = () => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            const response = await GET(`api/enrollments/course-enroll/list/`);
            const resJson = await response.data;
            console.log(response)
            console.log(resJson);


            if (response) {
                dispatch(myCoursesList(resJson));
            }

        } catch (error) {
            console.log("err", error);
            errorAlert("Error Occured", "Please try again.");
        }
        dispatch(setLoading(false));

    };
};
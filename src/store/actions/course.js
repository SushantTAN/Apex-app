import { errorAlert } from '@apexapp/utils/functions';
import { GET, POST } from '@utils/api';
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
            // console.log("course list ", resJson);

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
            // console.log("before enroll", resJson)
            if (response) {
                dispatch(courseDetail(resJson));
            }
            if (response.status === 400) {
            }
        } catch (error) {
            console.log('err brfore enroll', error);
            // errorAlert("Error Occured", "Please try again .");

            try {
                dispatch(setLoading(true));
                const response = await GET('api/courses/retrieve/after-enroll/' + id + '/')
                // console.log(response)
                const resJson = await response.data;
                // console.log("after enroll",resJson)
                if (response) {
                    dispatch(courseDetail(resJson));
                }
                if (response.status === 400) {
                }
            } catch (error) {
                console.log('err brfore enroll', error);
                errorAlert("Error Occured", "Please try again .");
            }
        }
        dispatch(setLoading(false));
    }
}

export const courseEnrollRequest = (data) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            const response = await POST('api/enrollments/create/', data)
            const resJson = await response.data;
            // console.log("enroll course",response)
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
            // console.log(response)
            // console.log("my courses",resJson);


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


export const myCoursesDetail = data => {
    return {
        type: types.SET_MY_COURSE_DETAIL,
        payload: data,
    };
};

export const myCourseDetailRequest = (id) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            const response = await GET(`api/courses/retrieve/after-enroll/${id}`);
            const resJson = await response.data;
            // console.log(response)
            // console.log("my courses details", resJson);


            if (response) {
                dispatch(myCoursesDetail(resJson));
            }

        } catch (error) {
            console.log("err", error.response.data);
            errorAlert("Error Occured", "Please try again.");
        }
        dispatch(setLoading(false));

    };
};

export const coursesExams = data => {
    return {
        type: types.SET_COURSE_EXAMS,
        payload: data,
    };
};

export const courseExamsRequest = () => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            const response = await GET(`api/exams/list/`);
            const resJson = await response.data;
            // console.log(response)
            // console.log("my courses", resJson);


            if (response) {
                dispatch(coursesExams(resJson));
            }

        } catch (error) {
            console.log("err", error);
            errorAlert("Error Occured", "Please try again.");
        }
        dispatch(setLoading(false));

    };
};
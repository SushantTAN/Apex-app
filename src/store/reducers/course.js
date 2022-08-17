import * as types from '../actionTypes';


const initialState = {
    courseList: {
        count: 1,
        next: null,
        previous: null,
        results: [],
    },

    duration: "",
    courseDetail: {
        sessions:
            [],




        notes: {

        },

        physical_books: {

        }
    }

}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_COURSE_LIST:
            return {
                ...state,
                courseList: action.payload
            };

        case types.SET_COURSE_DETAILS:
            return {
                ...state,
                courseDetail: action.payload
            }


        default:
            return state;
    }
}

export default courseReducer;
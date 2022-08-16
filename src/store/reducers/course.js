import * as types from '../actionTypes';


const initialState = {
    courseList: {
        count: 1,
        next: null,
        previous: null,
        results: [],
    },
}


const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_COURSE_LIST:
            return {
                ...state,
                courseList: action.payload
            };



        default:
            return state;
    }
}

export default courseReducer;
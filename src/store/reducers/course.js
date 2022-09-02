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
        sessions: [],
        enrollment_count: [],
        notes: {},
        image: "",
        physical_books: {}
    },


    myCoursesList: [],
    myCoursesDetails: {
        notes: [],
    },

    courseExamsList: {
        count: 0,
        next: '',
        previous: '',
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

        case types.SET_COURSE_DETAILS:
            return {
                ...state,
                courseDetail: action.payload
            }

        case types.SET_MY_COURSES:
            return { ...state, myCoursesList: action.payload }
        case types.SET_MY_COURSE_DETAIL:
            return { ...state, myCoursesDetails: action.payload }
        case types.SET_COURSE_EXAMS:
            return { ...state, courseExamsList: action.payload }

        default:
            return state;
    }
}

export default courseReducer;
import * as types from '../actionTypes';

const initialState = {
  examsList: {
    count: 1,
    next: null,
    previous: null,
    results: [],
  },

  examsFullList: [],

  examDetail: {
    sessions: [
      {
        id: 0,
        created_at: "",
        updated_at: "",
        created_by: 0,
        updated_by: 1,
        start_date: "",
        end_date: "",
        status: "",
        exam: 0
      },
    ],
    template: {
      id: 15,
      created_at: "",
      updated_at: "",
      created_by: 0,
      updated_by: 0,
      name: "",
      description: "No description available",
      full_marks: "100.00",
      pass_percentage: "0.40",
      pass_marks: 40,
      duration: "",
      display_num_questions: 12
    },
  },


  takeExamDetails: {
    questions: [],
    exam_enroll: {
      selected_session: {
        end_date: '',
      },
    }
  },


  examResult: {
    exam: {
      questions: []
    }
  },

}

const examsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_EXAM_LIST:
      return { ...state, examsList: action.payload };

    case types.SET_EXAM_FULL_LIST:
      return { ...state, examsFullList: action.payload };

    case types.SET_EXAM_DETAILS:
      return { ...state, examDetail: action.payload };

    case types.SET_EXAM_RESULT:
      return { ...state, examResult: action.payload };

    case types.SET_TAKE_EXAM_DETAILS:
      return { ...state, takeExamDetails: action.payload };

    default:
      return state;

  }
}
export default examsReducer;
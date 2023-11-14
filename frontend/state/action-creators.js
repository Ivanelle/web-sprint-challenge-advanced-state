// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";

export const INPUT_CHANGE = 'INPUT_CHANGE'
export const SET_QUIZ = 'SET_QUIZ';
export const RESET_QUIZ = 'RESET_QUIZ';

export function moveClockwise() { }

export function moveCounterClockwise() { }

export function selectAnswer() { }

export function setMessage() { }

export function setQuiz() { 
  return {
    type: SET_QUIZ,
  
  }
}

export function inputChange(id, value) {
 return {
  type: INPUT_CHANGE,
  payload: {
    inputId: id,
    value:  value
 }
}
}
  

export function resetForm() { 
  return {
    type: RESET_QUIZ,
  }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch({ type: RESET_QUIZ});

    axios.get('http://localhost:9000/api/quiz/next')
      .then((res) => {
        dispatch(setQuiz(res.data))
      })
      .catch((error) => {
        console.error('Error fetching quiz', error)
      });
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
}

export function postAnswer(payload) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', {
      quiz_id: payload.quiz_id,
      answer_id: payload.answer_id
    })
    .then((res) => {
      dispatch({ type: RESET_QUIZ});
      dispatch(setMessage(res.data));
      dispatch(fetchQuiz());
    })
    .catch((error) => {
      console.error('Error posting quiz answer:', error);
    });
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}

export function postQuiz(payload) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', {
      question_text: payload.question_text,
      true_answer_text: payload.true_answer_text,
      false_answer_text: payload.false_answer_text
    })
    .then(() => {
      dispatch(setMessage('Quiz submitted successfully!'));
      dispatch(resetForm())
    })
    .catch((error) => {
      console.error('Error posting quiz:', error)
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

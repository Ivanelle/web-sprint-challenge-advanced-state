// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";

export const INPUT_CHANGE = 'INPUT_CHANGE'
export const SET_QUIZ = 'SET_QUIZ';
export const RESET_QUIZ = 'RESET_QUIZ';
export const SET_MESSAGE = 'SET_MESSAGE';
export const MOVE_COUNTERCLOCKWISE = 'MOVE_COUNTERCLOCKWISE';
export const MOVE_CLOCKWISE = 'MOVE_CLOCKWISE';
export const SET_SELECTED_ANSWER = 'SET_SELECTED_ANSWER';
export const RESET_SELECTED_ANSWER = 'RESET_SELECTED_ANSWER';
export const RESET_FORM = 'RESET_FORM';
export const ADD_QUIZ_TO_ROSTER = 'ADD_QUIZ_TO_ROSTER';


export function moveClockwise() { 
  return {
    type: MOVE_CLOCKWISE
  }
}

export function moveCounterClockwise() { 
  return {
    type: MOVE_COUNTERCLOCKWISE,
  }
}

export function selectAnswer(answerId) { 
  return {
    type: SET_SELECTED_ANSWER,
    payload: answerId || null

  }
}

export function resetSelectedAnswer() {
  return {
    type: RESET_SELECTED_ANSWER
  }
}

export function setMessage(message) { 
  return {
    type: SET_MESSAGE,
    payload: message

  }
}

export function setQuiz(quizData) { 

  return {
    type: SET_QUIZ,
    payload: quizData
    }
}

export function inputChange(id, value) {
 return {
  type: INPUT_CHANGE,
  payload: {
    id,
    value
    } 
  }
}
  

export function resetForm() { 
  return {
    type: RESET_FORM,
  };
}


// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch({ type: RESET_QUIZ });
    axios
      .get('http://localhost:9000/api/quiz/next')
      .then((res) => {
        const quizData = res.data
        dispatch(setQuiz(quizData))
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
      dispatch({ type: SET_QUIZ });
      dispatch(setMessage(res.data.message));
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
    .then((response) => {
      console.log('Quiz posted successfully:', response.data);
      dispatch(setQuiz(response.data.quizData))
      dispatch(setMessage(`Congrats: "${payload.question_text}" is a great question!`));
      dispatch({type: RESET_FORM});
      dispatch(resetForm())
      })
    .catch((error) => {
      console.error('Error posting quiz:', error.message)
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

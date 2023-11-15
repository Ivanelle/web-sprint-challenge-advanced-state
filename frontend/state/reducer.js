// ❗ You don't need to add extra reducers to achieve MVP
import 
{ 
  INPUT_CHANGE,
  RESET_QUIZ, 
  SET_QUIZ,
  SET_MESSAGE,
} 
from './action-creators'

import { combineReducers } from 'redux';


const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  return state
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ: 
      return action.payload || state
    case RESET_QUIZ: 
      return state
    default: 
      return state
    }
  }

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {

  switch(action.type) {
    case SET_MESSAGE:
      return action.payload;

      default:
        return state

  }

}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type) {
    case INPUT_CHANGE: 
      return {
        ...state,
        [action.payload.id]: action.payload.value
      }

    default:
      return state;
  }

}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })

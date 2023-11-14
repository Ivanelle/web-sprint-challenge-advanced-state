// ❗ You don't need to add extra reducers to achieve MVP
import 
{ 
  INPUT_CHANGE,
  RESET_QUIZ, 
  SET_QUIZ,
} 
from './action-creators'

import { combineReducers } from 'redux'


const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  return state
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ: 
      return action.payload;
    case RESET_QUIZ: 
      return initialQuizState
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
  return state
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
        newQuestion: action.payload,
        newTrueAnswer: action.payload,
        newFalseAnswer: action.payload
      }

    default:
      return state;
  }

}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })

// ❗ You don't need to add extra reducers to achieve MVP
import 
{ 
  INPUT_CHANGE,
  RESET_QUIZ, 
  SET_QUIZ,
  SET_MESSAGE,
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_SELECTED_ANSWER,
  RESET_SELECTED_ANSWER,
  ADD_QUIZ_TO_ROSTER, 
  RESET_FORM
} 
from './action-creators'

import { combineReducers } from 'redux';


const initialWheelState = {index: 0, BNumber: 0}
function wheel(state = initialWheelState, action) {

  switch (action.type) {
    case MOVE_CLOCKWISE: 
      return {
        ...state,
        index: (state.index + 1) % 6,
        BNumber: (state.index + 1) % 6
        
      }

    case MOVE_COUNTERCLOCKWISE:
      return {
        ...state,
        index: (state.index - 1 + 6) % 6,
        BNumber: (state.index - 1 + 6) % 6
      }
  }
  return state
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {

  switch (action.type) {
    case SET_QUIZ: 
      return action.payload || state

    case ADD_QUIZ_TO_ROSTER:
      return {
        ...state,
        roster: [...state.roster, action.payload]
      }

    case RESET_QUIZ: 
      return state

    default: 
      return state
    }
  }

const initialSelectedAnswerState = {answerId: null}
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
      return {
        answerId: action.payload,
      }

    case RESET_SELECTED_ANSWER:
      return{
        answerId: null
      }


  }
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {

  switch(action.type) {
    case SET_MESSAGE:
      return action.payload

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

    case RESET_FORM:
      return initialFormState

    default:
      return state;
  }

}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })

import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'


export function Form(props) {
const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form

  const onChange = evt => {
    const { id, value } = evt.target;
      props.inputChange(id, value)
    }

  

  const onSubmit = evt => {
    evt.preventDefault();

    props.postQuiz ({
      question_text: newQuestion,
      true_answer_text: newTrueAnswer,
      false_answer_text: newFalseAnswer,
    })
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = (state) => ({
  form: state.form
})

export default connect(mapStateToProps, actionCreators)(Form)

import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'


export function Form(props) {
const { newQuestion, newFalseAnswer, newTrueAnswer} = props.form

  const onChange = evt => {
    const { id, value } = evt.target;
      props.inputChange(id, value)
    }

  

  const onSubmit = evt => {
    evt.preventDefault();

    props.postQuiz ({
      question_text: props.form.newQuestion,
      true_answer_text: props.form.newTrueAnswer,
      false_answer_text: props.form.newFalseAnswer
    })
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} value={newQuestion.value} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} value={newTrueAnswer.value} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} value={newFalseAnswer.value} id="newFalseAnswer" placeholder="Enter false answer" />
      <button type='submit' id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
   form: state.form,
  };
};



export default connect(mapStateToProps, actionCreators)(Form)

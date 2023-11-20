import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

function CustomTextMatcher(content, element) {
  const hasText = (node) => node.textContent === content;
  const elementHasText = hasText(element);

  if(elementHasText) {
    return true
  }
  const children = Array.from(element.children);
  return children.some((child) => CustomTextMatcher(content, child))
}

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

    props.resetForm()

  }


    const isValid = () => {
      return (
        newQuestion && newQuestion.trim().length > 1 &&
        newTrueAnswer && newTrueAnswer.trim().length > 1 &&
        newFalseAnswer && newFalseAnswer.trim().length > 1
      );
    }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input minLength={1} maxLength={50} onChange={onChange} value={newQuestion || ''} id="newQuestion" placeholder="Enter question" />
      <input minLength={1} maxLength={50} onChange={onChange} value={newTrueAnswer || ''} id="newTrueAnswer" placeholder="Enter true answer" />
      <input minLength={1} maxLength={50} onChange={onChange} value={newFalseAnswer || ''} id="newFalseAnswer" placeholder="Enter false answer" />
      <button  type='submit' id="submitNewQuizBtn" disabled={!isValid()} >Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
   form: state.form,
  };
};



export default connect(mapStateToProps, actionCreators)(Form)

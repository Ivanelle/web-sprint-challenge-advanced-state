import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Quiz(props) {
  const { quiz, setMessage, fetchQuiz, selectAnswer, selectedAnswer, resetSelectedAnswer } = props;

  const handleAnswerSubmit = () => {
    let correctAnswer = quiz.answers[0]
    const isCorrect =  selectedAnswer.answerId === correctAnswer.answerId

    if (isCorrect) {
      setMessage('Nice job! That was the correct answer')
    } else {
      setMessage('What a shame! That was the incorrect answer')
      console.log(selectedAnswer)
    }

    resetSelectedAnswer()
    
    fetchQuiz();
  };

  const handleSelectAnswer = (answerId) => {
      selectAnswer(answerId)
    
  };

  useEffect(() => {
    fetchQuiz();
  }, [])
  
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              {quiz.answers.map((answer) => (
                <div 
                  key={props.answerId}
                  className={`answer ${selectedAnswer.answerId === answer.answer_id ? 'selected' : null}`}
                  onClick={() => handleSelectAnswer(answer.answer_id)}
                >
                    {answer.text}
                <button >
                { selectedAnswer.answerId === answer.answer_id ? 'SELECTED' : 'Select' }
                </button>
                
              </div>
            ))}
          </div>
              
          <button onClick={handleAnswerSubmit} id="submitAnswerBtn" disabled={!selectedAnswer.answerId}>
            Submit answer
          </button>
        </>

        ) : 'Loading next quiz...'
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
    
  };
};

export default connect(mapStateToProps, actionCreators)(Quiz)

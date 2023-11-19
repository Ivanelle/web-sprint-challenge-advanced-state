import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Quiz(props) {
  const { quiz, setMessage, fetchQuiz, selectAnswer, selectedAnswer } = props;

  const handleAnswerSubmit = () => {
    let correctAnswer = quiz.answers[0]
    const isCorrect = selectedAnswer && selectedAnswer.answerId === correctAnswer.id

    if (isCorrect) {
      setMessage('Nice job! That was the correct answer')
    } else {
      setMessage('What a shame! That was the incorrect answer')

    }
    
    fetchQuiz();
  };

  const handleSelectAnswer = (answerId) => {
    console.log('Before selectAnswer', answerId)
      selectAnswer(answerId)
      console.log('After selectAnswer', answerId)
    
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
                  key={answer.id}
                  className="answer selected" 
                  onClick={() => handleSelectAnswer(answer.answer_id)}
                >
                    {answer.text}
                <button >
                  {console.log('selectedAnswer', selectedAnswer)}
                  {console.log('answer.id', answer.id)}
                { selectAnswer.answerId === answer.id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            ))}
          </div>
              
          <button onClick={handleAnswerSubmit} id="submitAnswerBtn">
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

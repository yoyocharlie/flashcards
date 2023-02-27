// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react'
import quizData from '~/data/quizData'

const QuizQuestion = ({ currentQuiz, quizActive, setQuizActive, qNumber, setQNumber, score, setScore, setCurrentQuiz, setCustomQuizActive, setCreateActive }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFinalResults, setShowFinalResults] = useState(false);
  const [handleError, setHandleError] = useState(false);
  let inputRef = useRef(false);

  useEffect(() => {
    if(qNumber > quizData.quiz[currentQuiz].questions.length - 1){
      setShowFinalResults(!showFinalResults)
    }
  }, [qNumber])


  const qId = quizData.quiz[currentQuiz].questions.map(question => {
    return question.id
  })

  const qName = quizData.quiz[currentQuiz].questions.map(question => {
    return question.q
  })

  const qAnswers = quizData.quiz[currentQuiz].questions[qNumber].answers.map((a, i) => a)

  
  const handleClick = (e) => {
    setSelectedAnswer(e.target.value)
    inputRef.current = e.target
    setHandleError(false)
  }
  const handleSubmit = () => {
    if (selectedAnswer === "true") {
      setScore(prev => {
       return (
         [...prev, selectedAnswer]
         )
       })
     }
    
    if (selectedAnswer === null) {
      setHandleError(!handleError)
      return
    } 

    inputRef.current.checked = false
    setSelectedAnswer(null)
    
    qNumber < quizData.quiz[currentQuiz].questions.length - 1
    &&
    setQNumber(qNumber + 1);
    qNumber == quizData.quiz[currentQuiz].questions.length - 1
    &&
    setShowFinalResults(!showFinalResults)
  }
    
    
  const qAnswer = qAnswers.map((answer, i) => {
    let optionArray = ["a.", "b.", "c.", "d."]
    return (
      <div className='mt-6 text-sm flex px-5' key={optionArray[i]}>
          <label htmlFor={optionArray[i]} className='mr-auto'><span className='mr-4'>{optionArray[i]}</span>{answer.text}</label>
          <input onClick={handleClick} ref={inputRef} type='radio' name='quizQ' value={answer.isAnswer} id={optionArray[i]} />
      </div>
      )
    })

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
}



  return (
    !showFinalResults ? <div className='flex flex-col absolute top-32 w-2/5'>
      <div className='flex flex-col shadow-xl p-7 py-14 rounded-lg w-full'>
        <form className='divide-y divide-primaryColor' action="">
          {quizActive && <h1 className='text-primaryColor mb-4 font-medium'>{qId[qNumber]}. {qName[qNumber]}</h1>}
          <fieldset className='flex flex-col'>
            {!showFinalResults && qAnswer}
          </fieldset>
        </form>
      </div>
      {handleError ? 
      <div className='bg-neutral-500 text-white p-2 px-6 rounded-full text-center w-full mt-10 text-sm'>Please select an answer</div> :
      <button onClick={handleSubmit} className='bg-primaryColor text-white p-2 px-6 rounded-lg w-28 self-end mt-10 text-sm'>Submit</button>
      }
    </div>
    :
    <div className='flex flex-col items-center shadow-xl p-7 py-5 rounded-lg w-1/5 text-center'>
      <h1 className='font-bold mb-2'>Test Completed!</h1>
      <h4 className='text-quizName mb-3 text-sm'>You Scored:</h4>
      <div className='bg-black mb-2 flex items-center justify-center h-24 w-24 rounded-full'>
        <h1 className='text-white text-2xl'>{Math.floor(score.length/quizData.quiz[currentQuiz].questions.length * 100)}%</h1>
      </div>
      <button onClick={() => {
        setQuizActive(false);
        setCustomQuizActive(false);
        setCreateActive(false);
        setCurrentQuiz("");
        setQNumber(0);
        setScore([]);
      }} className='text-sm text-primaryColor'>Return Home</button>
    </div>
  )
}

export default QuizQuestion
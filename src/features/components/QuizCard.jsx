import React from 'react'

// @ts-ignore
const QuizCard = ({ quizName, id, quizActive, setQuizActive, setCurrentQuiz, customQuizActive, setCustomQuizActive }) => {

  const handleClick = () => {
    setCurrentQuiz(quizName);
    if (quizName !== "Custom") {
      setQuizActive(!quizActive);
    }
    if (quizName === "Custom") {
      setCustomQuizActive(!customQuizActive);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center p-10 bg-lightGrey w-60 h-72 rounded leading-[3rem]'>
        <h1 className='italic font-bold text-quizName'>{quizName}</h1>
        <button onClick={handleClick} className='bg-primaryColor text-white rounded text-sm p-2 px-4'>Start Test</button>
    </div>
  )
}

export default QuizCard
import React from 'react'
import Quizzes from './Quizzes'
import QuizQuestion from './QuizQuestion'
import CreateQuiz from './CreateQuiz'
import CustomQuiz from '../components/CustomQuiz'

// @ts-ignore
const ContentZone = ({ quizActive, setQuizActive, customQuizActive, setCustomQuizActive, currentQuiz, setCurrentQuiz, qNumber, setQNumber, score, setScore, createActive, setCreateActive, createQuiz, customQuiz, userId }) => {
  return (
    <div className='h-screen flex justify-center items-center'>
        {!quizActive && !createActive && !customQuizActive && <Quizzes quizActive={quizActive} setQuizActive={setQuizActive} setCurrentQuiz={setCurrentQuiz} customQuizActive={customQuizActive} setCustomQuizActive={setCustomQuizActive} userId={userId} customQuiz={customQuiz} />}
        {quizActive && <QuizQuestion currentQuiz={currentQuiz} quizActive={quizActive} setQuizActive={setQuizActive} qNumber={qNumber} setQNumber={setQNumber} score={score} setScore={setScore} setCurrentQuiz={setCurrentQuiz} setCustomQuizActive={setCustomQuizActive} setCreateActive={setCreateActive} />}
        {createActive && <CreateQuiz createQuiz={createQuiz} />}
        {customQuizActive && <CustomQuiz customQuiz={customQuiz} qNumber={qNumber} setQNumber={setQNumber} currentQuiz={currentQuiz} quizActive={quizActive} setQuizActive={setQuizActive} score={score} setScore={setScore} setCurrentQuiz={setCurrentQuiz} setCustomQuizActive={setCustomQuizActive} setCreateActive={setCreateActive} />}
    </div>
  )
}

export default ContentZone
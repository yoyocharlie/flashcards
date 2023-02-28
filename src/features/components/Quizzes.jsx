import React from 'react'
import quizCardData from '../../data/quizCardData'
import QuizCard from './QuizCard'

// @ts-ignore
const Quizzes = ({ quizActive, setQuizActive, setCurrentQuiz, customQuizActive, setCustomQuizActive, userId, customQuiz }) => {
    const quizCards = quizCardData.map(quizCard => {
        return (
            <QuizCard 
                key={quizCard.id}
                id={quizCard.id}
                quizName={quizCard.quizName}
                quizActive={quizActive}
                setQuizActive={setQuizActive}
                setCurrentQuiz={setCurrentQuiz}
                customQuizActive={customQuizActive}
                setCustomQuizActive={setCustomQuizActive}
                userId={userId}
                customQuiz={customQuiz}
            />
        )
    })
  return (
    <div className='flex flex-col shadow-xl p-5 rounded-lg self-start absolute top-32'>
        <button className='self-start text-primaryColor border text-sm border-primaryColor rounded p-1 px-5'>Sort Descending</button>
        <div className='flex gap-5 mt-10'>
            {quizCards}
        </div>
    </div>
  )
}

export default Quizzes
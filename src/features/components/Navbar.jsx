// @ts-nocheck
import Link from 'next/link'
import React from 'react'
import quizData from '~/data/quizData'

const Navbar = ({ quizActive, setQuizActive, currentQuiz, setCurrentQuiz, qNumber, setQNumber, setScore, setCreateActive, signUserIn, setCustomQuizActive, customQuizActive, customQuiz }) => {


  const qId = quizActive && quizData.quiz[currentQuiz].questions.map(question => {
    return question.id
  })


  const handleClick = () => {
    setQuizActive(false);
    setCustomQuizActive(false);
    setCreateActive(false);
    setCurrentQuiz("");
    setQNumber(0);
    setScore([]);
  };
  // console.log(customQuiz[qNumber].id)

  return (
    <div className='flex absolute top-0 w-full items-center bg-primaryColor p-4 px-6'>
        <div className='mr-auto'>
            {!quizActive && <h1 className='text-white text-xl font-bold'>The Inventive Group - Training Modules</h1>}
            {quizActive && <h1 className='text-white text-xl font-bold'>{currentQuiz}</h1>}
        </div>
        <div className='w-60 flex'>
            {!quizActive && !customQuizActive && <Link href={'/'}><button onClick={handleClick} className='mr-auto rounded-xl bg-white px-5 py-[2px] text-sm'>All Tests</button></Link>}
            {!quizActive && !customQuizActive && <button onClick={signUserIn} className=' px-5 py-[2px] text-sm text-white'>Create a Test</button>}
            {quizActive && <Link href={'/'}><button onClick={handleClick} className='mr-auto text-white px-5 py-[2px] text-sm'>Return Home</button></Link>}
            {customQuizActive && <Link href={'/'}><button onClick={handleClick} className='mr-auto text-white px-5 py-[2px] text-sm'>Return Home</button></Link>}
            {quizActive && <span className='text-white text-sm bg-black rounded-xl p-1 px-5'>{qId[qNumber]}/{quizData.quiz[currentQuiz].questions.length}</span>}
            {customQuizActive && <span className='text-white text-sm bg-black rounded-xl p-1 px-5'>{customQuiz[qNumber].id}/{customQuiz.length}</span>}
        </div>
    </div>
  )
}

export default Navbar
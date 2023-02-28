import React, { useState, useRef, useEffect } from 'react'

const CustomQuiz = ({ setQuizActive, qNumber, setQNumber, score, setScore, setCurrentQuiz, customQuiz, setCustomQuizActive, setCreateActive }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFinalResults, setShowFinalResults] = useState(false);
  const [handleError, setHandleError] = useState(false);
  const [answerArray, setAnswerArray] = useState([]);
  let inputRef = useRef(false);

  useEffect(() => {
    if(qNumber > customQuiz.length - 1){
      setShowFinalResults(!showFinalResults)
    }
  }, [qNumber])

  let qId = customQuiz[qNumber].id

  let qName = customQuiz[qNumber].question

  const handleClick = (e) => {
    inputRef.current = e.target.value
    setSelectedAnswer(inputRef.current)
    setHandleError(false)
}

  const handleSubmit = () => {
    if (selectedAnswer == customQuiz[qNumber].answer) {
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
    
    inputRef.current = false
    setSelectedAnswer(null)
    
    qNumber < customQuiz.length - 1
    &&
    setQNumber(qNumber + 1);
    qNumber == customQuiz.length - 1
    &&
    setShowFinalResults(!showFinalResults)
  }

  return (
    !showFinalResults ? <div className='flex flex-col absolute top-32 w-2/5'>
        <div className='flex flex-col shadow-xl p-7 py-14 rounded-lg w-full'>
            <form className='divide-y divide-primaryColor' action="">
                <h1 className='text-primaryColor mb-4 font-medium'>{qId}. {qName}</h1>
                <fieldset className='flex flex-col'>
                    <div className='mt-6 text-sm flex px-5'>
                        <label className='mr-auto'><span className='mr-4'>a.</span>{customQuiz[qNumber].inputA}</label>
                        <input onClick={handleClick} type='radio' name='quizQ' value={customQuiz[qNumber].inputA} />
                    </div>
                    <div className='mt-6 text-sm flex px-5'>
                        <label className='mr-auto'><span className='mr-4'>b.</span>{customQuiz[qNumber].inputB}</label>
                        <input onClick={handleClick} type='radio' name='quizQ' value={customQuiz[qNumber].inputB} />
                    </div>
                    <div className='mt-6 text-sm flex px-5'>
                        <label className='mr-auto'><span className='mr-4'>c.</span>{customQuiz[qNumber].inputC}</label>
                        <input onClick={handleClick} type='radio' name='quizQ' value={customQuiz[qNumber].inputC} />
                    </div>
                    <div className='mt-6 text-sm flex px-5'>
                        <label className='mr-auto'><span className='mr-4'>d.</span>{customQuiz[qNumber].inputD}</label>
                        <input onClick={handleClick} type='radio' name='quizQ' value={customQuiz[qNumber].inputD} />
                    </div>
                </fieldset>
            </form>
        </div>
        {handleError ? 
        <div className='bg-neutral-500 text-white p-2 px-6 rounded-full text-center w-full mt-10 text-sm'>Please select an answer</div> :
        <button onClick={handleSubmit} className='bg-primaryColor text-white p-2 px-6 rounded-lg w-28 self-end mt-10 text-sm'>Submit</button>
        }        
    </div> :
        <div className='flex flex-col items-center shadow-xl p-7 py-5 rounded-lg w-1/5 text-center'>
            <h1 className='font-bold mb-2'>Test Completed!</h1>
            <h4 className='text-quizName mb-3 text-sm'>You Scored:</h4>
            <div className='bg-black mb-2 flex items-center justify-center h-24 w-24 rounded-full'>
                <h1 className='text-white text-2xl'>{Math.floor(score.length/customQuiz.length * 100)}%</h1>
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

export default CustomQuiz
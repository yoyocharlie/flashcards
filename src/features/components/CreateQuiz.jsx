// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '~/data/firebase';

const CreateQuiz = ({ createQuiz }) => {
  const [newQuestion, setNewQuestion] = useState(false);
  const [questionInputs, setQuestionInputs] = useState({});
  const [questionNumber, setQuestionNumber] = useState(0);
  let answerRef = useRef(null);
  
  const handleInput = function (e) {
    const value = e.target.value;
    
    setQuestionInputs({
      ...questionInputs,
      [e.target.name]: value,
    });
  }

  const handleClick = (e) => {
    answerRef.current = e.target.value
    console.log(answerRef)
  }

  
  const onSubmit = function (e) {
    e.preventDefault();
    newQuestion === false && setNewQuestion(true);
    questionNumber >= 1 && createQuiz(questionInputs, questionNumber);
    setQuestionInputs({
      question: "",
      answer: "",
      inputA: "",
      inputB: "",
      inputC: "",
      inputD: ""
    });
    setQuestionNumber(questionNumber + 1);
  }

  const updateQuestions = async (e) => {
    e.preventDefault();
    newQuestion === false && setNewQuestion(true);
    questionNumber >= 1 && createQuiz(questionInputs, questionNumber);
    setQuestionInputs({
      question: "",
      answer: "",
      inputA: "",
      inputB: "",
      inputC: "",
      inputD: ""
    });
    setQuestionNumber(questionNumber + 1)
  }

  
  console.log(questionInputs)

  return (
    <div className='flex flex-col shadow-xl p-3 rounded-lg self-start absolute top-32 w-2/5'>
      <div className='flex flex-col rounded-lg w-full'>
        <form className='w-full'>
          <label htmlFor="testName" className='text-sm font-medium'>Test Name</label>
          <input name='quizTitle' maxLength={20} onChange={handleInput} value={questionInputs.quizTitle} className='bg-neutral-200 border pl-2 border-neutral-300 rounded-sm w-full mt-2' type="text" id='testName' placeholder='Enter the title of your test' />
          {!newQuestion ? 
          <div className='text-center mt-4 bg-pinkishRed py-4 rounded-lg'>
            <button onClick={onSubmit} className='bg-neutral-600 rounded-sm py-2 px-5 text-sm text-white'>Add Question</button>
          </div> :
          <div className='mt-4 bg-pinkishRed rounded p-2 py-3 flex flex-col'>
            <label className='text-sm text-white'>Question</label>
            <textarea onChange={handleInput} className='opacity-70 rounded-sm mt-2 pl-2' name='question' value={questionInputs.question}/>
            <div className='flex justify-center'>
              <h4 className='text-sm text-white bg-neutral-600 w-2/5 rounded-full text-center my-6 py-2'>Write answers and select which is correct</h4>
            </div>
            <fieldset ref={answerRef}>
              <div className='flex flex-col'>
                <label htmlFor="answerA" className='text-sm text-white'>Answer A</label>
                <div className='flex pr-2'>
                  <textarea onChange={handleInput} name="inputA" className='rounded-sm w-11/12 mr-auto h-7 mt-2 pl-2 text-sm' id='answerA' value={questionInputs.inputA} />
                  <input onClick={handleInput} name='answer' type='radio' value={questionInputs.inputA} />
                </div>
                <label htmlFor="answerB" className='text-sm mt-2 text-white'>Answer B</label>
                <div className='flex pr-2'>
                  <textarea onChange={handleInput} name='inputB' className='rounded-sm w-11/12 mr-auto h-7 mt-2 pl-2 text-sm' id='answerB' value={questionInputs.inputB} />
                  <input onClick={handleInput} name='answer' type='radio' value={questionInputs.inputB} />
                </div>
                <label htmlFor="answerC" className='text-sm mt-2 text-white'>Answer C</label>
                <div className='flex pr-2'>
                  <textarea onChange={handleInput} name='inputC' className='rounded-sm w-11/12 mr-auto h-7 mt-2 pl-2 text-sm' id='answerC' value={questionInputs.inputC} />
                  <input onClick={handleInput} name='answer' type='radio' value={questionInputs.inputC} />
                </div>
                <label htmlFor="answerD" className='text-sm mt-2 text-white'>Answer D</label>
                <div className='flex pr-2'>
                  <textarea onChange={handleInput} name='inputD' className='rounded-sm w-11/12 mr-auto h-7 mt-2 pl-2 text-sm' id='answerD' value={questionInputs.inputD} />
                  <input onClick={handleInput} name='answer' type='radio' value={questionInputs.inputD} />
                </div>
              </div>
            </fieldset>
            <div className='flex justify-center gap-3 mt-4'>
              <button className='bg-primaryColor text-sm text-white py-1 px-4 rounded'>Cancel</button>
              <button className='bg-neutral-600 text-sm text-white py-1 px-4 rounded'>Add Question</button>
            </div>
          </div>
          }
          <h4 className='text-center font-medium text-sm mt-4'>Total Test Questions: {questionNumber}</h4>
          <div className='text-center mt-4'>
            <button onClick={onSubmit} className='bg-primaryColor w-full rounded-sm py-2 px-5 text-sm text-white'>Save Test</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateQuiz
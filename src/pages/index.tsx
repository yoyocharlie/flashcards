// @ts-nocheck
import { type NextPage } from "next";
import Head from "next/head";
import Navbar from '../features/components/Navbar';
import ContentZone from '../features/components/ContentZone';
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider, db } from "../data/firebase";

const Home: NextPage = () => {
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState("");
  const [qNumber, setQNumber] = useState(0);
  const [score, setScore] = useState([]);
  const [createActive, setCreateActive] = useState(false);
  const [customQuiz, setCustomQuiz] = useState({});
  const [customQuizActive, setCustomQuizActive] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        console.log("No user signed in")
      }
    });
  }, [userId])


  const signUserIn = async() => {
    if (userId) {
      setCreateActive(true);
    }
    if (!userId) {
      try {
        const cred = await signInWithPopup(auth, provider);
        const user = cred.user.uid;
        setCreateActive(true);
        setUserId(user);
        // await addDoc(collection(db, user), quizArray);
        refresh(cred.user.uid);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const signUserOut = async() => {
    try {
      await signOut(auth);
      setCreateActive(false);
      setUserId("");
    } catch (error) {
      console.log(error);
    }
  }

  const createQuiz = async(quizArray, questionNumber) => {
    await setDoc(doc(db, userId, `${questionNumber}`), quizArray);
    refresh(userId);
  }

  const refresh = async(id) => {
    const colRef = collection(db, id);
    const snapshot = await getDocs(colRef);
    const quiz = snapshot?.docs?.map(doc => ({...doc.data(), id: doc.id})) ?? [];
    setCustomQuiz(quiz);
  }

  return (
    <>
      <Head>
        <title>Inventive-Group Quizzes</title>
        <meta name="description" content="Inventive-Group Quizzes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar  quizActive={quizActive} setQuizActive={setQuizActive} currentQuiz={currentQuiz} setCurrentQuiz={setCurrentQuiz} qNumber={qNumber} setQNumber={setQNumber} setScore={setScore} setCreateActive={setCreateActive} signUserIn={signUserIn} setCustomQuizActive={setCustomQuizActive} customQuizActive={customQuizActive} customQuiz={customQuiz} />
        <ContentZone quizActive={quizActive} setQuizActive={setQuizActive} customQuizActive={customQuizActive} setCustomQuizActive={setCustomQuizActive} currentQuiz={currentQuiz} setCurrentQuiz={setCurrentQuiz} qNumber={qNumber} setQNumber={setQNumber} score={score} setScore={setScore} createActive={createActive} setCreateActive={setCreateActive} createQuiz={createQuiz} customQuiz={customQuiz} />
        <button className="border border-black" onClick={signUserOut}>Sign Out</button>
      </main>
    </>
  );
};

export default Home;

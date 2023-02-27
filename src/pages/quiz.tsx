import Link from "next/link";
import Navbar from '../features/components/Navbar'
import { type NextPage } from "next";
import Head from "next/head";

const Quiz: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quiz</title>
        <meta name="description" content="IQuiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
      </main>
    </>
  );
};

export default Quiz;
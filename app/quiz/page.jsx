"use client";

import Link from "next/link";
import { quiz } from "../data";
import { useEffect, useState } from "react";

const Question = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correctId, setCorrectId] = useState([]);
  const [wrongId, setWrongId] = useState([]);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [trueAnswer, setTrueAnswer] = useState(null);
  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (time < 5) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      nextQuestion();
    }
  }, [time]);

  //   Select and check answer
  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    setTime(5);
    if (answer === correctAnswer) {
      setCorrectId((prev) => [...prev, questions[activeQuestion].id]);
      setSelectedAnswer(true);
      setTrueAnswer(true);
    } else {
      setTrueAnswer(false);
      setSelectedAnswer(false);
      setWrongId((prev) => [...prev, questions[activeQuestion].id]);
    }
  };

  // Calculate score and increment to next question
  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    if (!checked) {
      setWrongId((prev) => [...prev, questions[activeQuestion].id]);
      setSelectedAnswer(false);
    }
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setTime(0);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  const progress = (time / 100) * 100;
  const resultScore = (result.score / 25) * 100;

  return (
    <div className='w-full h-[100vh] flex justify-center items-center bg-blue-50'>
      {!showResult ? (
        <div className='container flex flex-col w-1/2 justify-center items-center gap-14 '>
          <div className='question-box bg-blue-300 rounded-md w-3/4 flex justify-center p-5 font-bold'>
            <p className='question'>{question}</p>
          </div>
          <div className='w-[300px] bg-green-700 h-3 rounded-lg mb-8'>
            <div
              className='bg-red-600 h-3 rounded-lg transition-all'
              style={{ width: `${progress * 20}%` }}></div>
            <div className='text-center mt-2 font-bold'>time remainig : {time} s</div>
          </div>
          <div className='w-full flex justify-center items-center flex-col gap-5'>
            {answers.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => {
                  onAnswerSelected(answer, idx);
                }}
                className={`bg-blue-200 w-1/2 p-4 flex justify-center font-semibold rounded-lg  cursor-pointer ${
                  selectedAnswerIndex === idx ? "bg-yellow-200" : "hover:bg-blue-100"
                }`}>
                <span>{answer}</span>
              </li>
            ))}
          </div>
          <div className='quiz-number flex gap-5'>
            {quiz.questions.map((quiz) => (
              <span
                key={quiz.id}
                className={`p-3 rounded-full outline outline-blue-600 ${
                  correctId.includes(quiz.id)
                    ? "bg-green-500"
                    : wrongId.includes(quiz.id)
                    ? "bg-red-500"
                    : "bg-white"
                }`}></span>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col w-1/3 justify-between p-5 rounded-lg ${
            resultScore >= 50 ? "bg-green-200" : "bg-red-200"
          } h-[50vh]`}>
          <h1 className='font-bold flex self-center text-xl'>Results</h1>
          <h3
            className={`${
              resultScore >= 50 ? "text-green-700" : "text-red-700"
            } text-4xl font-bold text-center`}>
            Overall {resultScore}%
          </h3>
          <div className='flex flex-col gap-2 w-full justify-between'>
            <p>
              Total Questions: <span>{questions.length}</span>
            </p>
            <p>
              Correct Answers: <span className='text-md font-bold'>{result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers: <span className='text-md font-bold'>{result.wrongAnswers}</span>
            </p>
          </div>
          <div className='flex w-100 gap-2'>
            <button
              className='bg-blue-500 p-3 text-white font-bold rounded-md w-full'
              onClick={() => window.location.reload()}>
              Restart
            </button>
            <Link
              href={"/"}
              className='bg-blue-500 p-3 text-white font-bold rounded-md w-full text-center'>
              <button onClick={() => window.location.reload()}>Start</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
